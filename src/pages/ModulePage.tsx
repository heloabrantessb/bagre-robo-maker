import { useParams } from 'react-router'
import { BackToHomeLink } from '../components/BackToHomeLink.tsx'
import { findModuleBySlug } from '../data/modules.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

// Página provisória: o conteúdo de cada módulo será implementado em Issues próprias.
export function ModulePage() {
  const { moduleSlug } = useParams()
  const educationalModule = findModuleBySlug(moduleSlug)

  if (!educationalModule) {
    return <NotFoundPage />
  }

  return (
    <>
      <title>{`Módulo ${educationalModule.id} — Bagre Robô Maker`}</title>
      <p className="text-sm font-semibold uppercase tracking-wide text-sky-800">
        Módulo {educationalModule.id}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{educationalModule.title}</h1>
      <p className="mt-4 text-slate-700">Conteúdo em preparação.</p>
      <BackToHomeLink />
    </>
  )
}
