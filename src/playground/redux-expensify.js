import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// ADD_EXENSE
const addExpense = ({ 
  description = '', 
  note = '', 
  amount = 0, 
  createdAt = 0
 } = {}) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description,
    note,
    amount,
    createdAt
  }
})

// REMOVE_ EXPENSE
const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE', 
  id 
})
// EDIT_EXPENSE
const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_TEXT_FILTER
const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

// SORT_BY_DATE
const sortByDate = () => ({
  type: 'SET_TEXT_FILTER',  
})

// SORT_BY_AMOUNT
const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',  
})

// SET_START_DETE
const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date
})
// SET_END_DATE
const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date
})
// expenses Reducer
const expensesReducerDefaultState = [];
const expensesReducer = (state = expensesReducerDefaultState, action) => {  
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense];
    case 'REMOVE_EXPENSE':
      //return state.filter(expense => expense.id !== action.id);  
      //destructuring
      return state.filter(({ id }) => id !== action.id);
    case 'EDIT_EXPENSE':
      return state.map(expense => {
        if (expense.id === action.id) {
          return {...expense, ...action.updates}
        } else {
          return expense;
        }
      })
    default:
      return state;
  }
}

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {  
    case 'SET_TEXT_FILTER':
      return { ...state, text: action.text };
    case 'SORT_BY_DATE':
      return { ...state, sortBy: 'date' };  
    case 'SORT_BY_AMOUNT':
      return { ...state, sortBy: 'amount' }; 
    case 'SET_START_DATE':
      return { ...state, startDate: action.date };
    case 'SET_END_DATE':
      return { ...state, endDate: action.date }  
      
    default:
      return state;
  }
}

// Filter Reducer
// text => '', sortBy => 'date', startDate => undefined, endDate => undefined

// timestamps
// January 1st 1970 (unix epoch)
// 3400, 10, -203
// 

// Get visibleexpenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  return expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || 
      expense.createdAt >= startDate;

    const endDateMatch = typeof endDate !== 'number' || 
      expense.createdAt <= endDate;

    const textMatch = /* typeof text === 'number' || */
      expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.createdAt < b.createdAt? 1: -1;
    } else if (sortBy === 'amount') {
      return a.amount > b.amount? -1: 1;
    }
  });
}



// Store creation
const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expenseOne = store.dispatch(addExpense(
  { description: 'Rent', amount: 100, createdAt: 1000 }
));
const expenseTwo = store.dispatch(addExpense(
  { description: 'Coffee', amount: 300, createdAt: -1000 }
));
// store.dispatch(removeExpense({ id: expenseOne.expense.id}));
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 5000 }));

// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());

 store.dispatch(sortByAmount());
// store.dispatch(sortByDate()); 


//  store.dispatch(setStartDate(2000));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate(125));
 


//console.log(store.getState());

