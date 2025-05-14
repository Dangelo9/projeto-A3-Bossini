const express = require('express');
const app = express();
const port = 3000; // Você pode escolher outra porta

// Define a rota GET para /hello-world
app.get('/hello-world', (req, res) => {
  // Envia a resposta "Hello, World!" com um status HTTP 200 (OK)
  res.status(200).send('Hello, World!');
});

// Inicia o servidor e o faz escutar na porta especificada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});