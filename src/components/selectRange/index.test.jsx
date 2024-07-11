import SelectRange from './index';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

describe('SelectRange component', () => {
  it('Renders a select input', () => {
    render(<SelectRange />);

    expect(screen.getByRole('combobox')).toBeDefined();
  });

  it('Renders options within the min and max prop values', () => {
    render(<SelectRange min={-2} max={2} />);
    const options = screen.getAllByRole('option');

    expect(options.length).toBe(5);
    for (let i = 0; i < 5; i++)
      expect(options[i].value).toBe((i - 2).toString());
  });

  it('Updates value when user selects an option', async () => {
    const user = userEvent.setup();
    render(<SelectRange min={0} max={5} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '5');
    expect(select.value).toBe('5');
  });

  it('Calls onChange prop function when selection is changed', async () => {
    const user = userEvent.setup();
    const changeHandlerMock = vi.fn();
    render(<SelectRange min={0} max={5} onChange={changeHandlerMock} />);

    const select = screen.getByRole('combobox');
    await user.selectOptions(select, '5');
    expect(changeHandlerMock).toHaveBeenCalledTimes(1);
    expect(select.value).toBe('5');
  });

  it('Calls onBlur prop function when select element loses focus', async () => {
    const user = userEvent.setup();
    const blurHandlerMock = vi.fn();
    render(
      <>
        <input type="text" />
        <SelectRange min={0} max={5} onBlur={blurHandlerMock} />
      </>,
    );

    const input = screen.getByRole('textbox');
    const select = screen.getByRole('combobox');
    // Lose focus once
    await user.click(select);
    await user.click(input);
    // Lose focus twice
    await user.click(select);
    await user.click(input);
    expect(blurHandlerMock).toHaveBeenCalledTimes(2);
  });
});
