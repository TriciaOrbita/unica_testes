import { motion } from 'framer-motion'
import Image from 'next/image'
// import { useRouter } from 'next/router'

// Defina o tipo das props e inclua `onSelect`
type ProfileProps = {
  onSelect: (profile: string) => void
}

export default function Profile({ onSelect }: ProfileProps) {
  const profiles = [
    'Secretário de Saúde',
    'Médico',
    'Enfermeiro',
    'Secretário de Educação',
    'Assistente Social',
    'Admin',
  ]

  return (
    <div className="relative min-h-screen bg-gray-100">
      <header className="fixed top-0 z-50 w-full border-b-2 border-green-700/40">
        <div className="bg-white py-4 shadow-md">
          <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
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

      <main className="flex min-h-screen items-center justify-center bg-gray-100 pt-24">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Escolha seu Perfil
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile, index) => (
              <motion.button
                key={index}
                onClick={() => onSelect(profile)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-white shadow hover:bg-blue-700"
              >
                {profile}
              </motion.button>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-10 w-full bg-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-white">
          Desenvolvido por Órbita Tecnologia
        </div>
      </footer>
    </div>
  )
}
