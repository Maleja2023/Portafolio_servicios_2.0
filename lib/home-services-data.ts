import {
  Calendar,
  Heart,
  Music,
  PartyPopper,
  Sparkles,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

import type { ServiceSlug } from "@/lib/service-pages-data"
import { SERVICE_ORDER, servicePagesBySlug } from "@/lib/service-pages-data"

export const iconBySlug: Record<ServiceSlug, LucideIcon> = {
  quinceanos: Sparkles,
  bodas: Heart,
  fiestas: Music,
  corporativos: Calendar,
  infantiles: PartyPopper,
}

export const homeStats = [
  { label: "Eventos realizados", value: "250+" },
  { label: "Anos de experiencia", value: "10" },
  { label: "Clientes felices", value: "200+" },
]

export const homeServices = SERVICE_ORDER.map((slug) => {
  const c = servicePagesBySlug[slug]
  return {
    slug,
    title: c.title,
    subtitle: c.listSubtitle,
    icon: iconBySlug[slug],
    image: c.coverImage,
    features: c.cardFeatures,
  }
})
