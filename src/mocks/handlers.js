import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://fakestoreapi.com/products', () => {
    return HttpResponse.json([
      {
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
      },
    ]);
  }),
];
