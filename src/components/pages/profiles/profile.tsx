import { motion } from "framer-motion"
import Image from "next/image"

export default function Profile({
  onSelect
}: {
  onSelect: (profile: string) => void
}) {
  const profiles = [
    "Secretário de Saúde",
    "Médico",
    "Enfermeiro",
    "Secretário de Educação",
    "Assistente Social",
    "Admin"
  ]

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <header className="fixed w-full top-0 z-50 border-b-2 border-green-700/40">
        <div className="bg-white py-4 shadow-md">
          <nav className="relative mx-auto max-w-7xl flex items-center justify-between px-6">
            <div className="flex items-center">
              <Image
                alt="Prefeitura"
                src="/images/logo-pmb-horizontal.png"
                className="h-8 w-auto sm:h-10"
                height={140}
                width={531}
              />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Escolha seu Perfil
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profiles.map((profile, index) => (
              <motion.button
                key={index}
                onClick={() => onSelect(profile)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
              >
                {profile}
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-800 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center text-white">
          Desenvolvido por Órbita Tecnologia
        </div>
      </footer>
    </div>
  )
}
