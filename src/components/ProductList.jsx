import React from 'react';

const products = [
  { id: 1, name: 'Hambúrguer Podrão', price: 35.00 },
  
];

function ProductList({ onAddToCart }) {
  return (
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - R$ {product.price.toFixed(2)}
            <button onClick={() => onAddToCart(product)}>Adicionar ao Carrinho</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;