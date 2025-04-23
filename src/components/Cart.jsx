import React from 'react';

function Cart({ cartItems, onRemoveFromCart }) {
  return (
    <div>
      <h2>Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - R$ {item.price.toFixed(2)}
              <button onClick={() => onRemoveFromCart(item.id)}>Remover</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;