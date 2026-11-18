import { BackToHomeLink } from '../components/BackToHomeLink.tsx'

export function NotFoundPage() {
  return (
    <section className="mx-auto max-w-2xl rounded-2xl border border-line bg-white p-6 text-center shadow-sm sm:p-10">
      <title>Página não encontrada — Bagre Robô Maker</title>
      <p className="text-sm font-semibold uppercase tracking-wide text-brand">Erro de navegação</p>
      <h1 className="mt-1 text-3xl font-bold text-ink">Página não encontrada</h1>
      <p className="mt-4 text-slate-700">O endereço acessado não existe nesta plataforma.</p>
      <BackToHomeLink />
    </section>
  )
}
