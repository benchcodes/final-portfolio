import { useContext } from 'react'
import { PortfolioContext } from './PortfolioContext'

export function usePortfolioContent() {
  return useContext(PortfolioContext)
}
