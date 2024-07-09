import BasketItem from '.';
import { render, screen } from '@testing-library/react';

const product = {
  id: 0,
  image: '/testImg',
  title: 'Test Product',
  description: "A product that doesn't really exist",
  price: 19.99,
  rating: {
    rate: 5,
    count: 2094,
  },
};

describe('Basket item', () => {
  it('Renders product image', () => {
    render(<BasketItem product={product} />);
    expect(screen.getByRole('img', { alt: product.title }).src).toContain(
      product.image,
    );
  });

  it('Renders product heading', () => {
    render(<BasketItem product={product} />);
    expect(screen.getByRole('heading').textContent).toBe(product.title);
  });

  it('Renders price per unit', () => {
    render(<BasketItem product={product} />);
    expect(screen.getByText(/price/i).textContent).toContain(product.price);
  });

  it('Renders qty select input', () => {
    render(<BasketItem product={product} />);
    expect(screen.getByLabelText(/qty/i)).toBeDefined();
  });

  it('Renders total cost', () => {
    render(<BasketItem product={product} />);
    expect(screen.getByLabelText(/total/i)).toBeDefined();
  });

  it('Calculates total cost correctly as per product and qty props', () => {
    render(<BasketItem product={product} qty={3} />);
    expect(screen.getByLabelText(/total/i).textContent).toBe(
      `£${product.price * 3}`,
    );
  });
});
