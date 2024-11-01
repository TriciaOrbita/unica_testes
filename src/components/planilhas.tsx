// components/Planilhas.tsx
import React from 'react'
import Papa from 'papaparse'
import { FamilyData } from '@/interfaces/familyData'

interface PlanilhasProps {
  onImportData: (data: FamilyData[]) => void // Use o tipo definido
}

const Planilhas: React.FC<PlanilhasProps> = ({ onImportData }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      Papa.parse<FamilyData>(file, {
        header: true,
        complete: (results) => {
          // Chama a função para atualizar os dados no componente pai
          onImportData(results.data)
        },
      })
    }
  }

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  )
}

export default Planilhas
