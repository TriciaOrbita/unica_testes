import Image from 'next/image'

export function HeaderLogin() {
  return (
    <header className="flex-shrink-0 border-b-2 border-green-700/40">
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
  )
}
