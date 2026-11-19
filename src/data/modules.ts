export interface ModuleStep {
  id: string
  title: string
}

// Cores de "jumper" que identificam o módulo em todo o site.
export interface ModuleColors {
  // Preenchimento de pinos, LEDs e selos.
  fill: string
  // Texto sobre o preenchimento.
  onFill: string
  // Textos na cor do módulo sobre fundo claro (contraste mínimo de 4,5:1).
  accent: string
  // Jumpers e contornos de pinos e LEDs. É decorativo: o número em grafite identifica o pino.
  wire: string
}

export interface EducationalModule {
  id: number
  slug: string
  title: string
  colors: ModuleColors
  steps: readonly ModuleStep[]
}

export interface AdjacentModules {
  previousModule: EducationalModule | undefined
  nextModule: EducationalModule | undefined
}

// Passo provisório dos módulos cujos passos ainda não foram definidos pela equipe.
function pendingSteps(moduleId: number): readonly ModuleStep[] {
  return [{ id: 'passos-a-definir', title: `[PASSOS DO MÓDULO ${moduleId}]` }]
}

// Sequência didática fixa dos cinco módulos, conforme AGENTS.md, seção 3.
export const educationalModules: readonly EducationalModule[] = [
  {
    id: 1,
    slug: 'biomimetica-garrafa-pet',
    title: 'Biomimética & Garrafa PET',
    colors: { fill: '#2e7d32', onFill: '#ffffff', accent: '#2e7d32', wire: '#2e7d32' },
    // Títulos dos passos conforme o design de referência aprovado pelo responsável.
    steps: [
      { id: 'o-que-e-biomimetica', title: 'O que é biomimética?' },
      { id: 'por-que-garrafa-pet', title: 'Por que usar uma garrafa PET?' },
      { id: 'montagem-do-corpo', title: 'Montagem do corpo do robô' },
    ],
  },
  {
    id: 2,
    slug: 'eletronica-transistor-c1815',
    title: 'Eletrônica & Transistor C1815',
    colors: { fill: '#f2c94c', onFill: '#1f2c3a', accent: '#7a5c00', wire: '#d4a106' },
    steps: pendingSteps(2),
  },
  {
    id: 3,
    slug: 'sensor-ultrassonico-sonar',
    title: 'Sensor Ultrassônico & Sonar',
    colors: { fill: '#2457a6', onFill: '#ffffff', accent: '#2457a6', wire: '#2457a6' },
    steps: pendingSteps(3),
  },
  {
    id: 4,
    slug: 'programacao-espreita-ataque',
    title: 'Programação C++ — Espreita vs. Ataque',
    colors: { fill: '#6a3fb5', onFill: '#ffffff', accent: '#6a3fb5', wire: '#6a3fb5' },
    steps: pendingSteps(4),
  },
  {
    id: 5,
    slug: 'desafio-quiz',
    title: 'Desafio & Quiz Interativo',
    colors: { fill: '#c2362f', onFill: '#ffffff', accent: '#c2362f', wire: '#c2362f' },
    steps: pendingSteps(5),
  },
]

export const TOTAL_MODULES = educationalModules.length

export function findModuleBySlug(slug: string | undefined): EducationalModule | undefined {
  return educationalModules.find((educationalModule) => educationalModule.slug === slug)
}

export function getModulePath(educationalModule: Pick<EducationalModule, 'slug'>): string {
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

// Id do elemento HTML do passo, único em toda a plataforma (ex.: "modulo-1-passo-o-que-e-biomimetica").
export function getStepElementId(
  educationalModule: Pick<EducationalModule, 'id'>,
  step: Pick<ModuleStep, 'id'>,
): string {
  return `modulo-${educationalModule.id}-passo-${step.id}`
}
