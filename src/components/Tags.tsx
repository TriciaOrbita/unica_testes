// Tags.tsx
import React, { useState } from 'react'

const Tags = () => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const tags = [
    {
      title: 'Dados Inconsistentes',
      description: 'Alguns dados não estão corretos ou faltando.',
      colorClass: 'bg-yellow-100 text-yellow-700',
    },
    {
      title: 'Endereço Inválido',
      description: 'O endereço fornecido não é válido.',
      colorClass: 'bg-red-100 text-red-700',
    },
    {
      title: 'Vacinas Pendentes',
      description: 'Algumas vacinas ainda não foram aplicadas.',
      colorClass: 'bg-blue-100 text-blue-700',
    },
  ]

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag) // Alterna a seleção
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation() // Impede a propagação do evento
    setSelectedTag(null)
  }

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-xs ml-auto">
      <h3 className="text-lg font-semibold mb-3 text-gray-700 text-center">
        Tags
      </h3>
      <div className="flex flex-col items-center space-y-2 w-full">
        {tags.map(({ title, description, colorClass }) => (
          <div
            key={title}
            className={`w-full rounded-lg p-4 cursor-pointer hover:bg-opacity-75 ${colorClass}`}
            onClick={() => handleTagClick(title)}
          >
            <div className="flex items-center justify-between">
              <h4 className="text-md font-semibold">{title}</h4>
              {/* Ícone da seta */}
              <span
                className={`transition-transform duration-200 ${selectedTag === title ? 'rotate-180' : ''}`}
              >
                ▼ {/* Seta para baixo */}
              </span>
            </div>
            {/* Exibir descrição somente se a tag estiver selecionada */}
            {selectedTag === title && (
              <div>
                <p className="text-black mt-2">{description}</p>
                <button
                  className="mt-2 bg-red-600 text-white px-4 py-1 rounded transition duration-200 hover:bg-red-700"
                  onClick={handleClose}
                >
                  Fechar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tags
