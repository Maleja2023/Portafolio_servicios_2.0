"use client"

import "./page.css"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, ArrowLeft, MessageCircle } from "lucide-react"
import Link from "next/link"

/* -------------------- DATA -------------------- */

const socialLinks = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    url: "https://wa.me/573102276914",
    description: "Chatea con nosotros",
  },
  {
    name: "Facebook",
    icon: MessageCircle,
    color: "from-blue-600 to-blue-700",
    bgColor: "bg-blue-600/10",
    borderColor: "border-blue-600/30",
    // 🔥 LINK CORREGIDO (mejor que el share)
    url: "https://www.facebook.com/share/18hT9YNgmn/?mibextid=wwXIfr",
    description: "Síguenos en Facebook",
  },
  {
    name: "Instagram",
    icon: MessageCircle,
    color: "from-pink-500 via-purple-500 to-orange-400",
    bgColor: "bg-pink-500/10",
    borderColor: "border-pink-500/30",
    // 🔥 LINK LIMPIO (sin parámetros raros)
    url: "https://www.instagram.com/casaeventoslaurasofia?igsh=b3k1M3lmZTB3aG5y",
    description: "Mira nuestro trabajo",
  },
  {
    name: "TikTok",
    icon: MessageCircle,
    color: "from-gray-900 to-black",
    bgColor: "bg-gray-900/10",
    borderColor: "border-gray-500/30",
    url: "https://www.tiktok.com/@casadeeventoslaurasofia",
    description: "Videos de eventos",
  },
]

const contactInfo = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "+57 310 227 6914",
    href: "tel:+573102276914",
  },
  {
    icon: Mail,
    label: "Email",
    value: "ebagu3@hotmail.com",
    href: "mailto:ebagu3@hotmail.com",
  },
  {
    icon: MapPin,
    label: "Dirección",
    value: "Florencia, Caquetá, Colombia",
    href: "https://maps.google.com/?q=Florencia,Caqueta,Colombia",
  },
  {
    icon: Clock,
    label: "Horario",
    value: "Lun - Sab: 8:00 AM - 6:00 PM",
  },
]

/* -------------------- ANIMATIONS -------------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
}

const particlePositions = [
  { x: 10, y: 20 },
  { x: 40, y: 60 },
  { x: 70, y: 30 },
]

/* -------------------- COMPONENT -------------------- */

export default function ContactanosPage() {
  return (
    <div className="contacto-page-shell min-h-screen bg-background text-foreground">

      <main className="pt-10 pb-20 max-w-6xl mx-auto px-4">

        {/* BOTÓN VOLVER */}
        <Link
          href="/"
          className="flex items-center gap-2 mb-10 text-sm text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Contáctanos</h1>
          <p className="text-muted-foreground">
            Conecta con nosotros en redes sociales o visítanos
          </p>
        </div>

        {/* REDES */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-6 rounded-2xl border ${social.bgColor} ${social.borderColor}`}
            >
              <div className="text-center space-y-3">
                <div className={`p-4 rounded-xl bg-gradient-to-br ${social.color} text-white inline-block`}>
                  <social.icon />
                </div>
                <h3 className="font-semibold">{social.name}</h3>
                <p className="text-sm text-muted-foreground">{social.description}</p>
              </div>

              {/* PARTÍCULAS */}
              {particlePositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${social.color}`}
                  initial={{ x: pos.x, y: pos.y, opacity: 0 }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0, 0.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                  style={{
                    left: `${20 + i * 30}%`,
                    bottom: "20%",
                  }}
                />
              ))}
            </motion.a>
          ))}
        </motion.div>

        {/* CONTACTO + UBICACIÓN */}
        <div className="mt-20 grid md:grid-cols-2 gap-10">

          {/* INFO */}
          <div className="space-y-6">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-center gap-4 p-4 border rounded-xl">
                <info.icon className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* UBICACIÓN */}
          <div className="rounded-xl overflow-hidden border">

            <iframe
              src="https://www.google.com/maps?q=Florencia,Caqueta,Colombia&output=embed"
              className="w-full h-[300px]"
              loading="lazy"
            />

            <div className="p-6 text-center space-y-4">
              <p className="text-muted-foreground font-medium">
                Florencia, Caquetá, Colombia
              </p>

              <motion.a
                href="https://maps.google.com/?q=Florencia,Caqueta,Colombia"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-semibold shadow-lg"
              >
                <MapPin className="w-4 h-4" />
                Ver en Google Maps
              </motion.a>
            </div>

          </div>

        </div>

      </main>
    </div>
  )
}