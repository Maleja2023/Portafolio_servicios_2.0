import { CotizacionForm } from '@/components/cotizacion-form'
import './page.css'

type SearchParamsInput = Record<string, string | string[] | undefined>

async function getTipo(searchParams: SearchParamsInput | Promise<SearchParamsInput>) {
  const sp = await Promise.resolve(searchParams)
  const raw = sp.tipo
  if (typeof raw === 'string') return raw
  if (Array.isArray(raw) && raw[0]) return raw[0]
  return undefined
}

export default async function CotizacionPage({
  searchParams,
}: {
  searchParams?: SearchParamsInput | Promise<SearchParamsInput>
}) {
  const tipo = searchParams ? await getTipo(searchParams) : undefined
  return (
    <div className="cotizacion-page-shell">
      <CotizacionForm initialTipo={tipo} />
    </div>
  )
}
