import PageHeading from '.';
import { render, screen } from '@testing-library/react';

describe('Page heading', () => {
  it('Renders a heading', () => {
    render(<PageHeading />);
    expect(screen.getByRole('heading')).toBeDefined();
  });

  it('Passes on the className prop to the top level element', () => {
    render(<PageHeading className="someClass" />);
    expect(screen.getByRole('heading').classList).toContain('someClass');
  });

  it('Renders any children provided as a prop', () => {
    render(<PageHeading>My Heading</PageHeading>);
    expect(screen.getByRole('heading').textContent).toBe('My Heading');
  });
});
