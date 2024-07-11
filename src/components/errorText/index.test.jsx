import ErrorText from '.';
import { render, screen } from '@testing-library/react';

describe('Error text', () => {
  it('Renders any children provided as a prop', () => {
    render(
      <ErrorText>
        <h2>Some Error</h2>
        <p>Some more error info</p>
      </ErrorText>,
    );
    expect(screen.getByText(/Some Error/)).toBeDefined();
    expect(screen.getByText(/Some more error info/)).toBeDefined();
  });
});
