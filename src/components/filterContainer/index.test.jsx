import FilterContainer from '.';
import { render, screen } from '@testing-library/react';

describe('Filter container', () => {
  it('Renders any children passed in as a prop', () => {
    render(
      <FilterContainer>
        <h1>I&apos;m a heading!</h1>
        <p>I&apos;m a paragraph!</p>
      </FilterContainer>,
    );
    expect(screen.getByRole('heading').textContent).toBe("I'm a heading!");
    expect(screen.getByRole('paragraph').textContent).toBe("I'm a paragraph!");
  });

  it('Applies the className prop correctly', () => {
    render(<FilterContainer className="someClass" />);
    expect(screen.getByTestId('filter-container').classList).toContain(
      'someClass',
    );
  });
});
