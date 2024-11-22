import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function StyledPage() {
  return (
    <ScrollArea className="bg-neutral-100">
      <div className="relative flex w-full flex-col items-center">
        {/* Top Section */}
        <div className="relative flex w-full flex-col items-center rounded-t-[300px] bg-green-600 pb-4 pt-6">
          <div className="relative h-56 w-56 overflow-hidden rounded-full border-4 border-neutral-200 shadow-lg">
            <img
              src="/images/default-avatar.jpg"
              alt="Avatar"
              className="h-full w-full object-cover"
            />
          </div>
          <h2 className="mt-12 text-center text-xl font-medium text-white">
            Nome do Cidadão
          </h2>
        </div>

        {/* Main Section */}
        <div className="w-full bg-green-600 px-6 py-8">
          <div className="w-full space-y-6">
            <dl>
              <div className="w-full bg-green-600">
                <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col">
                    <dt className="font-medium text-white">CPF</dt>
                    <dd className="text-neutral-700">
                      <div className="rounded-md border bg-neutral-50 p-2">
                        12345678901
                      </div>
                    </dd>
                  </div>

                  <div className="flex flex-col">
                    <dt className="font-medium text-white">
                      Data de Nascimento
                    </dt>
                    <dd className="text-neutral-700">
                      <div className="rounded-md border bg-neutral-50 p-2">
                        10/10/2000
                      </div>
                    </dd>
                  </div>

                  <div className="flex flex-col">
                    <dt className="font-medium text-white">Sexo</dt>
                    <dd className="text-neutral-700">
                      <div className="rounded-md border bg-neutral-50 p-2">
                        Masculino
                      </div>
                    </dd>
                  </div>

                  <div className="flex flex-col">
                    <dt className="font-medium text-white">Endereço</dt>
                    <dd className="text-neutral-700">
                      <div className="rounded-md border bg-neutral-50 p-2">
                        Rua Exemplo, Bairro, Cidade
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>

        {/* Activity Section */}
        <div className="flex w-full flex-col border border-green-600 bg-neutral-50 p-6 shadow-sm">
          <h3 className="mb-4 text-xl font-semibold text-neutral-700">
            Histórico de Atividades
          </h3>
          <div className="max-h-96 space-y-4 overflow-y-auto">
            <div className="flex w-full flex-col space-y-4">
              <div className="flex w-full items-start space-x-3">
                <span className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-5 w-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.5 7.5a1 1 0 012 0v1.5h1.5a1 1 0 010 2H10.5v1.5a1 1 0 01-2 0V11H7a1 1 0 010-2h1.5V7.5z" />
                    </svg>
                  </div>
                </span>
                <div>
                  <p className="font-medium text-neutral-700">
                    Atividade de Saúde
                  </p>
                  <p className="text-sm text-neutral-500">há 2 dias</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
