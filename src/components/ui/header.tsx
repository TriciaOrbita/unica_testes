import { useState } from 'react'
import Image from 'next/image'
import SearchInput from '@/components/pages/home/SearchInput'

interface HeaderWithSearchProps {
  handleLogout: () => void
}

export function Header({ handleLogout }: HeaderWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <header className="fixed top-0 z-50 w-full border-b-2 border-green-700/40">
      <div className="bg-white py-4">
        <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#">
              <Image
                alt="Prefeitura"
                src="/images/logo-pmb-horizontal.png"
                className="h-8 w-auto sm:h-10"
                height={140}
                width={531}
              />
            </a>
          </div>

          {/* Search Input and Logout Button */}
          <div className="flex items-center gap-4">
            <SearchInput
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <button
              onClick={handleLogout}
              className="rounded-md bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
            >
              Sair
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
