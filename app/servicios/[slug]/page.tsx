import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ServiceDetailView } from '@/components/service-detail-view'
import './page.css'
import { SERVICE_ORDER, getServicePage } from '@/lib/service-pages-data'

export function generateStaticParams() {
  return SERVICE_ORDER.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = getServicePage(slug)
  if (!config) return { title: 'Servicio' }
  return {
    title: `${config.title} | Casa de Eventos Laura Sofía`,
    description: config.intro,
  }
}

export default async function ServicioDetallePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const config = getServicePage(slug)
  if (!config) notFound()

  return (
    <div className="servicio-detalle-shell">
      <ServiceDetailView config={config} />
    </div>
  )
}
