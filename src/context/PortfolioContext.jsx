import { useEffect, useState } from 'react'
import fallbackContent from '../data/portfolioContent'
import { supabase } from '../lib/supabase'
import { PortfolioContext } from './PortfolioContext'

export function PortfolioProvider({ children }) {
  const [content, setContent] = useState(fallbackContent)

  useEffect(() => {
    if (!supabase) return undefined

    let active = true
    supabase
      .from('portfolio_content')
      .select('content')
      .eq('id', 1)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Could not load portfolio content from Supabase.', error)
          return
        }
        if (active && data?.content?.brand) setContent(data.content)
      })

    return () => { active = false }
  }, [])

  return <PortfolioContext.Provider value={content}>{children}</PortfolioContext.Provider>
}
