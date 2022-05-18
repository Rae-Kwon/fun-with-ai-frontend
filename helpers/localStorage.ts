const getFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(key);
  }
};

const setToLocalStorage = (key: string, value: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(key, value);
  }
};

const removeFromLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(key);
  }
};

export {getFromLocalStorage, setToLocalStorage, removeFromLocalStorage};
