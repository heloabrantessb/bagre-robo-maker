import { Fish } from 'lucide-react'
import type { MouseEvent, ReactNode } from 'react'
import { Link } from 'react-router'

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
    <div className="flex min-h-dvh flex-col bg-slate-50 text-slate-900">
      <a
        href={`#${MAIN_CONTENT_ID}`}
        onClick={skipToMainContent}
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-10 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:shadow"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-2 rounded text-lg font-bold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          >
            <Fish aria-hidden="true" className="size-6 text-sky-700" />
            Bagre Robô Maker
          </Link>
        </div>
      </header>

      <main id={MAIN_CONTENT_ID} tabIndex={-1} className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 focus:outline-none">
        {children}
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <p className="mx-auto max-w-4xl px-4 py-4 text-sm text-slate-600">
          Bagre Robô Maker — plataforma de apoio à aula guiada.
        </p>
      </footer>
    </div>
  )
}
