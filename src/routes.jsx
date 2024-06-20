import Basket, { loader as BasketLoader } from './routes/basket';
import Shop, { loader as ShopLoader } from './routes/shop';
import Home from './routes/home';
import Root from './routes/root';
import Error from './routes/error';

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: '/shop',
            loader: ShopLoader,
            element: <Shop />,
          },
          {
            path: '/basket',
            loader: BasketLoader,
            element: <Basket />,
          },
        ],
      },
    ],
  },
];
