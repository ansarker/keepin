import { useState } from "react";

const useLocalStorage = (key = '', initialValue = '') => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  })

  const setLocalStorageState = (newState) => {
    try {
      const newStateValue = typeof newState === 'function' ? newState(state) : newState;
      setState(newStateValue);
      window.localStorage.setItem(key, JSON.stringify(newStateValue));
    } catch (error) {
      console.log(`Unable to store value for ${key} in localstorage`)
    }
  }

  return [state, setLocalStorageState]
}

export default useLocalStorage;