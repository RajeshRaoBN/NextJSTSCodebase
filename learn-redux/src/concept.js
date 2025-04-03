import {createStore} from 'redux';

// Store -> Globalised State

// Action Increment
const increment = () => {
  return {
    type: 'INCREMENT'
  }
}

const decrement = () => {
  return {
    type: 'DECREMENT'
  }
}

// Reducer
const counter = (state = 0, action) => {
  switch(action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

let store = createStore(counter);

// Display it in the console
store.subscribe(() => console.log(store.getState()));


// Dispatch
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(decrement());