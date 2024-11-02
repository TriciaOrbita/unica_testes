import React, { useState } from "react"

interface TagsProps {
  healthData: { nomeCidadao: string; unidadeSaude?: string }[]
  cadunicoData: { pessoaNome: string; local?: string }[]
  searchTerm: string
}

// Mapeamento de nomes para CPF
const cpfMapping: { [key: string]: string } = {
  "Lara Souza da Trindade": "09579794286",
  "HENRY GABRIEL DA SILVA FERREIRA": "10028205294"
}

const Tags = ({
  healthData = [],
  cadunicoData = [],
  searchTerm
}: TagsProps) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const vaccineConditions: { [key: string]: string } = {
    "HENRY GABRIEL DA SILVA FERREIRA": "Vacina contra a Gripe",
    "Lara Souza da Trindade": "Vacina contra a Catapora"
  }

  const tags = [
    {
      title: "Dados Inconsistentes",
      description: "Alguns dados não estão corretos ou faltando.",
      colorClass: "bg-yellow-100 text-yellow-700",
      condition: () =>
        (Array.isArray(healthData) &&
          healthData.some((person) => !person.nomeCidadao)) ||
        (Array.isArray(cadunicoData) &&
          cadunicoData.some((person) => !person.pessoaNome))
    },
    {
      title: "Endereço Inválido",
      description: "O endereço fornecido não é válido.",
      colorClass: "bg-red-100 text-red-700",
      condition: () =>
        (Array.isArray(healthData) &&
          healthData.some(
            (person) => person.unidadeSaude === "Endereço Inválido"
          )) ||
        (Array.isArray(cadunicoData) &&
          cadunicoData.some((person) => person.local === "Endereço Inválido"))
    },
    {
      title: "Vacinas Pendentes",
      description: "Algumas vacinas ainda não foram aplicadas.",
      colorClass: "bg-blue-100 text-blue-700",
      condition: () => {
        const isCpfSearch =
          searchTerm.length === 11 && /^[0-9]+$/.test(searchTerm) // Check if the search term is a CPF

        if (isCpfSearch) {
          // Check if the CPF maps to a name with pending vaccines
          const nomeCorrespondente = Object.keys(cpfMapping).find(
            (key) => cpfMapping[key] === searchTerm
          )
          return (
            nomeCorrespondente !== undefined &&
            vaccineConditions[nomeCorrespondente] !== undefined
          )
        } else {
          // For name searches, check if the searchTerm matches exactly with names in vaccineConditions
          return (
            Array.isArray(healthData) &&
            healthData.some((person) => {
              // Only show if the person's name matches one in vaccineConditions
              return (
                Object.keys(vaccineConditions).includes(person.nomeCidadao) &&
                person.nomeCidadao.toLowerCase() === searchTerm.toLowerCase()
              )
            })
          )
        }
      }
    }
  ]

  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedTag(null)
  }

  const shouldRenderTags =
    typeof searchTerm === "string" && searchTerm.trim() !== ""

  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-md w-full max-w-xs ml-auto">
      <h3 className="text-lg font-semibold mb-3 text-gray-700 text-center">
        Tags
      </h3>
      <div className="flex flex-col items-center space-y-2 w-full">
        {shouldRenderTags &&
          tags.map(({ title, description, colorClass, condition }) => {
            const isVisible = condition()
            return (
              isVisible && (
                <div
                  key={title}
                  className={`w-full rounded-lg p-4 cursor-pointer hover:bg-opacity-75 ${colorClass}`}
                  onClick={() => handleTagClick(title)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-md font-semibold">{title}</h4>
                    <span
                      className={`transition-transform duration-200 ${selectedTag === title ? "rotate-180" : ""}`}
                    >
                      ▼ {/* Down arrow */}
                    </span>
                  </div>
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
              )
            )
          })}
      </div>
    </div>
  )
}

export default Tags
