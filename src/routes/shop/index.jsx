import { getProducts } from '../../apis/products/products';
import Container from '../../components/container';
import PageHeading from '../../components/pageHeading';
import { useLoaderData } from 'react-router';

export async function loader() {
  const products = await getProducts();
  return products;
}

export default function Shop() {
  const products = useLoaderData();

  return (
    <Container as="main">
      <PageHeading>Shop</PageHeading>
      {products.map((product) => (
        <h3 key={product.id}>{product.title}</h3>
      ))}
    </Container>
  );
}
