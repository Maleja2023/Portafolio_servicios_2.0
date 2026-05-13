/**
 * Contenido de cada servicio: carrusel y combos.
 * Quinceaños: galería local en `public/images/quinceaños1.jpg` … `quinceaños12.jpg`.
 * Matrimonios: galería local en `public/images/boda1.jpg` … `boda14.jpg`.
 * Fiestas (generales): `public/images/Fiestas1.jpg` … `Fiestas15.jpg`.
 * Otros servicios pueden usar URLs externas o rutas bajo `/images/`.
 */

export const SERVICE_ORDER = [
  'quinceanos',
  'bodas',
  'fiestas',
  'corporativos',
  'infantiles',
] as const

export type ServiceSlug = (typeof SERVICE_ORDER)[number]

export type ServiceGalleryItem = {
  src: string
  alt: string
}

export type ServiceCombo = {
  id: string
  name: string
  tagline: string
  approxPriceLabel: string
  features: string[]
  popular?: boolean
}

export type ServicePageConfig = {
  slug: ServiceSlug
  title: string
  listSubtitle: string
  coverImage: string
  cardFeatures: string[]
  intro: string
  gallery: ServiceGalleryItem[]
  combos: ServiceCombo[]
  /** Valor del <select> en /cotizacion */
  cotizacionTipo: string
}

/** Carrusel quinceañeros: fotos en `public/images/quinceaños1.jpg` … `quinceaños12.jpg` */
const quinceLocalGallery: ServiceGalleryItem[] = Array.from({ length: 12 }, (_, i) => {
  const n = i + 1
  return {
    src: `/images/quinceaños${n}.jpg`,
    alt: `Quinceaños — decoración y celebración (foto ${n})`,
  }
})

/** Carrusel matrimonios: fotos en `public/images/boda1.jpg` … `boda14.jpg` */
const bodaLocalGallery: ServiceGalleryItem[] = Array.from({ length: 14 }, (_, i) => {
  const n = i + 1
  return {
    src: `/images/boda${n}.jpg`,
    alt: `Matrimonio — ceremonia, recepción y detalles (foto ${n})`,
  }
})

/** FiestasI1 = `FiestasI.jpg`; slides 2–8 = `FiestasI2.jpg` … `FiestasI8.jpg` */
const fiestasInfantilesLocalGallery: ServiceGalleryItem[] = [
  { src: '/images/FiestasI.jpg', alt: 'Fiestas infantiles — decoración y ambiente (1)' },
  ...([2, 3, 4, 5, 6, 7, 8] as const).map((n) => ({
    src: `/images/FiestasI${n}.jpg`,
    alt: `Fiestas infantiles — celebración y detalles (${n})`,
  })),
]

/** Fiestas (servicio general): `Fiestas1.jpg` … `Fiestas15.jpg` en `public/images/` */
const fiestasGeneralesLocalGallery: ServiceGalleryItem[] = Array.from({ length: 15 }, (_, i) => {
  const n = i + 1
  return {
    src: `/images/Fiestas${n}.jpg`,
    alt: `Fiestas — montaje, ambiente y celebración (${n})`,
  }
})

export const servicePagesBySlug: Record<ServiceSlug, ServicePageConfig> = {
  quinceanos: {
    slug: 'quinceanos',
    title: 'Quince años',
    listSubtitle:
      'Combos Dulce Ilusión, Noche de Princesa y Reina de la Noche para tu fiesta de quince.',
    coverImage: '/images/quinceaños1.jpg',
    cardFeatures: ['Decoración temática', 'Mesa principal', 'Arco de globos'],
    intro:
      'Elige el combo que mejor encaje con tu sueño de quince: desde lo esencial hasta la noche más espectacular.',
    gallery: quinceLocalGallery,
    combos: [
      {
        id: 'q-dulce-ilusion',
        name: 'Combo Básico «Dulce Ilusión»',
        tagline: 'Ideal para una celebración llena de encanto y buenos momentos.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración temática',
          'Mesa principal',
          'Arco de globos',
          'Sonido básico',
          'Espacio para fotos',
        ],
      },
      {
        id: 'q-noche-princesa',
        name: 'Combo Glam «Noche de Princesa»',
        tagline: 'Brillo extra para una noche mágica inolvidable.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración premium personalizada',
          'Backing LED',
          'Mesa de dulces',
          'Luces ambientales',
          'Entrada especial',
          'Animación básica',
        ],
        popular: true,
      },
      {
        id: 'q-reina-noche',
        name: 'Combo Imperial «Reina de la Noche»',
        tagline: 'La experiencia más completa para brillar como protagonista.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración de lujo',
          'DJ profesional',
          'Hora loca',
          'Humo frío',
          'Fotografía y video',
          'Coreografía de entrada',
          'Mobiliario exclusivo',
        ],
      },
    ],
    cotizacionTipo: 'quinceanos',
  },
  bodas: {
    slug: 'bodas',
    title: 'Matrimonios',
    listSubtitle: 'Combos Amor Eterno, Boda Soñada y Luxury Wedding para cada estilo de boda.',
    coverImage: '/images/boda1.jpg',
    cardFeatures: ['Decoración elegante', 'Mesa principal novios', 'Sonido y ambientación'],
    intro:
      'Tres niveles de combo para matrimonios íntimos, elegantes o de lujo total — revisa galería y elige el tuyo.',
    gallery: bodaLocalGallery,
    combos: [
      {
        id: 'b-amor-eterno',
        name: 'Combo Básico «Amor Eterno»',
        tagline: 'Ideal para celebraciones íntimas.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración sencilla y elegante',
          'Mesa principal para novios',
          'Mantelería básica',
          'Arco de globos o flores',
          'Sonido básico',
          'Espacio para fotografías',
        ],
      },
      {
        id: 'b-boda-sonada',
        name: 'Combo Gold «Boda Soñada»',
        tagline: 'Perfecto para bodas elegantes y modernas.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración premium personalizada',
          'Centros de mesa',
          'Iluminación ambiental',
          'Mesa de dulces',
          'Backing decorativo',
          'Sonido + micrófono',
          'Coordinación del evento',
        ],
        popular: true,
      },
      {
        id: 'b-luxury-wedding',
        name: 'Combo Imperial «Luxury Wedding»',
        tagline: 'La experiencia más exclusiva y memorable.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración de lujo completa',
          'Mobiliario premium',
          'DJ y luces profesionales',
          'Hora loca',
          'Humo frío',
          'Mesa de postres y cócteles',
          'Fotografía básica',
          'Organización total del evento',
        ],
      },
    ],
    cotizacionTipo: 'bodas',
  },
  corporativos: {
    slug: 'corporativos',
    title: 'Eventos corporativos',
    listSubtitle: 'Reuniones profesionales con imagen, logística y tecnología.',
    coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    cardFeatures: ['Logística empresarial', 'Equipos audiovisuales', 'Catering ejecutivo'],
    intro:
      'Lanzamientos, convenciones y encuentros de equipo con imagen impecable y combos pensados por formato.',
    gallery: [
      { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80', alt: 'Auditorio corporativo' },
      { src: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80', alt: 'Networking' },
      { src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80', alt: 'Conferencia' },
      { src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80', alt: 'Sala de juntas estilizada' },
    ],
    combos: [
      {
        id: 'c-meet',
        name: 'Combo Meeting',
        tagline: 'Juntas y presentaciones ágiles.',
        approxPriceLabel: 'Desde $4.200.000 COP',
        features: [
          'Montaje tipo auditorio o escuela',
          'Proyector, pantalla y sonido básico',
          'Coffee break para hasta 50 personas (ref.)',
          'Coordinación logística en sitio',
        ],
      },
      {
        id: 'c-brand',
        name: 'Combo Brand Day',
        tagline: 'Lanzamiento o kick-off con imagen.',
        approxPriceLabel: 'Desde $12.800.000 COP',
        features: [
          'Escenografía con marca y rollup',
          'Audio profesional + iluminación básica',
          'Catering lunch o coctel ejecutivo',
          'Cronograma y soporte a speakers',
        ],
        popular: true,
      },
      {
        id: 'c-summit',
        name: 'Combo Summit',
        tagline: 'Evento de alto formato y múltiples bloques.',
        approxPriceLabel: 'Desde $28.000.000 COP',
        features: [
          'Diseño de sala y breaks temáticos',
          'Streaming híbrido (según requerimiento)',
          'Catering premium y cenas de cierre',
          'Equipo de producción dedicado',
        ],
      },
    ],
    cotizacionTipo: 'corporativos',
  },
  infantiles: {
    slug: 'infantiles',
    title: 'Fiestas infantiles',
    listSubtitle:
      'Cumpleaños y celebraciones para niños — combos Celebración Feliz, Fiesta Inolvidable y Mega Party.',
    coverImage: '/images/FiestasI.jpg',
    cardFeatures: ['Decoración temática', 'Mesa principal y dulces', 'Globos, juegos y diversión'],
    intro:
      'Fiestas infantiles con color, temática y buena energía: decoración, dulces, animación y espacios pensados para que los peques disfruten y los adultos también.',
    gallery: fiestasInfantilesLocalGallery,
    combos: [
      {
        id: 'i-celebracion-feliz',
        name: 'Combo Básico «Celebración Feliz»',
        tagline: 'Ideal para una fiesta infantil cercana y colorida.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración sencilla',
          'Globos personalizados',
          'Mantelería',
          'Mesa principal',
        ],
      },
      {
        id: 'i-fiesta-inolvidable',
        name: 'Combo Plus «Fiesta Inolvidable»',
        tagline: 'Más tema, dulces y espacio para fotos.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración temática',
          'Mesa de dulces',
          'Sonido básico',
          'Backing para fotos',
          'Centros de mesa',
        ],
        popular: true,
      },
      {
        id: 'i-mega-party',
        name: 'Combo Imperial «Mega Party»',
        tagline: 'La fiesta grande con DJ, animación y recuerdos en foto.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración premium',
          'DJ y luces',
          'Recreacionista o animador',
          'Hora loca',
          'Fotografía básica',
          'Letras gigantes',
        ],
      },
    ],
    cotizacionTipo: 'infantiles',
  },
  fiestas: {
    slug: 'fiestas',
    title: 'Fiestas',
    listSubtitle: 'Combos Brindis, Noche espectacular y Gran celebración para tus eventos sociales.',
    coverImage: '/images/Fiestas1.jpg',
    cardFeatures: ['Ambientación y luces', 'Mesa principal o buffet', 'Sonido y pista'],
    intro:
      'Cumpleaños de adultos, grados, aniversarios, reuniones especiales y más: decoración, sonido y logística para que solo disfrutes la noche.',
    gallery: fiestasGeneralesLocalGallery,
    combos: [
      {
        id: 'f-brindis',
        name: 'Combo Básico «Brindis»',
        tagline: 'Ideal para una fiesta íntima con buen ambiente.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración y mantelería básica',
          'Mesa principal o bufé sencillo',
          'Sonido ambiental',
          'Iluminación decorativa',
        ],
      },
      {
        id: 'f-noche-espectacular',
        name: 'Combo Gold «Noche espectacular»',
        tagline: 'Más impacto visual, pista y espacio para bailar.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Ambientación temática',
          'Mesa de dulces o coctel',
          'DJ o playlist profesional',
          'Luces LED y efectos básicos',
          'Backing o photocall',
        ],
        popular: true,
      },
      {
        id: 'f-gran-celebracion',
        name: 'Combo Imperial «Gran celebración»',
        tagline: 'Producción completa para una fiesta memorable.',
        approxPriceLabel: 'Cotización personalizada',
        features: [
          'Decoración premium y escenografía',
          'Coordinación del evento',
          'Audio e iluminación profesional',
          'Mesa de postres o catering (según brief)',
          'Fotografía o video básico',
          'Hora loca o animación (según contrato)',
        ],
      },
    ],
    cotizacionTipo: 'fiestas',
  },
}

export function getServicePage(slug: string): ServicePageConfig | null {
  if (!SERVICE_ORDER.includes(slug as ServiceSlug)) return null
  return servicePagesBySlug[slug as ServiceSlug]
}
