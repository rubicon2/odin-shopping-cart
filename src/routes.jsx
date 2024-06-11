import Basket from './routes/basket';
import Home from './routes/home';
import Root from './routes/root';
import Shop from './routes/shop';
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
