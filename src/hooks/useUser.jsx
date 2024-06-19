import {
  getUser,
  startListeningForUpdates,
  stopListeningForUpdates,
} from '../apis/user/user';
import { useEffect, useState } from 'react';

export default function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const updateUser = (updatedUser) => setUser(updatedUser);

    const get = async () => {
      const data = await getUser();
      startListeningForUpdates(updateUser);
      return data;
    };

    get().then((data) => {
      if (!user) setUser(data);
    });

    return () => stopListeningForUpdates(updateUser);
  });

  return user;
}
