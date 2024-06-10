import { Outlet } from 'react-router';

export default function Root() {
  return (
    <>
      <h1>ROOT</h1>
      <Outlet />
    </>
  );
}
