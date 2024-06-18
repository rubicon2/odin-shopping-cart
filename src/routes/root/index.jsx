import Header from '../../components/header';
import { getUser } from '../../apis/user/user';
import { Outlet } from 'react-router';

export async function loader() {
  let user = await getUser();
  return user;
}

export default function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
