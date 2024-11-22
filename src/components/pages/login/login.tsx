import { useState, useEffect } from 'react'
import Image from 'next/image'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Footer } from '@/components/ui/footer'

interface LoginProps {
  onLogin: (profile: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  useEffect(() => {
    // Recupera o perfil salvo no localStorage, se houver
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      onLogin(savedProfile) // Loga automaticamente
    }
  }, [onLogin])

  const handleLogin = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      let profile = ''

      if (email === 'adminorbita@teste.com' && password === 'admin123') {
        profile = 'Admin'
      } else if (email === 'educacao@teste.com' && password === 'edu123') {
        profile = 'Educacao'
      } else if (email === 'professor@teste.com' && password === 'prof123') {
        //   profile = 'Professor'
      } else if (email === 'aluno@teste.com' && password === 'alu123') {
        profile = 'Aluno'
      } else {
        alert('Credenciais inválidas')
        setIsLoggingIn(false)
        return
      }

      // Salva o perfil no localStorage
      localStorage.setItem('userProfile', profile)
      onLogin(profile)
      setIsLoggingIn(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <div className="relative flex h-screen flex-col bg-gray-100">
      {/* Header */}
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

      {/* Main Content */}
      <main className="flex flex-grow items-center justify-center bg-gray-100">
        <div className="relative w-full max-w-sm rounded-lg bg-white p-8 shadow-md">
          {/* Barra verde no topo */}
          <div className="absolute left-0 top-0 flex h-10 w-full items-center justify-center rounded-t-lg bg-green-600">
            <span className="text-sm font-semibold text-white">
              Bem-vindo à Única
            </span>
          </div>

          {/* Título */}
          <h2 className="mb-6 mt-10 text-center text-xl font-semibold text-gray-800">
            Acesse a sua conta
          </h2>

          {/* Campos de entrada */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-green-600 focus:ring-green-600"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Senha
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Digite sua Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-green-600 focus:ring-green-600"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-green-600 hover:text-green-800"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Botão de login */}
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="flex w-full items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {isLoggingIn ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
