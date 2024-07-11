import { MemoryRouter } from 'react-router';
import MobileNavBar from '.';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const links = [
  {
    to: '/film',
    innerText: 'Film',
  },
  {
    to: '/digital',
    innerText: 'Digital',
  },
];

function createRenderItems(links) {
  return (
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <MobileNavBar links={links} />
    </MemoryRouter>
  );
}

function setup(links) {
  const user = userEvent.setup();
  const renderItems = (
    <MemoryRouter initialEntries={[{ pathname: '/' }]}>
      <MobileNavBar links={links} />
    </MemoryRouter>
  );
  return { user, renderItems };
}

// Utility method as having to open the menu on every test gets old fast.
async function setupRenderAndOpenMenu(links) {
  const { user, renderItems } = setup(links);
  render(renderItems);
  await user.click(screen.getByRole('button'));
  return { user, renderItems };
}

describe('Mobile nav bar', () => {
  describe('Renders a button that opens and closes the nav bar menu', () => {
    it('Toggles the button state when clicked', async () => {
      const { user, renderItems } = setup(links);
      render(renderItems);

      const button = screen.getByLabelText(/open/i);
      expect(button).toBeDefined();
      await user.click(button);
      expect(screen.queryByLabelText(/open/i)).toBe(null);
      expect(screen.getByLabelText(/close/i)).toBeDefined();
    });

    it('Toggles the list items', async () => {
      const { user, renderItems } = setup(links);
      render(renderItems);

      // Menu starts closed
      expect(screen.queryAllByRole('listitem').length).toBe(0);
      // Now user opens it
      await user.click(screen.getByLabelText(/open/i));
      expect(screen.queryAllByRole('listitem').length).toBe(2);
      // And closes it again
      await user.click(screen.getByLabelText(/close/i));
      expect(screen.queryAllByRole('listitem').length).toBe(0);
    });
  });

  describe('Renders the correct number of list items', () => {
    it('Renders two items when given an array of two items', async () => {
      await setupRenderAndOpenMenu(links);
      expect(screen.getAllByRole('listitem').length).toBe(2);
    });

    it('Renders six items when given an array of six items', async () => {
      const links = [
        {
          to: '/film',
          innerText: 'Film',
        },
        {
          to: '/digital',
          innerText: 'Digital',
        },
        {
          to: '/turnips',
          innerText: 'Turnips',
        },
        {
          to: '/swedes',
          innerText: 'Swedes',
        },
        {
          to: '/custardcreams',
          innerText: 'Custard Creams',
        },
        {
          to: '/tennis',
          innerText: 'Tennis',
        },
      ];

      await setupRenderAndOpenMenu(links);
      expect(screen.getAllByRole('listitem').length).toBe(6);
    });

    it('Renders a link for each list item provided in the links prop array', async () => {
      await setupRenderAndOpenMenu(links);
      expect(screen.getAllByTestId('generated-link').length).toBe(2);
    });

    it('Renders a link to the basket route', () => {
      render(createRenderItems(links));
      expect(screen.getByLabelText(/basket/i)).toBeDefined();
    });
  });
});
