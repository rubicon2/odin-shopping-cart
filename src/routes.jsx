import Basket from './routes/basket';
import Shop, { loader as ShopLoader } from './routes/shop';
import Home from './routes/home';
import Root, { loader as RootLoader } from './routes/root';
import Error from './routes/error';

export const routes = [
  {
    path: '/',
    element: <Root />,
    loader: RootLoader,
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
            element: <Basket />,
          },
        ],
      },
    ],
  },
];
