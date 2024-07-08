import ProductRating from '.';
import RatingStar from '../ratingStar';
import { render } from '@testing-library/react';
import { afterEach, afterAll, vi } from 'vitest';

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

vi.mock('../ratingStar');

describe('Product Rating', () => {
  it('Renders the correct amount of rating stars as per maxRating prop', () => {
    render(<ProductRating maxRating={5} />);
    expect(RatingStar).toHaveBeenCalledTimes(5);
  });

  it('Renders the correct amount of checked stars as per userRating prop', () => {
    render(<ProductRating userRating={3} maxRating={6} />);
    expect(RatingStar).toHaveBeenCalledTimes(6);
    expect(
      RatingStar.mock.calls.filter((call) => call[0].isChecked).length,
    ).toBe(3);
  });
});
