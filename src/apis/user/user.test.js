import {
  createUser,
  getUser,
  addToBasket,
  removeFromBasket,
  clearBasket,
} from './user';
import { afterEach, beforeEach, expect, vi } from 'vitest';

import localforage from 'localforage';
vi.mock('localforage');

let data;
beforeEach(() => {
  data = {};

  localforage.setItem.mockImplementation(async (key, item) => {
    data[key] = item;
  });

  localforage.getItem.mockImplementation(async (key) => {
    return data[key];
  });
});

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  vi.restoreAllMocks();
});

const product1 = {
  id: 0,
  title: 'Product 1',
  price: 0,
  description: 0,
  category: 0,
  image: 0,
  rating: {
    rate: 0,
    count: 0,
  },
};

const product2 = {
  id: 1,
  title: 'Product 2',
  price: 0,
  description: 0,
  category: 0,
  image: 0,
  rating: {
    rate: 0,
    count: 0,
  },
};

describe('User API', () => {
  describe('User object', () => {
    it('is created with the correct properties', async () => {
      const user = await createUser();
      expect(user.id).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.basket).toBeDefined();
    });

    it('id property is of type number', async () => {
      const user = await createUser();
      expect(typeof user.id).toBe('string');
    });

    it('createdAt property is an instance of Date', async () => {
      const user = await createUser();
      expect(user.createdAt instanceof Date).toBe(true);
    });

    it('basket is an array', async () => {
      const user = await createUser();
      expect(typeof user.basket).toBe('object');
    });
  });

  it('saves user data', async () => {
    const createdUser = await createUser();
    expect(data).toEqual({ user: createdUser });
  });

  it('loads user data', async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: {},
      },
    };

    const user = await getUser();
    expect(user).toEqual(data.user);
  });

  it('creates a new user if getUser called and there is no existing user data', async () => {
    data = {};

    const user = await getUser();
    expect(user).not.toBe(null);
  });

  it('adds item to basket', async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: {},
      },
    };

    await addToBasket(product1);
    await addToBasket(product2, 4);
    const basket = data.user.basket;
    expect(Object.keys(basket).length).toBe(2);
    expect(basket[product1.id]).toBe(1);
    expect(basket[product2.id]).toBe(4);
  });

  it('removes item from basket', async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: { [product1.id]: 1, [product2.id]: 4 },
      },
    };

    await removeFromBasket(product1);
    const basket = data.user.basket;
    expect(Object.keys(basket).length).toBe(1);
    expect(basket[product2.id]).toBe(4);

    await removeFromBasket(product2);
    expect(Object.keys(data.user.basket).length).toBe(0);
  });

  it("clearBasket removes all items from user's basket", async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: { [product1.id]: 1, [product2.id]: 4 },
      },
    };

    await clearBasket();
    expect(Object.keys(data.user.basket).length).toBe(0);
  });
});
