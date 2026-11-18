import { BackToHomeLink } from '../components/BackToHomeLink.tsx'

export function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada — Bagre Robô Maker</title>
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-4 text-slate-700">O endereço acessado não existe nesta plataforma.</p>
      <BackToHomeLink />
    </>
  )
}
