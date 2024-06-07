import { getProducts } from './products';

describe('getProducts API', () => {
  it('Returns data', async () => {
    const products = await getProducts();
    expect(products).not.toBeUndefined();
    expect(products).not.toBeNull();
  });

  it('Returns an array', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });

  describe('Returns an array of objects that contain the following fields', async () => {
    const allProducts = await getProducts();
    const product = allProducts[0];

    it('Has an id field', () => {
      expect(product.id).toBeDefined();
    });

    it('Has a title field', () => {
      expect(product.title).toBeDefined();
    });

    it('Has a price field', () => {
      expect(product.price).toBeDefined();
    });

    it('Has a price field of type number', () => {
      expect(typeof product.price).toBe('number');
    });

    it('Has a description field', () => {
      expect(product.description).toBeDefined();
    });

    it('Has a category field', () => {
      expect(product.category).toBeDefined();
    });

    it('Has an image field', () => {
      expect(product.image).toBeDefined();
    });

    describe('The rating field', () => {
      it('Has a rating field', () => {
        expect(product.rating).toBeDefined();
      });

      it('Has a rate field', () => {
        expect(product.rating.rate).toBeDefined();
      });

      it('Has a rate field of type number', () => {
        expect(typeof product.rating.rate).toBe('number');
      });

      it('Has a count field', () => {
        expect(product.rating.count).toBeDefined();
      });

      it('Has a count field of type number', () => {
        expect(typeof product.rating.count).toBe('number');
      });
    });
  });
});
