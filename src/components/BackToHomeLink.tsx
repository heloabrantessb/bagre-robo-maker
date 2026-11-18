import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router'

export function BackToHomeLink() {
  return (
    <Link
      to="/"
      className="mt-6 inline-flex items-center gap-2 rounded font-medium text-sky-800 underline underline-offset-4 hover:text-sky-950 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
    >
      <ArrowLeft aria-hidden="true" className="size-4" />
      Voltar para o início
    </Link>
  )
}
