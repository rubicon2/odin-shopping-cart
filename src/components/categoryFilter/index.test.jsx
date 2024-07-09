import userEvent from '@testing-library/user-event';
import CategoryFilter from '.';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

const categories = {
  guitars: true,
  bass: true,
  drums: false,
};

describe('Category filter', () => {
  it('Renders a heading', () => {
    render(<CategoryFilter categories={{}} />);
    expect(screen.getByRole('heading').textContent).toBe('Category');
  });

  it('Renders a label and checkbox for each category', () => {
    render(<CategoryFilter categories={categories} />);
    for (const key of Object.keys(categories)) {
      expect(screen.getByLabelText(key)).toBeDefined();
      expect(screen.getByRole('checkbox', { name: key })).toBeDefined();
    }
  });

  it('Checkboxes match the values in the categories prop object', () => {
    render(<CategoryFilter categories={categories} />);
    for (const key of Object.keys(categories)) {
      expect(screen.getByRole('checkbox', { name: key }).checked).toBe(
        categories[key],
      );
    }
  });

  it('Calls onChange prop function when a checkbox value is changed', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<CategoryFilter categories={categories} onChange={onChangeMock} />);

    await user.click(screen.getByRole('checkbox', { name: 'bass' }));
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });
});
