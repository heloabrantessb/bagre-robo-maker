import { Fish } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'
import { MainNavigation } from './MainNavigation.tsx'
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

      <header className="bg-brand text-white">
        <div className="mx-auto flex max-w-6xl items-center px-4 py-3 sm:py-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            <Fish aria-hidden="true" className="size-8 shrink-0" />
            <span className="flex flex-col leading-tight sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-lg font-bold sm:text-xl">Bagre Robô Maker</span>
              <span aria-hidden="true" className="hidden text-white/70 sm:inline">
                —
              </span>
              <span className="text-sm text-white/90 sm:text-base">Plataforma Educacional</span>
            </span>
          </Link>
        </div>
      </header>

      <MainNavigation />

      <main
        id={MAIN_CONTENT_ID}
        tabIndex={-1}
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 focus:outline-none sm:py-8"
      >
        {children}
      </main>

      <footer className="border-t border-line bg-white">
        <p className="mx-auto max-w-6xl px-4 py-4 text-sm text-slate-600">
          Bagre Robô Maker — plataforma de apoio à aula guiada.
        </p>
      </footer>
    </div>
  )
}
