import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderSummary from './components/OrderSummary';
import OrderForm from './components/OrderForm';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const handlePlaceOrder = (orderData) => {
    alert(`Pedido realizado por ${orderData.name} para o endereço: ${orderData.address}. Itens: ${cart.map(item => item.name).join(', ')}`);
    setCart([]);
  };

  return (
    <div>
      <h1>Sistema de Pedidos</h1>

      <nav>
        <Link to="/">Produtos</Link> |{" "}
        <Link to="/carrinho">Carrinho</Link> |{" "}
        <Link to="/resumo">Resumo</Link> |{" "}
        <Link to="/entrega">Entrega</Link>
      </nav>

      <Routes>
        <Route path="/" element={<ProductList onAddToCart={handleAddToCart} />} />
        <Route path="/carrinho" element={<Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />} />
        <Route path="/resumo" element={<OrderSummary cartItems={cart} />} />
        <Route path="/entrega" element={<OrderForm onPlaceOrder={handlePlaceOrder} />} />
      </Routes>
    </div>
  );
}

export default App;
