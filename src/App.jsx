import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderSummary from './components/OrderSummary';
import OrderForm from './components/OrderForm';
import HistoricoPedidos from './components/HistoricoPedidos'; 

function App() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate(); 

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handlePlaceOrder = async (orderData) => {
    try {
      const response = await fetch('http://localhost:5000/api/pedidos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cliente: orderData.name,
          endereco: orderData.address, 
          itens: cart.map(item => ({
            nome: item.name,
            quantidade: 1, 
            preco: item.price,
          })),
          valorTotal: cart.reduce((total, item) => total + item.price, 0),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao finalizar pedido: ${response.status} - ${errorData?.message || 'Erro desconhecido'}`);
      }

      alert('Pedido realizado com sucesso!');
      setCart([]);
      navigate('/pedidos'); 
    } catch (error) {
      console.error('Erro ao finalizar pedido:', error);
      alert('Erro ao finalizar o pedido. Tente novamente.');
    }
  };

  return (
    <div>
      <h1>Sistema de Pedidos</h1>

      <nav>
        <Link to="/">Produtos</Link> |{" "}
        <Link to="/carrinho">Carrinho</Link> |{" "}
        <Link to="/resumo">Resumo</Link> |{" "}
        <Link to="/entrega">Entrega</Link> |{" "}
        <Link to="/pedidos">Pedidos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
        <Route path="/carrinho" element={<Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/resumo" element={<OrderSummary cartItems={cart} />} />
        <Route path="/entrega" element={<OrderForm onPlaceOrder={handlePlaceOrder} />} />
        {}
        <Route path="/pedidos" element={<HistoricoPedidos />} />
      </Routes>
    </div>
  );
}

export default App;