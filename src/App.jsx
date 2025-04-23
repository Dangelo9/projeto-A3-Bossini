import React, { useState } from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handlePlaceOrder = (orderData) => {
    alert(`Pedido realizado por ${orderData.name} para o endereço: ${orderData.address}. Itens: ${cart.map(item => item.name).join(', ')}`);
    setCart([]); // Limpar o carrinho após o pedido
  };

  return (
    <div>
      <h1>Sistema de Pedidos</h1>
      <ProductList onAddToCart={handleAddToCart} />
      <Cart cartItems={cart} onRemoveFromCart={handleRemoveFromCart} />
      <OrderSummary cartItems={cart} />
      <OrderForm onPlaceOrder={handlePlaceOrder} />
    </div>
  );
}

export default App;