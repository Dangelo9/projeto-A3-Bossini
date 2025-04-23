import React, { useState } from 'react';

function OrderForm({ onPlaceOrder }) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onPlaceOrder({ name, address });
    setName('');
    setAddress('');
  };

  return (
    <div>
      <h2>Informações de Entrega</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="address">Endereço:</label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit">Finalizar Pedido</button>
      </form>
    </div>
  );
}

export default OrderForm;