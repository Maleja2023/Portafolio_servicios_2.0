"use client"

import "./page.css"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import { Phone, Mail, MapPin, ArrowRight, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { useAuth } from "@/components/auth-provider"
import { homeServices as services, homeStats as stats } from "@/lib/home-services-data"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  },
}

// Sparkle component
function SparkleParticle({ delay, left, size }: { delay: number; left: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left, top: "100%" }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [0, -150, -300, -400],
        scale: [0, 1, 1, 0],
        rotate: [0, 180, 360, 540],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    >
      <Star className="text-primary" style={{ width: size, height: size }} fill="currentColor" />
    </motion.div>
  )
}

export default function Home() {
  const { user } = useAuth()
  const clientReserveHref =
    user?.role === "client" ? "/dashboard/cliente/reservacion" : "/contactanos"
  const clientReserveLabel =
    user?.role === "client" ? "Reservación" : "Reserva tu fecha"
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const [sparkles, setSparkles] = useState<Array<{ id: number; delay: number; left: string; size: number }>>([])

  useEffect(() => {
    const newSparkles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      delay: Math.random() * 4,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 8 + 6,
    }))
    setSparkles(newSparkles)
  }, [])

  return (
    <div
      ref={containerRef}
      className="home-page-shell min-h-screen bg-background text-foreground overflow-x-hidden"
    >
      {/* Animated Background with golden particles */}
      <div className="fixed inset-0 -z-10 golden-particles">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Floating sparkles */}
        {sparkles.map((sparkle) => (
          <SparkleParticle key={sparkle.id} {...sparkle} />
        ))}
      </div>
      <main className="relative">
        <motion.section 
          style={{ y, opacity }}
          className="min-h-[calc(100vh-9rem)] flex items-center relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="space-y-8"
              >
                <motion.span
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30 animate-border-glow"
                >
                  <Sparkles className="w-4 h-4 animate-star-twinkle" />
                  Casa de Eventos Laura Sofia
                </motion.span>

                <motion.h2
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold leading-tight tracking-tight text-balance"
                >
                  Transformamos tu{" "}
                  <span className="text-gradient-gold animate-text-glow">
                    celebracion
                  </span>{" "}
                  en una experiencia inolvidable
                </motion.h2>

                <motion.p
                  variants={itemVariants}
                  className="text-lg text-foreground/70 leading-relaxed max-w-xl"
                >
                  Planificamos quinceaños, bodas, fiestas, eventos corporativos
                  y fiestas infantiles con diseno exclusivo y servicio personalizado.
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-4"
                >
                  <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/servicios"
                      className="group inline-flex px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Ver Servicios
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={clientReserveHref}
                      className="px-8 py-4 rounded-full border-2 border-primary/50 hover:border-primary bg-card/50 backdrop-blur-sm text-foreground font-semibold transition-all duration-300 inline-flex items-center gap-2 hover:bg-primary/10"
                    >
                      {clientReserveLabel}
                    </Link>
                  </motion.div>
                </motion.div>

                {/* Stats */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-8 pt-8 border-t border-primary/20"
                >
                  {stats.map((stat, i) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="text-center sm:text-left"
                    >
                      <p className="text-3xl lg:text-4xl font-bold text-gradient-gold">
                        {stat.value}
                      </p>
                      <p className="text-sm text-foreground/60 mt-1">{stat.label}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative flex justify-center"
              >
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-4 rounded-full border-2 border-dashed border-primary/20"
                  />
                  <div className="absolute inset-8 rounded-full overflow-hidden animate-pulse-glow bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <Image
                      src="/images/logo.png"
                      alt="Casa de Eventos Laura Sofia"
                      width={280}
                      height={280}
                      className="object-contain p-4"
                      priority
                    />
                  </div>
               {/* Floating decorative elements — posiciones fijas, sin Math.random() */}
{[
  { top: "18%", left: "20%" },
  { top: "35%", left: "75%" },
  { top: "55%", left: "15%" },
  { top: "70%", left: "60%" },
  { top: "25%", left: "50%" },
  { top: "80%", left: "35%" },
].map((pos, i) => (
  <motion.div
    key={i}
    className="absolute w-3 h-3 bg-primary rounded-full"
    style={{ top: pos.top, left: pos.left }}
    animate={{
      scale: [1, 1.5, 1],
      opacity: [0.5, 1, 0.5],
      y: [0, -15, 0],
    }}
    transition={{
      duration: 2,
      delay: i * 0.3,
      repeat: Infinity,
    }}
  />
))}                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <section id="servicios" className="py-24 relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,_rgba(212,168,83,0.16),_transparent_60%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium border border-primary/30 mb-4">
                <Star className="w-4 h-4" fill="currentColor" />
                Servicios que ofrecemos
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold mb-4">
                Tu evento, <span className="text-gradient-gold">listo para brillar</span>
              </h2>
              <p className="text-foreground/70 max-w-2xl mx-auto">
                Diseñamos y producimos bodas, quinceaños, fiestas infantiles y eventos corporativos con creatividad, estilo y servicio completo.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {services.map((service) => (
                <motion.article
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03, y: -10 }}
                  className="group relative overflow-hidden rounded-[2rem] h-[420px]"
                  style={{
                    backgroundImage: `url(${service.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay degradado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 transition duration-500" />
                  
                  {/* Contenido */}
                  <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 backdrop-blur-sm border border-primary/30 mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-2 drop-shadow-lg">
                      {service.title}
                    </h3>
                    <p className="text-gray-200 text-sm leading-relaxed mb-4 drop-shadow">
                      {service.subtitle}
                    </p>

                    <ul className="space-y-2 text-gray-200 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/servicios/${service.slug}`}
                      className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                    >
                      Ver más <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-8"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold">
                Haz de tu evento algo <span className="text-gradient-gold animate-text-glow">extraordinario</span>
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Contactanos hoy y comienza a planificar el evento de tus suenos. Nuestro equipo esta listo para ayudarte.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/cotizacion"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-lg font-semibold shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/50 transition-all duration-300 animate-pulse-glow"
                >
                  <Sparkles className="w-5 h-5" />
                  Solicitar Cotizacion
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl"
        >
          <div className="glass rounded-full px-6 py-4 flex items-center justify-between gap-4 border border-primary/30">
            <div className="flex items-center gap-2 text-foreground/70">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Florencia, Colombia</span>
            </div>
            
            <div className="hidden sm:flex items-center gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-sm font-bold text-primary">{stat.value}</p>
                  <p className="text-xs text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={user?.role === "client" ? "/dashboard/cliente/reservacion" : "/contactanos"}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/25"
              >
                {user?.role === "client" ? "Reservación" : "Contactar"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-primary/20 bg-muted/50 py-12 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <Image
                src="/images/logo.png"
                alt="Casa de Eventos Laura Sofia"
                width={120}
                height={120}
                className="mb-4"
              />
              <p className="text-foreground/60 text-sm">
                Transformando suenos en celebraciones inolvidables desde hace mas de 10 anos.
              </p>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-4 text-primary">Enlaces</h4>
              <div className="space-y-2">
                <Link href="/" className="block text-foreground/60 hover:text-primary transition-colors">Inicio</Link>
                <Link href="/nosotros" className="block text-foreground/60 hover:text-primary transition-colors">Nosotros</Link>
                <Link href="/servicios" className="block text-foreground/60 hover:text-primary transition-colors">Servicios</Link>
                <Link href="/contactanos" className="block text-foreground/60 hover:text-primary transition-colors">Contacto</Link>
                <Link href="/trabajar-con-nosotros" className="block text-foreground/60 hover:text-primary transition-colors">Trabajar con nosotros</Link>
                <Link href="/login" className="block text-foreground/60 hover:text-primary transition-colors">Iniciar sesión</Link>
                <Link href="/registro" className="block text-foreground/60 hover:text-primary transition-colors">Registrarse</Link>
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-4 text-primary">Contacto</h4>
              <div className="space-y-3 text-foreground/60 text-sm">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" />
                  +57 123 456 7890
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  info@casaeventoslaurasofia.com
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  Florencia, Caqueta, Colombia
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/20 text-center text-foreground/50 text-sm">
            © 2024 Casa de Eventos Laura Sofia. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}
