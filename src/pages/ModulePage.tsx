import { Link, useParams } from 'react-router'
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
      <p>Módulo {educationalModule.id}</p>
      <h1>{educationalModule.title}</h1>
      <p>Conteúdo em preparação.</p>
      <Link to="/">Voltar para o início</Link>
    </>
  )
}
