import FilterTitle from '.';
import { render, screen } from '@testing-library/react';

describe('Filter title', () => {
  it('Renders a heading', () => {
    render(<FilterTitle />);
    expect(screen.getByRole('heading')).toBeDefined();
  });

  it('Renders any children provided as a prop', () => {
    render(<FilterTitle>Test Heading</FilterTitle>);
    expect(screen.getByRole('heading').textContent).toBe('Test Heading');
  });
});
