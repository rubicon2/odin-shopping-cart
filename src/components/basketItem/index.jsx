export default function BasketItem(item) {
  const { product, quantity } = item;
  return (
    <div>
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <div>£{product.price.toFixed(2)}</div>
      <div>Quantity: {quantity}</div>
      <div>Total: £{(product.price * quantity).toFixed(2)}</div>
    </div>
  );
}
