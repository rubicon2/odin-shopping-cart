import localforage from 'localforage';

let onChangeListeners = [];

export function startListeningForUpdates(fn) {
  if (!onChangeListeners.includes(fn)) onChangeListeners.push(fn);
}

export function stopListeningForUpdates(fnToRemove) {
  onChangeListeners = onChangeListeners.filter((fn) => fn !== fnToRemove);
}

async function get(key, listener) {
  const item = await localforage.getItem(key);
  if (listener) onChangeListeners.push(listener);
  return item;
}

function set(key, item) {
  for (const listener of onChangeListeners) listener(item);
  return localforage.setItem(key, item);
}

export async function createUser() {
  // user.createdAt date is turned into a string
  const user = {
    id: Math.random().toString(36).substring(2, 9),
    createdAt: new Date(Date.now()),
    basket: [],
  };
  await set('user', user);
  return user;
}

export async function getUser(listener) {
  let user = await get('user', listener);
  if (!user) user = await createUser();
  // When createdAt date/time is stored to disk, it is stringified. Turn back into a Date
  return { ...user, createdAt: new Date(user.createdAt) };
}

export async function addToBasket(item) {
  const user = await getUser();
  await set('user', {
    ...user,
    basket: [...user.basket, item],
  });
}

export async function removeFromBasket(item) {
  const user = await getUser();
  await set('user', {
    ...user,
    basket: user.basket.filter((i) => i !== item),
  });
}

export async function clearBasket() {
  const user = await getUser();
  await set('user', {
    ...user,
    basket: [],
  });
}
