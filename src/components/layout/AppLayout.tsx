import { Fish } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { Link, useLocation } from 'react-router'
import { ModuleTrail } from '../modules/ModuleTrail.tsx'
import { ScrollToTop } from './ScrollToTop.tsx'

const MAIN_CONTENT_ID = 'conteudo-principal'

interface AppLayoutProps {
  children: ReactNode
}

// Com HashRouter, um link "#id" comum alteraria a rota; por isso o foco é movido via script.
function skipToMainContent(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault()
  document.getElementById(MAIN_CONTENT_ID)?.focus()
}

export function AppLayout({ children }: AppLayoutProps) {
  // Na página inicial o circuito da aula já mostra os módulos em ordem; a trilha do cabeçalho seria repetição.
  const isHome = useLocation().pathname === '/'

  return (
    <div className="flex min-h-dvh flex-col">
      <ScrollToTop />

      {/* Quando focado, o link ocupa uma faixa própria no topo, sem cobrir o cabeçalho. */}
      <a
        href={`#${MAIN_CONTENT_ID}`}
        onClick={skipToMainContent}
        className="sr-only focus:not-sr-only focus:block focus:bg-ink focus:px-4 focus:py-3 focus:text-white focus:underline focus:outline-2 focus:-outline-offset-4 focus:outline-brand-light"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b border-hole bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-3 px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg text-ink focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-rail-minus"
          >
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-lg bg-brand text-white">
              <Fish className="size-6" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight">Bagre Robô Maker</span>
          </Link>
          {!isHome && (
            <div className="min-w-0 flex-[1_1_20rem]">
              <ModuleTrail />
            </div>
          )}
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 focus:outline-none sm:py-8">
        {children}
      </main>

      <footer className="border-t border-hole bg-white">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-600">
          Bagre Robô Maker — plataforma de apoio à aula guiada.
        </p>
      </footer>
    </div>
  )
}
