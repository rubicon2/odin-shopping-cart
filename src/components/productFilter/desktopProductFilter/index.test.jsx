import DesktopProductFilter from '.';
import { render, screen } from '@testing-library/react';

const query = {
  selectedMin: 0,
  selectedMax: 999,
  selectedRating: 4,
  categoryStatus: {
    'Some category': true,
    'Another category': true,
    'A boring category': false,
  },
};

describe('Desktop product filter', () => {
  it('Applies any provided className prop', () => {
    render(<DesktopProductFilter query={query} className={'someClass'} />);
    expect(screen.getByTestId('desktop-product-filter').classList).toContain(
      'someClass',
    );
  });

  // The following components have already been tested, so not really sure how to test without
  // just testing implementation (e.g. checking each component was instantiated) or repeating those tests.
  it('Renders a price filter', () => {
    render(<DesktopProductFilter query={query} />);
    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
  });

  it('Renders a category filter', () => {
    render(<DesktopProductFilter query={query} />);
    expect(
      screen.getByRole('heading', { name: /category/i }),
    ).toBeInTheDocument();
  });

  it('Renders a rating filter', () => {
    render(<DesktopProductFilter query={query} />);
    expect(
      screen.getByRole('heading', { name: /rating/i }),
    ).toBeInTheDocument();
  });
});
