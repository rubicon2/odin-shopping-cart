import Basket from './routes/basket';
import Home from './routes/home';
import Root from './routes/root';
import Shop from './routes/shop';

export const routes = [
  {
    path: '/',
    element: <Root />,
    children: [
      {
        errorElement: <h1>An error has occurred.</h1>,
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
