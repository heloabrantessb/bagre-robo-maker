import { Navigate, Route, Routes } from 'react-router'
import { HomePage } from '../pages/HomePage.tsx'
import { ModulePage } from '../pages/ModulePage.tsx'
import { NotFoundPage } from '../pages/NotFoundPage.tsx'

export function AppRoutes() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      {/* A lista de módulos agora é a página inicial; o endereço antigo continua funcionando. */}
      <Route path="modulos" element={<Navigate to="/" replace />} />
      <Route path="modulos/:moduleSlug" element={<ModulePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
