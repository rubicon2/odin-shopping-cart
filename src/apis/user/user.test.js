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
  title: 0,
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
  title: 0,
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
      expect(Array.isArray(user.basket)).toBe(true);
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
        basket: [],
      },
    };

    const user = await getUser();
    expect(user).toEqual(data.user);
  });

  it('returns null if no user data already created', async () => {
    data = {};

    const user = await getUser();
    expect(user).toBe(null);
  });

  it('adds item to basket', async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: [],
      },
    };

    await addToBasket(product1);
    await addToBasket(product2);
    const basket = data.user.basket;
    expect(basket.length).toBe(2);
    expect(basket[0]).toBe(product1);
    expect(basket[1]).toBe(product2);
  });

  it('removes item from basket', async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: [product1, product2],
      },
    };

    await removeFromBasket(product1);
    const basket = data.user.basket;
    expect(basket.length).toBe(1);
    expect(basket[0]).toBe(product2);

    await removeFromBasket(product2);
    expect(data.user.basket.length).toBe(0);
  });

  it("clearBasket removes all items from user's basket", async () => {
    data = {
      user: {
        id: 0,
        createdAt: new Date(Date.now()),
        basket: [product1, product2],
      },
    };

    await clearBasket();
    expect(data.user.basket.length).toBe(0);
  });
});
