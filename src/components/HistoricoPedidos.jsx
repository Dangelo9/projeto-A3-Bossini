import React, { useState, useEffect } from 'react';

function HistoricoPedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const buscarPedidos = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/pedidos'); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setPedidos(data);
        setLoading(false);
      } catch (e) {
        setError(e);
        setLoading(false);
      }
    };

    buscarPedidos();
  }, []);

  const handleDeletePedido = async (pedidoId) => {
    if (window.confirm(`Tem certeza que deseja excluir o pedido com ID ${pedidoId}?`)) {
      try {
        const response = await fetch(`http://localhost:5000/api/pedidos/${pedidoId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ao excluir pedido: ${response.status} - ${errorData?.message || 'Erro desconhecido'}`);
        }

        setPedidos(pedidos.filter(pedido => pedido.id !== pedidoId));
        alert(`Pedido com ID ${pedidoId} excluído com sucesso!`);
      } catch (error) {
        console.error('Erro ao excluir pedido:', error);
        alert('Erro ao excluir o pedido. Tente novamente.');
      }
    }
  };

  if (loading) {
    return <p>Carregando histórico de pedidos...</p>;
  }

  if (error) {
    return <p>Erro ao carregar o histórico de pedidos: {error.message}</p>;
  }

  return (
    <div>
      <h1>Histórico de Pedidos</h1>
      {pedidos.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID do Pedido</th>
              <th>Data do Pedido</th>
              <th>Cliente</th>
              <th>Endereço</th> {}
              <th>Valor Total</th>
              <th>Itens</th>
              <th>Ações</th>
              {}
            </tr>
          </thead>
          <tbody>
            {pedidos.map(pedido => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{new Date(pedido.data_pedido).toLocaleDateString()}</td>
                <td>{pedido.cliente}</td>
                <td>{pedido.endereco}</td> {}
                <td>R$ {parseFloat(pedido.valor_total).toFixed(2)}</td>
                <td>
                  <ul>
                    {pedido.itens && pedido.itens.map((item, index) => (
                      <li key={index}>
                        {item.nome} (x{item.quantidade}) - R$ {parseFloat(item.preco).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <button onClick={() => handleDeletePedido(pedido.id)}>Cancelar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HistoricoPedidos;