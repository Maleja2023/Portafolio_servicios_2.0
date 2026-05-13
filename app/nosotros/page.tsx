"use client"

import "./page.css"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Shield,
  Award,
  Lightbulb,
  Heart,
  Users,
  Star,
  CheckCircle2,
  Eye,
  Target,
  BookOpen,
  ArrowLeft,
} from "lucide-react"

const valores = [
  {
    icon: Shield,
    title: "Responsabilidad",
    description: "Cumplimos con cada compromiso adquirido.",
  },
  {
    icon: Award,
    title: "Calidad",
    description: "Cuidamos cada detalle para lograr eventos impecables.",
  },
  {
    icon: Lightbulb,
    title: "Creatividad",
    description: "Diseñamos experiencias únicas y personalizadas.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Nos apasiona hacer realidad cada sueño.",
  },
  {
    icon: Users,
    title: "Respeto",
    description: "Valoramos a nuestros clientes y su confianza.",
  },
  {
    icon: Star,
    title: "Trabajo en equipo",
    description: "Unimos esfuerzos para lograr resultados excepcionales.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function NosotrosPage() {
  return (
    <div className="nosotros-page-shell min-h-screen bg-background text-foreground">

      {/* BOTÓN VOLVER */}
      <div className="border-b border-primary/15 bg-background/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-foreground/70 transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
      </div>

      {/* Historia */}
      <section className="pt-16 pb-8 sm:pt-20 sm:pb-12 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative group"
          >
            <div className="glass rounded-3xl p-8 lg:p-12 border border-primary/20 group-hover:border-primary/40 transition-colors text-center lg:text-left">
              <div className="inline-flex items-center justify-center lg:justify-start gap-2 mb-6">
                <motion.div
                  whileHover={{ rotate: -6, scale: 1.05 }}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center border border-primary/30"
                >
                  <BookOpen className="w-7 h-7 text-primary" />
                </motion.div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary/90">
                  Nuestra historia
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-serif font-bold mb-6 text-gradient-gold">
                Historia
              </h1>
              <p className="text-foreground/85 leading-relaxed text-lg max-w-3xl mx-auto lg:mx-0">
                Todo comenzó con la pasión por decorar, organizar y ver la felicidad de las personas en sus
                momentos especiales. Lo que inició como pequeños detalles para familiares y amigos, poco a poco se
                fue convirtiendo en un proyecto lleno de ilusión, creatividad y compromiso.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="glass rounded-3xl p-8 lg:p-10 h-full border border-primary/20">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-6 border border-primary/30">
                    <Target className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-gradient-gold">
                    Nuestra Misión
                  </h2>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Brindar experiencias únicas e inolvidables a través de la organización y realización de eventos sociales y empresariales.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative group"
            >
              <div className="glass rounded-3xl p-8 lg:p-10 h-full border border-primary/20">
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center mb-6 border border-primary/30">
                    <Eye className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-6 text-gradient-gold">
                    Nuestra Visión
                  </h2>
                  <p className="text-foreground/80 leading-relaxed text-lg">
                    Ser reconocidos como una de las mejores casas de eventos, destacándonos por la excelencia.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {valores.map((valor) => {
              const Icon = valor.icon

              return (
                <motion.div
                  key={valor.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group relative"
                >
                  <div className="p-6 rounded-2xl border">

                    <div className="flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <h3 className="font-bold">{valor.title}</h3>
                    </div>

                    <p className="text-sm text-gray-500">
                      {valor.description}
                    </p>

                  </div>
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </section>

    </div>
  )
}