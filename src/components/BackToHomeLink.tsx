import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export function BackToHomeLink() {
  return (
    <Link
      to="/"
      className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      <ArrowLeft aria-hidden="true" className="size-5" />
      Voltar para o início
    </Link>
  )
}
