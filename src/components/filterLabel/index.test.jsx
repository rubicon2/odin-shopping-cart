import FilterLabel from '.';
import { render, screen } from '@testing-library/react';

describe('Filter label', () => {
  it('Renders a label', () => {
    render(<FilterLabel />);
    expect(screen.getByTestId('filter-label').nodeName).toBe('LABEL');
  });

  it('Renders any children provided as a prop', () => {
    render(
      <FilterLabel>
        <h1>It&apos;s a heading within a label!</h1>
      </FilterLabel>,
    );
    expect(screen.getByText(/It's a heading within a label!/)).toBeDefined();
  });
});
