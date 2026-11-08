import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import fallbackContent from '../data/portfolioContent'

const inputClass = 'mt-1 w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2.5 text-sm text-white outline-none transition focus:border-purple-400/70 focus:ring-2 focus:ring-purple-500/20'
const buttonClass = 'rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-200 transition hover:border-purple-400/40 hover:bg-purple-500/10'

function Field({ label, value, onChange, multiline = false, rows = 3, type = 'text' }) {
  const Control = multiline ? 'textarea' : 'input'

  return (
    <label className="block text-xs font-medium text-slate-400">
      {label}
      <Control
        className={`${inputClass} ${multiline ? 'resize-y' : ''}`}
        type={multiline ? undefined : type}
        rows={multiline ? rows : undefined}
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}

function ImageField({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function uploadImage(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be 8 MB or smaller.')
      return
    }

    setError('')
    setUploading(true)

    try {
      if (!supabase) throw new Error('Supabase is not configured.')
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const path = `portfolio/${crypto.randomUUID()}.${extension}`
      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(path, file, { contentType: file.type, upsert: false })
      if (uploadError) throw uploadError
      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(path)
      onChange(data.publicUrl)
    } catch (uploadError) {
      setError(uploadError.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <Field label={label} value={value} onChange={onChange} />
      <p className="mt-1.5 text-xs text-slate-500">Paste an image URL or path above, or upload a photo from your device (JPG, PNG, WebP, or GIF; up to 8 MB).</p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-500/10 px-3 py-2 text-xs font-medium text-purple-100 transition hover:border-purple-300/60 hover:bg-purple-500/20">
          {uploading ? 'Uploading…' : 'Choose photo'}
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={uploadImage} disabled={uploading} />
        </label>
        {value && <img src={value} alt="Selected preview" className="h-12 w-20 rounded-md border border-white/10 object-cover" />}
      </div>
      {error && <p className="mt-2 text-xs text-rose-300" role="status">{error}</p>}
    </div>
  )
}

function EditorSection({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-white">{title}</h2>
        {description && <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>}
      </div>
      {children}
    </section>
  )
}

function PortfolioEditor({ onClose }) {
  const [draft, setDraft] = useState(null)
  const [status, setStatus] = useState('Loading saved content…')
  const [saving, setSaving] = useState(false)
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signingIn, setSigningIn] = useState(false)

  useEffect(() => {
    if (!supabase) {
      setStatus('Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to use the deployed editor.')
      return undefined
    }

    let cancelled = false
    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setStatus(error.message)
        return
      }
      if (!cancelled) setSession(data.session)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!cancelled) setSession(nextSession)
    })

    return () => {
      cancelled = true
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!session) return undefined

    let cancelled = false
    supabase
      .from('portfolio_content')
      .select('content')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setStatus(error.message)
          return
        }
        setDraft(data.content?.brand ? data.content : fallbackContent)
        setStatus('Edits are saved to Supabase when you press Save changes.')
      })

    return () => { cancelled = true }
  }, [session])

  async function signIn(event) {
    event.preventDefault()
    setSigningIn(true)
    setStatus('Signing in…')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setStatus(error ? error.message : 'Signed in.')
    setSigningIn(false)
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) setStatus(error.message)
  }

  function update(path, value) {
    setDraft((current) => {
      if (!current) return current
      const next = structuredClone(current)
      let target = next
      for (const key of path.slice(0, -1)) target = target[key]
      target[path[path.length - 1]] = value
      return next
    })
  }

  function append(path, item) {
    const list = path.reduce((value, key) => value[key], draft)
    update(path, [...list, item])
  }

  function remove(path, index) {
    const list = path.reduce((value, key) => value[key], draft)
    update(path, list.filter((_, itemIndex) => itemIndex !== index))
  }

  async function saveChanges(event) {
    event.preventDefault()
    setSaving(true)
    setStatus('Saving…')

    try {
      const { error } = await supabase
        .from('portfolio_content')
        .upsert({ id: 1, content: draft })
      if (error) throw error
      setStatus('Saved to Supabase. Reloading the portfolio…')
      window.setTimeout(() => window.location.reload(), 500)
    } catch (error) {
      setStatus(error.message)
      setSaving(false)
    }
  }

  if (!supabase || !session || !draft) {
    return (
      <div className="fixed inset-0 z-[300] overflow-y-auto bg-[#08080c] p-5 text-white sm:p-8" role="dialog" aria-modal="true" aria-label="Portfolio content editor">
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/10 bg-black/50 p-6">
          <button type="button" onClick={onClose} className={buttonClass}>Close editor</button>
          {!supabase ? (
            <p className="mt-5 text-sm text-rose-300" role="status">{status}</p>
          ) : !session ? (
            <form onSubmit={signIn} className="mt-6 space-y-4">
              <div>
                <h1 className="text-xl font-semibold text-white">Admin sign in</h1>
                <p className="mt-2 text-sm text-slate-400">Use the Supabase account that you added to <code>admin_users</code>.</p>
              </div>
              <Field label="Email" value={email} onChange={setEmail} type="email" />
              <Field label="Password" value={password} onChange={setPassword} type="password" />
              <button type="submit" disabled={signingIn} className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white disabled:opacity-60">
                {signingIn ? 'Signing in…' : 'Sign in'}
              </button>
              {status !== 'Loading saved content…' && <p className="text-xs text-rose-300" role="status">{status}</p>}
            </form>
          ) : (
            <p className="mt-5 text-sm text-slate-300" role="status">{status}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[300] overflow-y-auto bg-[#08080c] text-white" role="dialog" aria-modal="true" aria-label="Portfolio content editor">
      <form onSubmit={saveChanges} className="mx-auto max-w-5xl px-4 pb-12 sm:px-8">
        <div className="sticky top-0 z-10 -mx-4 mb-6 border-b border-white/10 bg-[#08080c]/95 px-4 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-purple-300">Portfolio editor</p>
              <h1 className="mt-1 text-xl font-bold text-white">Update your content</h1>
            </div>
            <div className="flex items-center gap-2">
              <button type="button" onClick={signOut} className={buttonClass}>Sign out</button>
              <button type="button" onClick={onClose} className={buttonClass}>Close</button>
              <button type="submit" disabled={saving} className="rounded-lg bg-purple-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-purple-500 disabled:cursor-wait disabled:opacity-60">
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500" role="status">{status}</p>
        </div>

        <div className="space-y-5">
          <EditorSection title="Profile" description="Your name, intro, and main profile photo.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Small header name" value={draft.brand} onChange={(value) => update(['brand'], value)} />
              <Field label="Full name" value={draft.name} onChange={(value) => update(['name'], value)} />
              <Field label="Role" value={draft.role} onChange={(value) => update(['role'], value)} />
              <Field label="Intro text" value={draft.intro} onChange={(value) => update(['intro'], value)} multiline />
              <div className="sm:col-span-2">
                <ImageField label="Profile photo path" value={draft.profilePhoto} onChange={(value) => update(['profilePhoto'], value)} />
              </div>
            </div>
          </EditorSection>

          <EditorSection title="About" description="Add or remove paragraphs as needed.">
            <Field label="Section title" value={draft.about.title} onChange={(value) => update(['about', 'title'], value)} />
            <div className="mt-4 space-y-3">
              {draft.about.paragraphs.map((paragraph, index) => (
                <div key={`about-${index}`} className="rounded-xl border border-white/10 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">Paragraph {index + 1}</span>
                    <button type="button" onClick={() => remove(['about', 'paragraphs'], index)} className={buttonClass}>Remove</button>
                  </div>
                  <Field label="Text" value={paragraph} onChange={(value) => update(['about', 'paragraphs', index], value)} multiline rows={4} />
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append(['about', 'paragraphs'], '')} className={`${buttonClass} mt-3`}>+ Add paragraph</button>
          </EditorSection>

          <EditorSection title="Skills" description="Use one line per skill. Choose an icon style for each category.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Section title" value={draft.skillsSection.title} onChange={(value) => update(['skillsSection', 'title'], value)} />
              <Field label="Section description" value={draft.skillsSection.description} onChange={(value) => update(['skillsSection', 'description'], value)} />
            </div>
            <div className="mt-4 space-y-3">
              {draft.skills.map((category, index) => (
                <div key={`skill-${index}`} className="rounded-xl border border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">Skill category {index + 1}</h3>
                    <button type="button" onClick={() => remove(['skills'], index)} className={buttonClass} disabled={draft.skills.length <= 1}>Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Category title" value={category.title} onChange={(value) => update(['skills', index, 'title'], value)} />
                    <Field label="Short description" value={category.subtitle} onChange={(value) => update(['skills', index, 'subtitle'], value)} />
                    <label className="block text-xs font-medium text-slate-400">
                      Icon
                      <select className={inputClass} value={category.icon} onChange={(event) => update(['skills', index, 'icon'], event.target.value)}>
                        <option value="code">Code</option>
                        <option value="database">Database</option>
                        <option value="design">Design</option>
                      </select>
                    </label>
                    <Field label="Skills (one per line)" value={category.skills.join('\n')} onChange={(value) => update(['skills', index, 'skills'], value.split('\n').filter(Boolean))} multiline rows={4} />
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append(['skills'], { icon: 'code', title: '', subtitle: '', skills: [] })} className={`${buttonClass} mt-3`}>+ Add skill category</button>
          </EditorSection>

          <EditorSection title="Projects" description="Add projects, their photos, descriptions, tags, and links.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Small heading" value={draft.projects.kicker} onChange={(value) => update(['projects', 'kicker'], value)} />
              <Field label="Section title" value={draft.projects.title} onChange={(value) => update(['projects', 'title'], value)} />
              <Field label="Section description" value={draft.projects.description} onChange={(value) => update(['projects', 'description'], value)} multiline />
              <Field label="More projects button" value={draft.projects.moreLabel} onChange={(value) => update(['projects', 'moreLabel'], value)} />
              <Field label="More projects link" value={draft.projects.moreLink} onChange={(value) => update(['projects', 'moreLink'], value)} />
            </div>
            <div className="mt-4 space-y-3">
              {draft.projects.items.map((project, index) => (
                <div key={`project-${index}`} className="space-y-3 rounded-xl border border-white/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">Project {index + 1}</h3>
                    <button type="button" onClick={() => remove(['projects', 'items'], index)} className={buttonClass} disabled={draft.projects.items.length <= 1}>Remove</button>
                  </div>
                  <ImageField label="Project photo path" value={project.image} onChange={(value) => update(['projects', 'items', index, 'image'], value)} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Project name" value={project.title} onChange={(value) => update(['projects', 'items', index, 'title'], value)} />
                    <Field label="Project link" value={project.link} onChange={(value) => update(['projects', 'items', index, 'link'], value)} />
                    <Field label="Description" value={project.description} onChange={(value) => update(['projects', 'items', index, 'description'], value)} multiline rows={3} />
                    <Field label="Tags (comma separated)" value={project.tags.join(', ')} onChange={(value) => update(['projects', 'items', index, 'tags'], value.split(',').map((tag) => tag.trim()).filter(Boolean))} multiline rows={3} />
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append(['projects', 'items'], { image: '', title: '', description: '', tags: [], link: '#contact' })} className={`${buttonClass} mt-3`}>+ Add project</button>
          </EditorSection>

          <EditorSection title="Awards & photos" description="Add or remove awards and gallery photos.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Small heading" value={draft.awards.kicker} onChange={(value) => update(['awards', 'kicker'], value)} />
              <Field label="Section title" value={draft.awards.title} onChange={(value) => update(['awards', 'title'], value)} />
              <Field label="Section description" value={draft.awards.description} onChange={(value) => update(['awards', 'description'], value)} multiline />
            </div>
            <div className="mt-4 space-y-3">
              {draft.awards.items.map((award, index) => (
                <div key={`award-${index}`} className="rounded-xl border border-white/10 p-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-semibold text-white">Award {index + 1}</h3>
                    <button type="button" onClick={() => remove(['awards', 'items'], index)} className={buttonClass} disabled={draft.awards.items.length <= 1}>Remove</button>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Award name" value={award.title} onChange={(value) => update(['awards', 'items', index, 'title'], value)} />
                    <Field label="Category" value={award.category} onChange={(value) => update(['awards', 'items', index, 'category'], value)} />
                    <Field label="Icon character" value={award.icon} onChange={(value) => update(['awards', 'items', index, 'icon'], value)} />
                    <Field label="Description" value={award.detail} onChange={(value) => update(['awards', 'items', index, 'detail'], value)} multiline />
                  </div>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append(['awards', 'items'], { title: '', category: '', detail: '', icon: '✦' })} className={`${buttonClass} mt-3`}>+ Add award</button>
            <div className="mt-6 space-y-3">
              {draft.awards.photos.map((photo, index) => (
                <div key={`award-photo-${index}`} className="flex flex-wrap items-end gap-3 rounded-xl border border-white/10 p-3">
                  <div className="min-w-0 flex-1">
                    <ImageField label={`Gallery photo ${index + 1}`} value={photo} onChange={(value) => update(['awards', 'photos', index], value)} />
                  </div>
                  <button type="button" onClick={() => remove(['awards', 'photos'], index)} className={buttonClass}>Remove photo</button>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => append(['awards', 'photos'], '')} className={`${buttonClass} mt-3`}>+ Add gallery photo</button>
          </EditorSection>

          <EditorSection title="Contact details" description="These details appear in the contact section and footer.">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email" value={draft.contact.email} onChange={(value) => update(['contact', 'email'], value)} type="email" />
              <Field label="Phone display text" value={draft.contact.phone} onChange={(value) => update(['contact', 'phone'], value)} />
              <Field label="Phone link (include country code)" value={draft.contact.phoneLink} onChange={(value) => update(['contact', 'phoneLink'], value)} />
              <Field label="Location" value={draft.contact.location} onChange={(value) => update(['contact', 'location'], value)} />
            </div>
          </EditorSection>
        </div>
      </form>
    </div>
  )
}

export default PortfolioEditor
