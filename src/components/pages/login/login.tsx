import { useState } from "react"
import Image from "next/image"

interface LoginProps {
  onLogin: (profile: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      if (email === "adminorbita@teste.com" && password === "admin123") {
        onLogin("Admin")
      } else if (email === "educacao@teste.com" && password === "edu123") {
        onLogin("Educacao")
      } else {
        alert("Credenciais inválidas")
      }
      setIsLoggingIn(false)
    }, 1500)
  }

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
            Login
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 mb-4 border rounded-md shadow-sm"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 mb-6 border rounded-md shadow-sm"
          />
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            {isLoggingIn ? "Entrando..." : "Entrar"}
          </button>
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
