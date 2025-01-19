import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors'; 

const app = express();
const PORT = 3000;

app.use(cors()); 

app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'src')));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.post('/registration', (req, res) => {
  const { email, name, cpf, birthdate, phone, password, companyName, cnpj, openingDate } = req.body;

  if (!name || !email || !password || !cpf || !birthdate || !phone ) {
    return res.status(400).json({
      message: 'Todos os campos são obrigatórios!',
    });
  }
  if(userType === 'pj') {
    if (!companyName || !cnpj || !openingDate || !email || !phone || !password)
      return res.status(400).json({
        message: 'Todos os campos são obrigatórios!',
      });
  }
  res.status(201).json({
    message: 'Cadastro realizado com sucesso!',
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
