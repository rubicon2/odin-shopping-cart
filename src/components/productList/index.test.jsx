import ProductList from '.';
import ProductCard from '../productCard';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.mock('../productCard');

const products = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
];

describe('Product List', () => {
  it('Renders "No products found!" message if products prop array is empty', () => {
    render(<ProductList />);
    expect(ProductCard).toHaveBeenCalledTimes(0);
    expect(screen.getByText('No products found!')).toBeDefined();
  });

  it('Renders a product card for each element in the products prop array', () => {
    render(<ProductList products={products} />);
    expect(ProductCard).toHaveBeenCalledTimes(4);
  });
});
