import { createStore } from 'redux';

// Action generator - fuctions that return action objects



const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: "INCREMENT",
  incrementBy
  });

  const decrimentCount = ({decrimentBy = 1} = {}) => ({
    type: 'DECRIMENT',
    decrimentBy
  })

  const setCount = ({ count } = {}) => ({
    type: 'SET',
    count
  })

  const resetCount = () => ({
    type: 'RESET'
  })
    
// Reducers
// 1. Reducers are pure functions
// 2. Never change state or action
// 


const countReducer = ((state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT': 
      return { 
        count: state.count + action.incrementBy 
      };
    case 'DECRIMENT':
      return { 
        count: state.count - action.decrimentBy
       };
    case 'SET':
      return {
        count: action.count
      }   
    case 'RESET':
      return { 
        count: 0
      };
    default:
      return state;  
  }
});

const store = createStore(countReducer);
const unsubsbribe = store.subscribe(() => {
  console.log(store.getState());
});


// Actions - an object that gets sent to the store

// I'd like to increment the count
/* store.dispatch({
   type: 'INCREMENT',
   incrementBy: 5 
  });
//unsubsbribe();
store.dispatch({ 
  type: 'DECRIMENT'
 }); */

store.dispatch(incrementCount({ incrementBy: 5 })); 
store.dispatch(decrimentCount({ decrimentBy: 20} )); 
// I' like to reset the count to zero
store.dispatch(resetCount());

 store.dispatch(setCount({
   count: 101
   }))