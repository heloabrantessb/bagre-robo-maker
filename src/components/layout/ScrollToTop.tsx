import { useEffect } from 'react'
import { useLocation } from 'react-router'

// O HashRouter não restaura a rolagem; ao trocar de página, a nova página começa no topo.
export function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
