const express = require('express');
const cors = require('cors');
const pedidosRouter = require('./routes/pedidos');

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

app.use('/api/pedidos', pedidosRouter);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});