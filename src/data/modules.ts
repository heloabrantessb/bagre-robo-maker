export interface EducationalModule {
  id: number
  slug: string
  title: string
}

// Sequência didática fixa dos cinco módulos, conforme AGENTS.md, seção 3.
export const educationalModules: readonly EducationalModule[] = [
  { id: 1, slug: 'biomimetica-garrafa-pet', title: 'Biomimética & Garrafa PET' },
  { id: 2, slug: 'eletronica-transistor-c1815', title: 'Eletrônica & Transistor C1815' },
  { id: 3, slug: 'sensor-ultrassonico-sonar', title: 'Sensor Ultrassônico & Sonar' },
  { id: 4, slug: 'programacao-espreita-ataque', title: 'Programação C++ — Espreita vs. Ataque' },
  { id: 5, slug: 'desafio-quiz', title: 'Desafio & Quiz Interativo' },
]

export function findModuleBySlug(slug: string | undefined): EducationalModule | undefined {
  return educationalModules.find((educationalModule) => educationalModule.slug === slug)
}

export function getModulePath(educationalModule: EducationalModule): string {
  return `/modulos/${educationalModule.slug}`
}
