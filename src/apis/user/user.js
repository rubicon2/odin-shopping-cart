import localforage from 'localforage';

let onChangeListeners = [];

// start/stopListeningForUpdates functions are for letting components update when the data is changed.
// Feels like there should be some built in behavior/hooks for this sort of thing, and that I am definitely approaching this in the wrong way.
// useEffect with something in the dependency array felt like the way to go, but what was supposed to go in the dependency array?
// user should be reloaded if the basket changes, but you would have to reload the user to know whether the basket has changed in the first place.
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
    basket: {},
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

export async function addToBasket(item, qty = 1) {
  const user = await getUser();
  await set('user', {
    ...user,
    basket: {
      ...user.basket,
      [item.id]: qty,
    },
  });
}

export async function removeFromBasket(itemToRemove) {
  const user = await getUser();
  const newBasket = { ...user.basket };
  delete newBasket[itemToRemove.id];

  await set('user', {
    ...user,
    basket: newBasket,
  });
}

export async function clearBasket() {
  const user = await getUser();
  await set('user', {
    ...user,
    basket: {},
  });
}
