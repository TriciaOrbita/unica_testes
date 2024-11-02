import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { PessoaSaude } from "@/service/queries/getPessoasSaude";

interface PessoaCadunico {
  avatar: string; // Campo de avatar
  pessoaNome: string;
  pessoaCPF: string; // CPF da pessoa
  sexo: string; // Sexo
  dataNascimento: string; // Data de nascimento
  ufNascimento: string; // UF de nascimento
  municipioNascimento: string; // Município de nascimento
  local: string; // Local
  rua: string; // Rua
  numeroLogradouro: string; // Número do logradouro
}

interface PersonDataProps {
  pessoasCadunico: PessoaCadunico[];
  pessoasSaude: PessoaSaude[]; // Array de saúde
  searchTerm: string; // Termo de pesquisa
}

// Mapeamento de nomes para CPF
const cpfMapping: { [key: string]: string } = {
  "HENRY GABRIEL DA SILVA FERREIRA": "10028205294",
  "Hyrllen Batista Lisboa Furtado": "01809843227",
};

const sexMapping: { [key: string]: string } = {
  "HENRY GABRIEL DA SILVA FERREIRA": "Masculino",
  "Hyrllen Batista Lisboa Furtado": "Feminino",
};

const dateMapping: { [key: string]: string } = {
  "HENRY GABRIEL DA SILVA FERREIRA": "19/11/2021",
  "Hyrllen Batista Lisboa Furtado": "29/08/1999",
};

export function PersonData({
  pessoasCadunico,
  pessoasSaude,
  searchTerm,
}: PersonDataProps) {
  // Filtra os dados do CadÚnico com base no termo de busca
  const filteredCadunicoData = pessoasCadunico.filter(
    (pessoa) =>
      pessoa.pessoaNome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pessoa.pessoaCPF.includes(searchTerm), // Filtra pelo CPF também
  );

  // Garantindo que pessoasSaude seja um array, mesmo que indefinido
  const safePessoasSaude = pessoasSaude || [];

  // Se não houver resultados no CadÚnico, filtra os dados de saúde
  const filteredHealthData =
    filteredCadunicoData.length === 0
      ? safePessoasSaude.filter((pessoa) => {
          const cpf = cpfMapping[pessoa.nomeCidadao];
          return (
            pessoa.nomeCidadao
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            (cpf && cpf.includes(searchTerm)) // Também filtra pelo CPF
          );
        })
      : []; // Se houver resultados no CadÚnico, não filtra por saúde

  // Combina os dados do CadÚnico e da saúde
  const combinedData =
    filteredCadunicoData.length > 0 ? filteredCadunicoData : filteredHealthData;

  const hasResults = combinedData.length > 0 && searchTerm.trim() !== ""; // Check if there are results and if the search term is not empty

  return (
    <ScrollArea className="h-full max-h-[45rem] w-[25rem] rounded-lg border border-neutral-300 bg-white">
      <div className="relative">
        {/* Render only if there are results and search term is not empty */}
        {hasResults && (
          <div className="sticky top-0 z-10 flex w-[25rem] items-center justify-between rounded-t-lg bg-neutral-100 py-2.5 pl-5 pr-4 text-neutral-800">
            <div className="flex items-center gap-6 h-36">
              <Avatar>
                <AvatarImage
                  src={
                    combinedData[0].nomeCidadao ===
                    "Hyrllen Batista Lisboa Furtado"
                      ? "https://lh3.googleusercontent.com/chat_attachment/AP1Ws4tdTJK0uejONebm9Fuvoigaj4EuKrEtXZqOKfUGpiniIspjB7Fuv-GaKQkVxnjTP0kcyfpCzHD-JbVDckL5wH_FR3rHbGuVi2s6WyVqsaUtR5h3gEb3iPZzbfc2Qyq9i1Tha-klroqMkx2UdXpKgB-CK0bN_sN77fIJ4H26dtw9fGm_wfileIwndhikEVshwNeINMcpQbOZwdrhdKqT1hldVQue9BLT_M8b7Um-dwuRw5yRvzHqT-CsxbX1jFhfSfs1IuIDcgE5JwH_0LIWE1_Zt0TWV5TPBnwP-yf377_G_LZ1kTHS0DI61_eB8DyCi4s=w1920-h991"
                      : combinedData[0].avatar // Use o avatar da base de dados ou vazio
                  }
                  alt="Avatar"
                  onError={(e) => {
                    console.log("Erro ao carregar avatar, aplicando padrão");
                    e.currentTarget.src = "public/images/20240324_174416.jpg"; // Caminho para um avatar padrão
                  }}
                />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>

              <h2 className="font-medium">
                {combinedData[0].pessoaNome ||
                  combinedData[0].nomeCidadao ||
                  "Nome do Cidadão"}
              </h2>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4 p-4">
          {searchTerm && hasResults ? (
            <div className="mt-0 border-t border-neutral-100">
              <dl className="divide-y divide-neutral-100">
                {combinedData.map((pessoa) => {
                  // Recupera o CPF correspondente ao nome
                  const cpf = cpfMapping[pessoa.nomeCidadao];
                  const date = dateMapping[pessoa.nomeCidadao];
                  const sex = sexMapping[pessoa.nomeCidadao];

                  return (
                    <div
                      key={pessoa.coFatorCidadao || pessoa.pessoaNome}
                      className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                    >
                      <dt className="text-sm/6 font-medium text-neutral-900">
                        CPF
                      </dt>
                      <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                        <p>
                          {pessoa.pessoaCPF} {cpf}
                        </p>
                      </dd>
                      <dt className="text-sm/6 font-medium text-neutral-900">
                        Data de Nasc.
                      </dt>
                      <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                        {pessoa.dataNascimento} {date}
                      </dd>
                      <dt className="text-sm/6 font-medium text-neutral-900">
                        Sexo
                      </dt>
                      <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                        {pessoa.sexo} {sex}
                      </dd>
                      <dt className="text-sm/6 font-medium text-neutral-900">
                        Endereço
                      </dt>
                      <dd className="mt-1 text-sm/6 text-neutral-700 sm:col-span-2 sm:mt-0">
                        {pessoa.pessoaCPF
                          ? `${pessoa.rua}, ${pessoa.numeroLogradouro}, ${pessoa.local}`
                          : `${pessoa.logradouro || "Endereço não disponível"}, ${pessoa.numeroDomicilio || "Número não disponível"}, ${pessoa.bairroDomicilio || "Bairro não disponível"}`}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          ) : (
            searchTerm && <p>Nenhum resultado encontrado.</p> // Mensagem caso não haja resultados correspondentes
          )}
        </div>
      </div>
    </ScrollArea>
  );
}
