import Container from '.';
import { render, screen } from '@testing-library/react';

describe('Container', () => {
  it('Renders a div by default', () => {
    render(<Container />);
    expect(screen.getByTestId('container').nodeName).toBe('DIV');
  });

  describe('Renders the correct element when passed a type in the as prop', () => {
    it('Renders as main', () => {
      render(<Container as="main" />);
      expect(screen.getByTestId('container').nodeName).toBe('MAIN');
    });

    it('Renders as aside', () => {
      render(<Container as="aside" />);
      expect(screen.getByTestId('container').nodeName).toBe('ASIDE');
    });
  });

  it('Renders any children provided as a prop', () => {
    render(
      <Container>
        <h1>Some Title</h1>
        <p>Some paragraph</p>
      </Container>,
    );
    expect(screen.getByText(/Some Title/)).toBeDefined();
    expect(screen.getByText(/Some paragraph/)).toBeDefined();
  });
});
