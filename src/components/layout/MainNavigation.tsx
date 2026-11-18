import { NavLink } from 'react-router'

interface NavigationItem {
  label: string
  to: string
  end: boolean
}

const navigationItems: readonly NavigationItem[] = [
  { label: 'Visão geral', to: '/', end: true },
  { label: 'Módulos', to: '/modulos', end: false },
]

function getNavLinkClassName({ isActive }: { isActive: boolean }): string {
  const baseClassName =
    'inline-flex items-center border-b-2 px-3 py-3 text-sm font-medium transition-colors sm:px-4 sm:text-base focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand-light'

  return isActive
    ? `${baseClassName} border-brand-light text-white`
    : `${baseClassName} border-transparent text-slate-300 hover:bg-ink-soft hover:text-white`
}

export function MainNavigation() {
  return (
    <nav aria-label="Navegação principal" className="bg-ink">
      <ul className="mx-auto flex max-w-6xl gap-1 px-2 sm:px-4">
        {navigationItems.map((navigationItem) => (
          <li key={navigationItem.to}>
            <NavLink to={navigationItem.to} end={navigationItem.end} className={getNavLinkClassName}>
              {navigationItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
