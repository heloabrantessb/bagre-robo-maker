export interface EducationalModule {
  id: number
  slug: string
  title: string
}

export interface AdjacentModules {
  previousModule: EducationalModule | undefined
  nextModule: EducationalModule | undefined
}

// Sequência didática fixa dos cinco módulos, conforme AGENTS.md, seção 3.
export const educationalModules: readonly EducationalModule[] = [
  { id: 1, slug: 'biomimetica-garrafa-pet', title: 'Biomimética & Garrafa PET' },
  { id: 2, slug: 'eletronica-transistor-c1815', title: 'Eletrônica & Transistor C1815' },
  { id: 3, slug: 'sensor-ultrassonico-sonar', title: 'Sensor Ultrassônico & Sonar' },
  { id: 4, slug: 'programacao-espreita-ataque', title: 'Programação C++ — Espreita vs. Ataque' },
  { id: 5, slug: 'desafio-quiz', title: 'Desafio & Quiz Interativo' },
]

export const TOTAL_MODULES = educationalModules.length

export function findModuleBySlug(slug: string | undefined): EducationalModule | undefined {
  return educationalModules.find((educationalModule) => educationalModule.slug === slug)
}

export function getModulePath(educationalModule: EducationalModule): string {
  return `/modulos/${educationalModule.slug}`
}

// Índice do módulo na sequência, localizado pelo id (não pela referência do objeto); -1 se desconhecido.
function findModuleIndex(educationalModule: Pick<EducationalModule, 'id'>): number {
  return educationalModules.findIndex(({ id }) => id === educationalModule.id)
}

// Posição do módulo na sequência didática (1 a TOTAL_MODULES); não representa progresso do aluno.
// Retorna undefined para um módulo que não pertence à sequência.
export function getModulePosition(educationalModule: Pick<EducationalModule, 'id'>): number | undefined {
  const index = findModuleIndex(educationalModule)
  return index === -1 ? undefined : index + 1
}

// Para um módulo que não pertence à sequência, não há anterior nem próximo.
export function getAdjacentModules(educationalModule: Pick<EducationalModule, 'id'>): AdjacentModules {
  const index = findModuleIndex(educationalModule)

  if (index === -1) {
    return { previousModule: undefined, nextModule: undefined }
  }

  return {
    previousModule: educationalModules[index - 1],
    nextModule: educationalModules[index + 1],
  }
}
