import React, { useEffect, useState } from 'react';

const AnalyticsPage = () => {
  const [comunicados, setComunicados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    let url = 'http://localhost:3000/api/comunicados';

    if (startDate && endDate) {
      url += `?from_date=${startDate}&to_date=${endDate}`;
    }

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Falha ao buscar os dados.');
      }
      const data = await response.json();
      setComunicados(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = () => {
    fetchData();
  };

  if (loading) return <div className="text-center py-10">Carregando dados...</div>;
  if (error) return <div className="text-center py-10 text-red-600">Erro: {error}</div>;

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-elosaude-dark">Análise de Feedbacks</h1>
          <p className="text-gray-500 text-sm">Visualize o desempenho das entregas com base no feedback.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 p-4 rounded-lg bg-gray-50 shadow-inner">
          <label htmlFor="startDate" className="font-semibold text-gray-700">De:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <label htmlFor="endDate" className="font-semibold text-gray-700">Até:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded-md"
          />
          <button
            onClick={handleFilter}
            className="px-6 py-2 bg-elosaude-green text-white font-bold rounded-md hover:bg-green-700 transition-colors"
          >
            Filtrar
          </button>
        </div>
        
        {comunicados.length === 0 ? (
          <div className="text-center text-gray-500 p-8">Nenhum comunicado encontrado para o período selecionado.</div>
        ) : (
          <div className="space-y-6">
            {comunicados.map((comunicado) => (
              <div key={comunicado.id} className="bg-gray-50 rounded-lg shadow-sm p-6 space-y-4">
                <h2 className="text-2xl font-bold text-elosaude-dark">{comunicado.titulo}</h2>
                <div className="flex justify-between items-center text-sm text-gray-500 mt-2">
                  <p>Data de Publicação: {comunicado.data}</p>
                  <p>Feedbacks Recebidos: <span className="font-bold text-gray-800">{comunicado.numFeedbacks}</span></p>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-white rounded-lg shadow-inner">
                  <div className="text-center mb-4 md:mb-0">
                    <p className="text-4xl font-extrabold text-elosaude-green">{comunicado.mediaSatisfacao}</p>
                    <p className="text-sm text-gray-600">Nota Média</p>
                  </div>
                </div>

                {comunicado.feedbacks.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Comentários:</h3>
                    <ul className="space-y-2">
                      {comunicado.feedbacks.map((feedback, index) => (
                        <li 
                          key={index} 
                          className={`
                            flex items-start p-3 rounded-lg border border-gray-100
                            ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
                          `}>
                          <span className="font-bold text-lg text-elosaude-green mr-4">
                            {feedback.nota}★
                          </span>
                          <p className="text-gray-700">{feedback.comentario || "Nenhum comentário"}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;