import Header from '../../components/header';
import { Outlet } from 'react-router';

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
