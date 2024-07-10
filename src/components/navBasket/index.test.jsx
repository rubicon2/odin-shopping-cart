import NavBasket from '.';
import useUser from '../../hooks/useUser';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

vi.mock('../../hooks/useUser', async (importOriginal) => {
  const original = await importOriginal();
  return {
    ...original,
    default: vi.fn(() => {
      return {
        id: 0,
        createdAt: new Date('01/01/1970'),
        basket: {},
      };
    }),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

function setup() {
  render(
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <NavBasket />
    </MemoryRouter>,
  );
}

describe('Nav basket', () => {
  it('Renders a link', () => {
    setup();
    expect(screen.getByRole('link')).toBeDefined();
  });

  describe("Renders a counter for the number of items in the user's basket", () => {
    it('Correctly calculates a total of six, with multiple objects and different quantities', () => {
      useUser.mockImplementationOnce(() => ({
        id: 'fishy',
        createdAt: new Date('03/12/1992'),
        basket: {
          0: 1,
          3: 5,
        },
      }));
      setup();
      expect(screen.getByTestId('basket-item-count').textContent).toBe('6');
    });

    it('Correctly calculates a total of 13, with mutliple objects and different quantities', () => {
      useUser.mockReturnValueOnce({
        id: 'lucky',
        createdAt: new Date('12/25/1992'),
        basket: {
          0: 1,
          2: 2,
          3: 5,
          7: 2,
          12: 3,
          27: 0,
        },
      });
      setup();
      expect(screen.getByTestId('basket-item-count').textContent).toBe('13');
    });
  });
});
