import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const FeedbackPage = () => {
  const { tokenFeedback } = useParams();
  const navigate = useNavigate();
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState('');
  const [hasVoted, setHasVoted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const votedKey = `voted_${tokenFeedback}`;
    if (localStorage.getItem(votedKey)) {
      setHasVoted(true);
    }
  }, [tokenFeedback]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nota) {
      setError('Por favor, selecione uma nota.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenFeedback, nota, comentario }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar feedback.');
      }

      localStorage.setItem(`voted_${tokenFeedback}`, 'true');
      setHasVoted(true);
      setError(null);
      alert('Obrigado! Seu feedback foi enviado com sucesso.');

    } catch (err) {
      setError(err.message);
    }
  };

  if (hasVoted) {
    return (
      <div className="flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-elosaude-green">Obrigado!</h1>
          <p className="mt-4 text-lg text-gray-700">Você já enviou seu feedback para esta entrega.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 className="text-2xl font-bold text-center text-elosaude-dark">Avalie esta entrega</h1>
        {error && <div className="p-2 bg-red-100 text-red-700 rounded text-sm text-center">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center">
            <label className="block text-gray-700 text-lg mb-2">Sua nota de satisfação:</label>
            <div className="flex justify-center space-x-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setNota(value)}
                  className={`
                    w-12 h-12 rounded-full font-bold text-2xl transition-colors
                    ${value <= nota ? 'text-elosaude-green' : 'text-gray-400'}
                    hover:text-elosaude-green
                  `}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label htmlFor="comentario" className="block text-gray-700 text-lg mb-2">Comentário (opcional):</label>
            <textarea
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-elosaude-green"
              rows="4"
            ></textarea>
          </div>
          
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-elosaude-green hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-colors duration-300"
            >
              Enviar Feedback
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackPage;