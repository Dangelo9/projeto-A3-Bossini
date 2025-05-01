import React from 'react';

const products = [
  { id: 1, name: 'Hambúrguer Podrão', price: 35.00 },
  { id: 2, name: 'Hambúrguer Salad', price: 28.00 },
  { id: 3, name: 'Hambúrguer Salad com Bacon', price: 28.00 },
  { id: 4, name: 'Hambúrguer Maionese', price: 23.00 },
  { id: 5, name: 'Hambúrguer Queijo', price: 21.00 },
  { id: 6, name: 'Hambúrguer Egg', price: 25.00 },
  { id: 7, name: 'Porção de Batata Frita com cheddar e bacon', price: 20.00 },
  { id: 8, name: 'Coca-Cola Lata', price: 8.00 },
  { id: 9, name: 'Água sem Gás', price: 6.00 },
  { id: 10, name: 'Água com Gás', price: 7.00 },
  
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