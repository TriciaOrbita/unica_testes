import { ScrollArea } from '@/components/ui/scroll-area'

export function PersonData() {
  return (
    <ScrollArea className="h-full max-h-[45rem] w-[25rem] rounded-lg border border-neutral-300 bg-white">
      <div className="relative">
        <div className="sticky top-0 z-10 flex w-[25rem] items-center justify-between rounded-t-lg bg-neutral-100 py-2.5 pl-5 pr-4 text-neutral-800">
          <div className="flex items-center gap-4 h-20">
            <h2 className="font-medium">Avatar e nome fixos</h2>
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <div className="mt-6 border-t border-neutral-100">
            <dl className="divide-y divide-neutral-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Condição de Saúde
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  José Euripedes
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">CPF</dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  276.803.428-22
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Data de Nascimento
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  13/10/1980
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Idade
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  44 anos
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Cad Único
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  651656165165
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Nome da Mãe
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Maria Sebastiana
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Nome do Pai
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Lourival Cruz
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Município de Nascimento
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Barcarena-PA
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Nacionalidade
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Brasileiro
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">Sexo</dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Masculino
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Endereço
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Avenida Brasil, 1400 Vila Cabanos - Barcarena-PA
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-neutral-900">
                  Situação de Rua
                </dt>
                <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                  Não
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
