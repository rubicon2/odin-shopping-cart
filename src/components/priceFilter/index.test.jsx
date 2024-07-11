import PriceFilter from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

function setupExtendedUser() {
  const user = userEvent.setup();
  const extensions = {
    typeStringIntoControlledComponent: async (
      inputElement,
      string,
      rerender,
      Component,
      props,
    ) => {
      for (const char of string.split('')) {
        await user.type(inputElement, char);
        rerender(<Component {...props} />);
      }
    },
  };
  return { ...user, ...extensions };
}

describe('Price filter', () => {
  it('Renders a heading', () => {
    render(<PriceFilter />);
    expect(screen.getByRole('heading').textContent).toMatch(/price/i);
  });

  it('Renders the min price input', () => {
    render(<PriceFilter minPrice={5.79} />);
    expect(screen.getByLabelText(/min/i)).toBeDefined();
  });

  it('Renders the max price input', () => {
    render(<PriceFilter maxPrice={15.79} />);
    expect(screen.getByLabelText(/max/i)).toBeDefined();
  });

  it('Renders the inputs with type number', () => {
    render(<PriceFilter minPrice={5.79} maxPrice={15.79} />);
    expect(screen.getByLabelText(/min/i).getAttribute('type')).toBe('number');
    expect(screen.getByLabelText(/max/i).getAttribute('type')).toBe('number');
  });

  it('Presents mobile users with a decimal numeric keypad', async () => {
    render(<PriceFilter />);
    expect(screen.getByLabelText(/min/i).getAttribute('inputMode')).toBe(
      'decimal',
    );
    expect(screen.getByLabelText(/max/i).getAttribute('inputMode')).toBe(
      'decimal',
    );
  });

  it('Calls onChange prop function when min input is changed', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<PriceFilter onChange={onChangeMock} />);

    const minInput = screen.getByLabelText(/min/i);
    await user.clear(minInput);
    await user.type(minInput, '19.99');
    // Interestingly, the numeric input does not trigger onChange when a decimal point is entered.
    // I guess this is because the text is different but the numeric value is the same, so it doesn't trigger it.
    // So this is why we expect the change to have been called 4 times instead of 5.
    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });

  it('Calls onChange prop function when max input is changed', async () => {
    const user = userEvent.setup();
    const onChangeMock = vi.fn();
    render(<PriceFilter onChange={onChangeMock} />);

    const maxInput = screen.getByLabelText(/max/i);
    await user.clear(maxInput);
    await user.type(maxInput, '270.99');
    expect(onChangeMock).toHaveBeenCalledTimes(5);
  });

  it('On blur event, stops min input value from being more than max input value', async () => {
    const user = setupExtendedUser();
    let props = {
      minPrice: 9.99,
      maxPrice: 20.99,
      selectedMin: 9.99,
      selectedMax: 20.99,
      onChange: vi.fn((updates) => {
        // Have to do it like this. typeStringIntoControlledComponent needs constant reference to props so
        // cannot assign object like this: props = { ...props, ...updates }, otherwise the reference will be lost.
        for (const key in updates) {
          props[key] = updates[key];
        }
      }),
    };
    const { rerender } = render(<PriceFilter {...props} />);

    const minInput = screen.getByLabelText(/min/i);

    await user.clear(minInput);
    rerender(<PriceFilter {...props} />);

    // Well, this is horrible but have to rerender on every keystroke since this is a controlled input.
    // Is there a way to make this more streamlined?
    await user.typeStringIntoControlledComponent(
      minInput,
      '22.99',
      rerender,
      PriceFilter,
      props,
    );

    // Tab out and trigger onBlur event
    await user.tab();
    rerender(<PriceFilter {...props} />);

    expect(screen.getByLabelText(/min/i).value).toBe('20.99');
  });

  it('On blur event, stops max input value from being less than min input value', async () => {
    const user = setupExtendedUser();
    let props = {
      minPrice: 9.99,
      maxPrice: 20.99,
      selectedMin: 9.99,
      selectedMax: 20.99,
      onChange: vi.fn((updates) => {
        // Have to do it like this. typeStringIntoControlledComponent needs constant reference to props so
        // cannot assign object like this: props = { ...props, ...updates }, otherwise the reference will be lost.
        for (const key in updates) {
          props[key] = updates[key];
        }
      }),
    };
    const { rerender } = render(<PriceFilter {...props} />);

    const maxInput = screen.getByLabelText(/max/i);

    await user.clear(maxInput);
    rerender(<PriceFilter {...props} />);

    // Well, this is horrible but have to rerender on every keystroke since this is a controlled input.
    // Is there a way to make this more streamlined?
    await user.typeStringIntoControlledComponent(
      maxInput,
      '2.99',
      rerender,
      PriceFilter,
      props,
    );

    // Tab out and trigger onBlur event
    await user.tab();
    rerender(<PriceFilter {...props} />);

    expect(screen.getByLabelText(/min/i).value).toBe('9.99');
  });
});
