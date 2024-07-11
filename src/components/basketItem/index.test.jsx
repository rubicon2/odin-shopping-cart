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

  describe('Renders qty input', () => {
    it('Renders correctly', () => {
      render(<BasketItem product={product} />);
      expect(screen.getByLabelText(/qty/i)).toBeDefined();
    });

    it('Has a type of select', () => {
      render(<BasketItem product={product} />);
      expect(screen.getByLabelText(/qty/i).nodeName).toBe('SELECT');
    });

    it('Has a minimum option of 1 and a maximum of 9', () => {
      render(<BasketItem product={product} />);
      const options = screen
        .getAllByRole('option')
        .map((option) => parseInt(option.value))
        .sort((a, b) => a - b);
      expect(options[0]).toBe(1);
      expect(options[options.length - 1]).toBe(9);
    });
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
