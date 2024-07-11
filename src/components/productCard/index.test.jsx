import TestImg from '/jeans.jpg';

import ProductCard from '.';
import SelectRange from '../selectRange';
import ProductRating from '../productRating';

import { screen, render } from '@testing-library/react';
import { expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  // Was originally resetAllMocks, but that clears the mock implementation. With selectRange I just wanted to check whether it had been called but not replace
  // the implementation. clearAllMocks just clears all the info about the mock, i.e. how many times it has been called, with what arguments, etc.
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

// Want to spyOn default export function, but apparently there is no way to do that with vi.spyOn.
vi.mock('../selectRange', async (importOriginal) => {
  const original = await importOriginal();
  return {
    default: vi.fn(original.default),
  };
});

vi.mock('../productRating');

const product = {
  id: 0,
  image: TestImg,
  title: 'Test Product',
  description: "A product that doesn't really exist",
  price: 19.99,
  rating: {
    rate: 5,
    count: 2094,
  },
};

describe('Product Card', () => {
  it('Renders product image', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByAltText(product.title).src).toContain(TestImg);
  });

  it('Renders product title', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.title)).toBeDefined();
  });

  it('Renders product rating', () => {
    render(<ProductCard product={product} maxRating={5} />);
    expect(ProductRating).toHaveBeenCalledTimes(1);
    expect(ProductRating.mock.calls[0][0]).toEqual({
      userRating: product.rating.rate,
      maxRating: 5,
    });
  });

  it('Renders product price', () => {
    render(<ProductCard product={product} maxRating={5} />);
    expect(screen.getByLabelText(/price/i)).toBeDefined();
    expect(screen.getByLabelText(/price/i).textContent).toBe(
      `£${product.price}`,
    );
  });

  it('Renders quantity select input', () => {
    render(<ProductCard product={product} maxRating={5} />);
    expect(SelectRange).toHaveBeenCalledTimes(1);
  });

  it('Changes selected qty in response to select input change', async () => {
    const user = userEvent.setup();
    render(<ProductCard product={product} maxRating={5} />);

    await user.selectOptions(screen.getByLabelText(/qty/i), '3');
    expect(screen.getByLabelText(/qty/i).value).toBe('3');
  });

  it('Renders buy button', () => {
    render(<ProductCard product={product} maxRating={5} />);
    expect(screen.getByTestId('buy-button')).toBeDefined();
  });
});
