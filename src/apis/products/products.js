const url = 'https://fakestoreapi.com/products';

export async function getProducts() {
  const response = await fetch(url, { mode: 'cors' });
  const products = await response.json();
  return products;
}
