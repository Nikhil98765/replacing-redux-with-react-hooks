/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = (shouldListen = true) => {
  // used to re-render the components which uses this hook.
  const setState = useState(globalState)[1];

  // created a dispatch function and re-render all the components if there is a change in state by action.
  const dispatch = (actionIdentifier, payload) => {
    const newState = actions[actionIdentifier](globalState, payload);
    globalState = { ...globalState, ...newState };
    for (const listener of listeners) {
      listener(globalState);
    }
  }

  useEffect(() => {
    // Add the listener (setState) of that component which uses this hook and when component got mounted.
    if (shouldListen) {
      listeners.push(setState);
    }

    return () => {
      // Removing the listener upon unmount.
      if (shouldListen) {
        listeners = listeners.filter(li => li !== setState);
      }
    }
  }, [setState, shouldListen]);

  return [globalState, dispatch];
}

// Initializing the slice of a store and merging initial state and respective user actions.
export const initStore = (userActions, initialState) => {
  if (initialState) {
    globalState = { ...globalState, ...initialState };
  }
  actions = { ...actions, ...userActions };
}