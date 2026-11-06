import { lazy, Suspense } from 'react'
import portfolioContent from '../data/portfolioContent'

const PortraitScene = lazy(() => import('./PortraitScene'))

function webglSupported() {
  try {
    const canvas = document.createElement('canvas')
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'))
  } catch {
    return false
  }
}

const use3D = typeof window !== 'undefined'
  && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  && webglSupported()

function Profile() {
  return (
    <div className="profile-float profile-scene relative" aria-label="Profile portrait">
      {use3D && (
        <Suspense fallback={null}>
          <PortraitScene />
        </Suspense>
      )}
      <div className="profile-orbit profile-orbit-outer" aria-hidden="true" />
      <div className="profile-orbit profile-orbit-inner" aria-hidden="true" />
      <div aria-hidden="true" className="profile-aura absolute -inset-8 rounded-full" />
      <div className="profile-frame relative rounded-full p-[3px]">
        <div className="profile-frame-inner relative overflow-hidden rounded-full p-1">
          <img
            src={portfolioContent.profilePhoto}
            alt={portfolioContent.name}
            className="h-40 w-40 rounded-full object-cover sm:h-64 sm:w-64"
          />
        </div>
      </div>
      <div className="profile-status" aria-hidden="true"><span /> Available for opportunities</div>
    </div>
  )
}

export default Profile
