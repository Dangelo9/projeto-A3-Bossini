import React from 'react';

function OrderSummary({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div>
      <h2>Resumo do Pedido</h2>
      {cartItems.length === 0 ? (
        <p>Nenhum item no carrinho.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - R$ {item.price.toFixed(2)}
            </li>
          ))}
          <p>Total: R$ {total.toFixed(2)}</p>
        </ul>
      )}
    </div>
  );
}

export default OrderSummary;