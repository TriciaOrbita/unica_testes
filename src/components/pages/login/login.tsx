import { useState } from 'react'
import Image from 'next/image'

interface LoginProps {
  onLogin: (profile: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      if (email === 'adminorbita@teste.com' && password === 'admin123') {
        onLogin('Admin')
      } else if (email === 'educacao@teste.com' && password === 'edu123') {
        onLogin('Educacao')
      } else {
        alert('Credenciais inválidas')
      }
      setIsLoggingIn(false)
    }, 1500)
  }

  return (
    <div className="relative min-h-screen bg-gray-100">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex min-h-screen items-center justify-center bg-gray-100 pt-24">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-6 w-full rounded-md border px-4 py-2 shadow-sm"
          />
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            {isLoggingIn ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-10 w-full bg-gray-800 py-6">
        <div className="mx-auto max-w-7xl px-6 text-center text-white">
          Desenvolvido por Órbita Tecnologia
        </div>
      </footer>
    </div>
  )
}
