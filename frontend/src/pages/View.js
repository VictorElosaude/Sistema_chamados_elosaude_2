import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import elosaudeLogo from '../assets/elosaude_semFundo.png';

const ViewComunicado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [comunicado, setComunicado] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComunicado = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/comunicado/${id}`);
        if (!response.ok) {
          throw new Error('Comunicado não encontrado.');
        }
        const data = await response.json();
        setComunicado(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchComunicado();
  }, [id]);

  if (loading) return <div className="text-center py-10">Carregando...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!comunicado) return <div className="text-center py-10">Comunicado não encontrado.</div>;

  const { titulo, descricao, data, beneficioPrincipal, impacto, inovacaoEmMovimento, tokenFeedback } = comunicado;

  const handleAvaliarClick = () => {
    navigate(`/feedback/${tokenFeedback}`);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
        {/* Cabeçalho do Comunicado */}
        <div className="text-center space-y-2">
          <img src={elosaudeLogo} alt="Logo Elosaúde" className="mx-auto h-16 mb-4" />
          <h1 className="text-4xl font-extrabold text-elosaude-dark">{titulo}</h1>
          <p className="text-gray-500 text-sm">Entrega concluída em: {data}</p>
        </div>

        {/* Seções com profundidade visual */}
        <div className="space-y-6">
          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-bold text-gray-800">Descrição da Entrega</h2>
            <p className="mt-2 text-gray-700">{descricao}</p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-bold text-gray-800">Benefício Principal</h2>
            <p className="mt-2 text-gray-700">{beneficioPrincipal}</p>
          </section>

          <section className="p-6 rounded-lg bg-white shadow-lg">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Impacto da Entrega</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-600">Antes</h3>
                <p className="text-gray-700 mt-1">{impacto.antes}</p>
              </div>
              <div className="p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-600">Agora</h3>
                <p className="text-gray-700 mt-1">{impacto.agora}</p>
              </div>
              <div className="p-4 rounded-md shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-600">Resultado</h3>
                <p className="text-gray-700 mt-1">{impacto.resultado}</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h2 className="text-lg font-bold text-gray-800">Inovação em Movimento</h2>
            <p className="mt-2 text-gray-700">{inovacaoEmMovimento}</p>
          </section>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={handleAvaliarClick}
            className="bg-elosaude-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
          >
            Avalie esta entrega
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewComunicado;