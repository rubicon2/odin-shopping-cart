import Button from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('Button', () => {
  it('Renders a button', () => {
    render(<Button />);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('Renders any children provided as a prop', () => {
    render(
      <Button>
        <h2>Press Me!</h2>
      </Button>,
    );

    expect(screen.getByText(/Press Me!/)).toBeInTheDocument();
  });

  it('Calls onClick prop function when button is clicked', async () => {
    const user = userEvent.setup();
    const onClickMock = vi.fn();
    render(<Button onClick={onClickMock} />);

    await user.click(screen.getByRole('button'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
