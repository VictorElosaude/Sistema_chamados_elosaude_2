import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateComunicado = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    data: new Date().toISOString().slice(0, 10), // Data atual por padrão
    beneficioPrincipal: '',
    impacto: {
      antes: '',
      agora: '',
      resultado: '',
    },
    inovacaoEmMovimento: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.titulo || !formData.descricao) {
      setError('Título e Descrição são obrigatórios.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/comunicado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erro ao criar comunicado.');
      }

      alert(`Comunicado criado! ID: ${result.comunicadoId}`);
      navigate(`/comunicado/${result.comunicadoId}`);
    } catch (err) {
      console.error('Erro:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-elosaude-dark">Criar Novo Comunicado</h1>
          <p className="text-gray-500 text-sm">Preencha os campos abaixo para gerar o comunicado.</p>
        </div>

        {error && <div className="p-4 bg-red-100 text-red-700 rounded-md text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Campo Título */}
            <div>
              <label htmlFor="titulo" className="block text-gray-700 font-medium mb-1">Título da Entrega</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
              />
            </div>

            {/* Campo Descrição */}
            <div>
              <label htmlFor="descricao" className="block text-gray-700 font-medium mb-1">Descrição da Entrega</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                rows="4"
              ></textarea>
            </div>

            {/* Campo Benefício Principal */}
            <div>
              <label htmlFor="beneficioPrincipal" className="block text-gray-700 font-medium mb-1">Benefício Principal</label>
              <textarea
                id="beneficioPrincipal"
                name="beneficioPrincipal"
                value={formData.beneficioPrincipal}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                rows="3"
              ></textarea>
            </div>

            {/* Seção Impacto */}
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-2">Impacto da Entrega</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label htmlFor="impacto.antes" className="block text-gray-700 text-sm font-medium">Antes</label>
                  <textarea
                    id="impacto.antes"
                    name="impacto.antes"
                    value={formData.impacto.antes}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                    rows="3"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label htmlFor="impacto.agora" className="block text-gray-700 text-sm font-medium">Agora</label>
                  <textarea
                    id="impacto.agora"
                    name="impacto.agora"
                    value={formData.impacto.agora}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                    rows="3"
                  ></textarea>
                </div>
                <div className="space-y-2">
                  <label htmlFor="impacto.resultado" className="block text-gray-700 text-sm font-medium">Resultado</label>
                  <textarea
                    id="impacto.resultado"
                    name="impacto.resultado"
                    value={formData.impacto.resultado}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Campo Inovação em Movimento */}
            <div>
              <label htmlFor="inovacaoEmMovimento" className="block text-gray-700 font-medium mb-1">Inovação em Movimento</label>
              <textarea
                id="inovacaoEmMovimento"
                name="inovacaoEmMovimento"
                value={formData.inovacaoEmMovimento}
                onChange={handleChange}
                className="w-full p-3 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-elosaude-green focus:border-elosaude-green transition-colors"
                rows="3"
              ></textarea>
            </div>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 border border-transparent text-lg font-bold rounded-full shadow-lg text-white bg-elosaude-green hover:bg-elosaude-dark hover:text-elosaude-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-elosaude-green transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'PUBLICANDO...' : 'PUBLICAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateComunicado;