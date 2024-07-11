import MobileProductFilter from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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

async function renderAndOpen() {
  const user = userEvent.setup();
  render(<MobileProductFilter query={query} />);
  await user.click(screen.getByRole('button'));
}

describe('Mobile product filter', () => {
  it('Applies any provided className prop', () => {
    render(<MobileProductFilter query={query} className={'someClass'} />);
    expect(screen.getByTestId('mobile-product-filter').classList).toContain(
      'someClass',
    );
  });

  it('Renders a button that toggles filter visibility', async () => {
    const user = userEvent.setup();
    render(<MobileProductFilter query={query} />);

    // Filters start hidden.
    expect(screen.queryAllByRole('heading').length).toBe(0);

    // Filters become visible once the button is clicked.
    const button = screen.getByRole('button');
    await user.click(button);
    expect(screen.queryAllByRole('heading').length).toBe(3);

    // Filters become invisible when the button is clicked once more.
    await user.click(button);
    expect(screen.queryAllByRole('heading').length).toBe(0);
  });

  // The following components have already been tested, so not really sure how to test without
  // just testing implementation (e.g. checking each component was instantiated) or repeating those tests.
  it('Renders a price filter section', async () => {
    await renderAndOpen();
    expect(screen.getByRole('heading', { name: /price/i })).toBeInTheDocument();
  });

  it('Renders a category filter section', async () => {
    await renderAndOpen();
    expect(
      screen.getByRole('heading', { name: /category/i }),
    ).toBeInTheDocument();
  });

  it('Renders a rating filter section', async () => {
    await renderAndOpen();
    expect(
      screen.getByRole('heading', { name: /rating/i }),
    ).toBeInTheDocument();
  });
});
