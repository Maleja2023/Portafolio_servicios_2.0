"use client"

import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import { motion } from "framer-motion"
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileWarning,
  HardHat,
  Shield,
  Sparkles,
  UserCheck,
} from "lucide-react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const collaborationRequirements: {
  icon: LucideIcon
  title: string
  description: string
}[] = [
  {
    icon: Sparkles,
    title: "Experiencia en eventos",
    description:
      "Trayectoria comprobable en decoración, montaje, logística o el rubro que ofrezcas (mesas, escenografía, floristería, iluminación, etc.). Portafolio o referencias de trabajos anteriores.",
  },
  {
    icon: UserCheck,
    title: "Actitud y trabajo en equipo",
    description:
      "Puntualidad, comunicación clara con coordinación y respeto hacia clientes, invitados y otros proveedores. Disposición a seguir el cronograma del evento.",
  },
  {
    icon: Shield,
    title: "Compromiso con seguridad e higiene",
    description:
      "Aceptación y cumplimiento de los protocolos de seguridad industrial, operativa y de catering descritos en esta página, incluido el uso de EPP cuando aplique.",
  },
  {
    icon: ClipboardList,
    title: "Documentación cuando corresponda",
    description:
      "Facturación electrónica y obligaciones tributarias al día; certificaciones de manipulación de alimentos, licencias de música en vivo o pólizas si el encargo las exige.",
  },
]

const seguridadHighlights = [
  "Plan de emergencia y botiquín en cada evento",
  "Personal alineado con protocolos de seguridad en montaje y operación",
  "Higiene y buenas prácticas en catering y zonas de alimentos",
  "Cuidados especiales en eventos infantiles (accesos, materiales y supervisión)",
]

const seguridadClauses: {
  value: string
  title: string
  paragraphs?: string[]
  blocks?: { heading: string; items: string[] }[]
}[] = [
  {
    value: "seg-objetivo",
    title: "Objetivo",
    paragraphs: [
      "Garantizar la integridad de clientes, invitados, trabajadores e instalaciones, minimizando riesgos durante el montaje, ejecución y desmontaje de eventos.",
    ],
  },
  {
    value: "seg-riesgos",
    title: "1. Identificación de riesgos",
    paragraphs: [
      "Caídas por cables, decoración o superficies húmedas.",
      "Sobrecarga eléctrica en equipos de sonido e iluminación.",
      "Manipulación de estructuras (tarimas, mesas, carpas).",
      "Riesgos en cocina o catering (quemaduras, cortes).",
      "Riesgos en eventos infantiles (aglomeraciones, juegos).",
    ],
  },
  {
    value: "seg-medidas",
    title: "2. Medidas preventivas",
    blocks: [
      {
        heading: "Área operativa",
        items: [
          "Mantener pasillos despejados y señalizados.",
          "Uso de cinta antideslizante en zonas críticas.",
          "Orden en cables eléctricos (canaletas o cubre cables).",
        ],
      },
      {
        heading: "Electricidad",
        items: [
          "Uso de extensiones certificadas.",
          "No sobrecargar tomas eléctricas.",
          "Supervisión permanente de iluminación y sonido.",
        ],
      },
      {
        heading: "Montaje y estructuras",
        items: [
          "Revisión previa de estabilidad de mesas, tarimas y decoración.",
          "Uso de escaleras seguras y equipos adecuados.",
          "Prohibido improvisar instalaciones de carga pesada.",
        ],
      },
      {
        heading: "Catering y alimentos",
        items: [
          "Manipulación con guantes y elementos higiénicos.",
          "Control de temperatura en alimentos.",
          "Separación de áreas limpias y sucias.",
        ],
      },
    ],
  },
  {
    value: "seg-epp",
    title: "3. Elementos de protección personal (EPP)",
    paragraphs: [
      "Guantes de trabajo.",
      "Calzado antideslizante.",
      "Chalecos reflectivos para personal de montaje.",
      "Protección auditiva en eventos con sonido alto.",
    ],
  },
  {
    value: "seg-emergencia",
    title: "4. Plan de emergencia",
    paragraphs: [
      "Botiquín de primeros auxilios disponible en todo evento.",
      "Extintores ubicados en zonas estratégicas.",
      "Ruta de evacuación señalizada.",
      "Responsable de seguridad designado por evento.",
      "Comunicación inmediata con servicios de emergencia si es necesario.",
    ],
  },
  {
    value: "seg-infantil",
    title: "5. Seguridad en eventos infantiles",
    paragraphs: [
      "Supervisión constante de animadores y personal.",
      "Control de acceso a áreas de juegos.",
      "Materiales decorativos no tóxicos ni inflamables.",
      "Prohibición de objetos pequeños peligrosos.",
    ],
  },
  {
    value: "seg-control",
    title: "6. Control y verificación",
    paragraphs: [
      "Checklist de seguridad antes de cada evento.",
      "Inspección final después del montaje.",
    ],
  },
]

const clauses: {
  value: string
  title: string
  paragraphs: string[]
}[] = [
  {
    value: "aceptacion",
    title: "1. Identificación, alcance y aceptación",
    paragraphs: [
      "Casa de Eventos Laura Sofía («la Casa de Eventos»), con sede de operación en Florencia, Caquetá, Colombia, organiza y produce celebraciones sociales y empresariales (bodas, quinceaños, fiestas, eventos corporativos, fiestas infantiles y afines).",
      "Los presentes términos y condiciones aplican a personas naturales o jurídicas que deseen prestar servicios como aliados, proveedores independientes, contratistas o personal de apoyo («el Prestador»), distinto del público que solo contrata un evento como cliente final.",
      "Al enviar información, cotizar como aliado o iniciar labores sujetas a orden de servicio, el Prestador declara haber leído y aceptado este documento en la versión publicada en el sitio web, sin perjuicio de contratos o anexos específicos que firmen las partes.",
    ],
  },
  {
    value: "objeto",
    title: "2. Objeto del vínculo",
    paragraphs: [
      "El vínculo se entiende como la prestación ocasional o recurrente de servicios especializados a favor de la Casa de Eventos o de los clientes cuyos eventos ella coordine, según el encargo: decoración, banquetes, audiovisuales, animación, logística, transporte, fotografía referida, entre otros autorizados por escrito.",
      "Salvo pacto expreso distinto, no se presume relación laboral exclusiva ni subordinación permanente. La naturaleza jurídica concreta (prestación de servicios, contrato de obra, mandato, etc.) quedará definida en el documento que suscriban las partes y en la normativa colombiana aplicable.",
    ],
  },
  {
    value: "ordenes",
    title: "3. Órdenes de servicio, cronograma y sede",
    paragraphs: [
      "Cada evento se regirá por una orden de servicio, cotización aceptada o contrato marco que describa fecha, hora, lugar, alcance, personal autorizado y tarifas. El Prestador debe cumplir el cronograma aprobado y las instrucciones del director o coordinador designado por la Casa de Eventos.",
      "En la sede del evento o en locaciones de terceros, el Prestador respetará normas internas de bioseguridad, uso de cocinas, ascensores, ruido máximo permitido por la ley y lineamientos del establecimiento. Cualquier daño a instalaciones deberá reportarse de inmediato al coordinador.",
    ],
  },
  {
    value: "obligaciones-prestador",
    title: "4. Obligaciones del Prestador",
    paragraphs: [
      "Puntualidad, presentación personal acorde al tipo de evento, trato respetuoso hacia clientes, invitados y equipo de la Casa de Eventos.",
      "Portar insumos, equipos y permisos que correspondan a su actividad (licencias de música en vivo cuando aplique, certificaciones de manipulación de alimentos, pólizas de responsabilidad civil si fueron exigidas en la cotización).",
      "No subcontratar total o parcialmente sin autorización escrita de la Casa de Eventos. Quien asista en representación del Prestador deberá estar identificado y cumplir las mismas reglas.",
      "Abstenerse de consumir alcohol o sustancias que afecten el desempeño durante el servicio; no fumar en zonas no autorizadas ni exponer a menores de edad a riesgos evitables.",
    ],
  },
  {
    value: "obligaciones-casa",
    title: "5. Obligaciones de la Casa de Eventos",
    paragraphs: [
      "Coordinar con el cliente final la viabilidad técnica del servicio y comunicar al Prestador cambios relevantes de horario o formato con la mayor antelación posible.",
      "Pagar los honorarios acordados según las fechas y medios establecidos en la orden de servicio o factura, sujetos a la correcta ejecución y entrega de soportes tributarios válidos en Colombia cuando corresponda.",
      "Proveer canales de comunicación oficiales (correo, teléfono o WhatsApp indicados en el sitio) para dudas operativas del día del evento.",
    ],
  },
  {
    value: "pagos",
    title: "6. Pagos, facturación y cancelaciones",
    paragraphs: [
      "Los valores se expresan en pesos colombianos (COP) salvo acuerdo escrito distinto. La Casa de Eventos podrá retener pagos si existen incumplimientos graves documentados (no asistencia injustificada, daños, violación de confidencialidad).",
      "Las cancelaciones por parte del cliente final o fuerza mayor pueden afectar el encargo del Prestador; en esos casos se buscará reprogramación razonable. Si el evento se cancela sin culpa del Prestador y no hay nueva fecha, se liquidará lo efectivamente ejecutado o lo pactado en el anexo de cancelación.",
      "El Prestador es responsable de cumplir sus obligaciones tributarias (facturación electrónica, retenciones en la fuente, aportes a seguridad social si aplica por su calidad jurídica), conforme asesoría propia.",
    ],
  },
  {
    value: "confidencialidad",
    title: "7. Confidencialidad, datos personales e imagen",
    paragraphs: [
      "Los listados de invitados, presupuestos, platos, playlists, diseños y demás información del cliente se consideran confidenciales. No podrán divulgarse en redes, prensa o terceros sin autorización escrita del cliente y de la Casa de Eventos.",
      "El tratamiento de datos personales que el Prestador recolecte o acceda en virtud del encargo se regirá por la Ley 1581 de 2012 y normas concordantes; solo podrá usarlos para ejecutar el servicio contratado y deberá adoptar medidas razonables de seguridad.",
      "El uso de nombre comercial, logotipo o material gráfico de la Casa de Eventos en portafolio o publicidad requerirá autorización previa y respeto de las guías de marca que se compartan.",
    ],
  },
  {
    value: "propiedad",
    title: "8. Propiedad intelectual y contenidos",
    paragraphs: [
      "Los diseños, guiones de animación, escenografías y propuestas creativas entregadas por el Prestador como parte del encargo podrán ser utilizados por la Casa de Eventos y el cliente final dentro del ámbito del evento contratado, salvo limitación expresa por escrito.",
      "Si el Prestador utiliza obras de terceros (música, imágenes, tipografías comerciales), declara contar con las licencias necesarias y mantendrá indemne a la Casa de Eventos frente a reclamaciones por infracción.",
    ],
  },
  {
    value: "responsabilidad",
    title: "9. Responsabilidad, seguros e indemnidad",
    paragraphs: [
      "Cada parte responderá por los daños que cause por dolo o culpa grave en el desempeño de sus obligaciones. La Casa de Eventos no garantiza un volumen mínimo de eventos para el Prestador.",
      "Cuando el encargo lo requiera, el Prestador deberá contar con pólizas de responsabilidad civil o equipos asegurados, indicando vigencia y beneficiarios según lo solicitado en la cotización.",
      "El Prestador mantendrá indemne a la Casa de Eventos por reclamaciones de terceros originadas en el incumplimiento de normas laborales, de tránsito, sanitarias o ambientales atribuibles al Prestador o su personal.",
    ],
  },
  {
    value: "terminacion",
    title: "10. Terminación, incumplimiento y modificaciones",
    paragraphs: [
      "El incumplimiento grave (ausencia injustificada, retrasos que arruinen el servicio, conductas ofensivas o ilegales) podrá motivar la terminación inmediata del encargo y las acciones legales pertinentes.",
      "La Casa de Eventos podrá actualizar estos términos publicando la nueva versión en el sitio. Los encargos en curso se regirán por la versión vigente al momento de la aceptación, salvo acuerdo de migración expreso.",
    ],
  },
  {
    value: "ley",
    title: "11. Ley aplicable, domicilio y contacto",
    paragraphs: [
      "Para lo no regulado aquí se aplicará la legislación colombiana. Las partes procurarán solucionar controversias de buena fe; si no fuere posible, se someten a los jueces de la república, con domicilio principal en Florencia, Caquetá, sin perjuicio de normas imperativas sobre competencia.",
      "Notificaciones y envío de documentación legal podrán dirigirse a los canales oficiales indicados en la sección de contacto del sitio web. Se entenderá recibida cuando conste acuse en el medio utilizado.",
    ],
  },
]

export default function TrabajarConNosotrosPage() {
  return (
    <div className="trabajar-page-shell min-h-screen bg-background text-foreground">
      <div className="border-b border-primary/15 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-16">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-10 text-center"
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
            Prestadores y aliados
          </span>
          <h1 className="font-serif text-3xl font-bold sm:text-4xl">
            Trabajar con nosotros —{" "}
            <span className="text-gradient-gold">
              requisitos, seguridad y términos
            </span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
            Aquí encontrarás lo que valoramos en quienes colaboran con{" "}
            <strong className="text-foreground">Casa de Eventos Laura Sofía</strong>
            , los lineamientos de{" "}
            <strong className="text-foreground">seguridad industrial y operativa</strong>{" "}
            que aplicamos en cada evento y el documento legal de referencia. Si encajas
            con el perfil, te invitamos a escribirnos con tu portafolio.
          </p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mb-10 flex gap-3 rounded-2xl border border-primary/25 bg-secondary/30 p-4 text-sm text-foreground/80"
        >
          <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p>
            <strong className="text-foreground">Nota:</strong> este texto es una
            base orientativa y no sustituye asesoría jurídica. Los contratos,
            órdenes de servicio y políticas internas que firmes con cada prestador
            prevalecerán sobre lo general aquí expuesto.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.42 }}
          className="mb-12"
          aria-labelledby="requisitos-colaborar"
        >
          <div className="mb-6 flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-primary">
              <UserCheck className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2
                id="requisitos-colaborar"
                className="font-serif text-2xl font-bold text-foreground"
              >
                Requisitos para colaborar
              </h2>
              <p className="mt-1 text-sm text-foreground/70">
                Buscamos personas o empresas con experiencia y habilidades alineadas
                con la decoración, organización y ejecución de eventos sociales y
                empresariales.
              </p>
            </div>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {collaborationRequirements.map(({ icon: Icon, title, description }) => (
              <li
                key={title}
                className="rounded-2xl border border-primary/20 bg-secondary/25 p-5 transition hover:border-primary/35"
              >
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Icon className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="font-semibold text-foreground">{title}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground/80">{description}</p>
              </li>
            ))}
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.42 }}
          className="mb-12"
          aria-labelledby="seguridad-operativa"
        >
          <div className="mb-6 flex items-start gap-3">
            <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-primary/35 bg-primary/10 text-primary">
              <HardHat className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2
                id="seguridad-operativa"
                className="font-serif text-2xl font-bold text-foreground"
              >
                Seguridad industrial y operativa
              </h2>
              <p className="mt-1 max-w-2xl text-sm text-foreground/70">
                Tu tranquilidad y la de quienes montamos cada evento son prioridad.
                Estos puntos resumen nuestro enfoque; el detalle operativo está
                desplegable más abajo.
              </p>
            </div>
          </div>

          <div className="mb-6 grid gap-3 sm:grid-cols-2">
            {seguridadHighlights.map((text) => (
              <div
                key={text}
                className="flex gap-3 rounded-xl border border-primary/20 bg-background/50 px-4 py-3 text-sm text-foreground/90"
              >
                <CheckCircle2
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  aria-hidden
                />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="glass rounded-[1.75rem] border border-primary/20 px-3 py-2 sm:px-5">
            <Accordion type="single" collapsible className="w-full">
              {seguridadClauses.map((section) => (
                <AccordionItem
                  key={section.value}
                  value={section.value}
                  className="border-primary/15 px-1"
                >
                  <AccordionTrigger className="font-serif text-base text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-primary">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 text-foreground/80">
                      {section.paragraphs?.map((p, i) => (
                        <p key={`${section.value}-p-${i}`} className="leading-relaxed">
                          {p}
                        </p>
                      ))}
                      {section.blocks?.map((block) => (
                        <div key={block.heading}>
                          <p className="mb-2 font-medium text-foreground">{block.heading}</p>
                          <ul className="list-inside list-disc space-y-1.5 text-sm leading-relaxed">
                            {block.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.4 }}
          className="mb-4"
        >
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Términos y condiciones
          </h2>
          <p className="mt-1 text-sm text-foreground/65">
            Documento legal de referencia para aliados y prestadores.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="glass rounded-[1.75rem] border border-primary/20 px-3 py-2 sm:px-5"
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="aceptacion"
            className="w-full"
          >
            {clauses.map((clause) => (
              <AccordionItem
                key={clause.value}
                value={clause.value}
                className="border-primary/15 px-1"
              >
                <AccordionTrigger className="font-serif text-base text-foreground hover:no-underline sm:text-lg [&[data-state=open]]:text-primary">
                  {clause.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-foreground/80">
                    {clause.paragraphs.map((p, i) => (
                      <p key={`${clause.value}-${i}`} className="leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-[1.75rem] border border-primary/30 bg-gradient-to-br from-primary/12 to-secondary/25 p-8 text-center"
        >
          <h2 className="font-serif text-xl font-bold sm:text-2xl">
            ¿Listo para vincularte o enviar tu portafolio?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-foreground/70">
            Escríbenos por el canal oficial y adjunta experiencia, disponibilidad en
            Florencia y zona, y rubro en el que participas (catering, DJ, floristería,
            etc.).
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/contactanos"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40"
            >
              Ir a contacto
            </Link>
            <Link
              href="/servicios"
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition hover:bg-primary/10"
            >
              Ver servicios
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
