import React from 'react';

const Avaliacoes = () => {
  return (
    <section className="mx-auto max-w-3xl flex-1 p-6 rounded-lg bg-white shadow-lg">
      {/* Título do Componente */}
      <h2 className="text-2xl font-semibold text-gray-900">Avaliações</h2>

      {/* Conteúdo de Avaliações (vazio por enquanto) */}
      <div className="mt-4">
        {/* Placeholder de Avaliações */}
        <p className="text-gray-500">Sem avaliações para exibir no momento.</p>
      </div>
    </section>
  );
};

export default Avaliacoes;
