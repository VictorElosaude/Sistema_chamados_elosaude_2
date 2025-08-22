const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
const PORT = 3000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Função para ler o arquivo JSON
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Erro ao ler o arquivo de dados:', err);
    return { comunicados: [] };
  }
};

// Função para escrever no arquivo JSON
const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// Rota para buscar todos os comunicados com métricas
app.get('/api/comunicados', (req, res) => {
  const { from_date, to_date } = req.query; // Pega os parâmetros de data da URL
  let dataFile = readData();

  // Filtra os comunicados se os parâmetros de data existirem
  if (from_date && to_date) {
    const startDate = new Date(from_date);
    const endDate = new Date(to_date);
    
    dataFile.comunicados = dataFile.comunicados.filter(comunicado => {
      // Ajusta o fuso horário para que a comparação seja correta
      const comunicadoDate = new Date(comunicado.data + 'T00:00:00'); 
      return comunicadoDate >= startDate && comunicadoDate <= endDate;
    });
  }

  const comunicadosComMetricas = dataFile.comunicados.map(comunicado => {
    const totalNotas = comunicado.feedbacks.reduce((sum, f) => sum + f.nota, 0);
    const mediaSatisfacao = comunicado.feedbacks.length > 0 ? (totalNotas / comunicado.feedbacks.length).toFixed(1) : 0;

    // Distribuição de notas
    const distribuicao = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    comunicado.feedbacks.forEach(f => {
      distribuicao[f.nota]++;
    });

    return {
      ...comunicado,
      mediaSatisfacao,
      numFeedbacks: comunicado.feedbacks.length,
      distribuicao,
    };
  });

  res.status(200).json(comunicadosComMetricas);
});

// Rota para salvar um novo comunicado
app.post('/api/comunicado', (req, res) => {
  const { titulo, descricao, data, beneficioPrincipal, impacto, inovacaoEmMovimento } = req.body;

  if (!titulo || !descricao) {
    return res.status(400).json({ message: 'Campos obrigatórios faltando.' });
  }

  const dataFile = readData();
  const newId = uuidv4().slice(0, 8);
  const newToken = uuidv4().slice(0, 8);

  const novoComunicado = {
    id: newId,
    titulo,
    descricao,
    data,
    beneficioPrincipal,
    impacto,
    inovacaoEmMovimento,
    tokenFeedback: newToken,
    feedbacks: [],
  };

  dataFile.comunicados.push(novoComunicado);
  writeData(dataFile);

  res.status(201).json({
    message: 'Comunicado salvo com sucesso!',
    comunicadoId: newId,
    feedbackToken: newToken
  });
});


// Rota para salvar um novo feedback
app.post('/api/feedback', (req, res) => {
  const { tokenFeedback, nota, comentario } = req.body;

  if (!tokenFeedback || !nota) {
    return res.status(400).json({ message: 'Token e nota são obrigatórios.' });
  }

  const dataFile = readData();
  const comunicado = dataFile.comunicados.find(c => c.tokenFeedback === tokenFeedback);

  if (!comunicado) {
    return res.status(404).json({ message: 'Comunicado não encontrado para este token.' });
  }

  const novoFeedback = {
    nota: parseInt(nota, 10),
    comentario,
    timestamp: new Date().toISOString(),
  };

  comunicado.feedbacks.push(novoFeedback);
  writeData(dataFile);

  res.status(200).json({ message: 'Feedback salvo com sucesso!' });
});

// Rota para buscar um comunicado específico por ID
app.get('/api/comunicado/:id', (req, res) => {
  const { id } = req.params;
  const dataFile = readData();

  const comunicado = dataFile.comunicados.find(c => c.id === id);

  if (!comunicado) {
    return res.status(404).json({ message: 'Comunicado não encontrado.' });
  }

  res.status(200).json(comunicado);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});