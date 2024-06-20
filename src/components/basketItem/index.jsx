export default function BasketItem(product) {
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>£{product.price.toFixed(2)}</div>
    </div>
  );
}
