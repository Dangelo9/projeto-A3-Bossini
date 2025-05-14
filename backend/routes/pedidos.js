const express = require('express');
const router = express.Router();
const pool = require('../db/database');


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pedidos'); 
    res.json(result.rows);
  } catch (err) {
    console.error('Erro ao buscar pedidos:', err);
    res.status(500).json({ message: 'Erro ao buscar o histórico de pedidos.' });
  }
});


router.post('/', async (req, res) => {
  const { itens, valorTotal, cliente, endereco } = req.body; 
  const dataPedido = new Date();

  try {
    const result = await pool.query(
      'INSERT INTO pedidos (data_pedido, itens, valor_total, cliente, endereco) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [dataPedido, JSON.stringify(itens), valorTotal, cliente, endereco] 
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao criar pedido:', err);
    res.status(400).json({ message: 'Erro ao criar o pedido.' });
  }
});


router.delete('/:id', async (req, res) => {
  const pedidoId = parseInt(req.params.id); 

  if (isNaN(pedidoId)) {
    return res.status(400).json({ message: 'ID do pedido inválido.' });
  }

  try {
    const result = await pool.query('DELETE FROM pedidos WHERE id = $1', [pedidoId]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: `Pedido com ID ${pedidoId} excluído com sucesso.` });
    } else {
      res.status(404).json({ message: `Pedido com ID ${pedidoId} não encontrado.` });
    }
  } catch (err) {
    console.error('Erro ao excluir pedido:', err);
    res.status(500).json({ message: 'Erro ao excluir o pedido.' });
  }
});

module.exports = router;