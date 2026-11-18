import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <>
      <title>Página não encontrada — Bagre Robô Maker</title>
      <h1>Página não encontrada</h1>
      <p>O endereço acessado não existe nesta plataforma.</p>
      <Link to="/">Voltar para o início</Link>
    </>
  )
}
