import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import './styles/styles.scss'
import AddExpensePage from './components/AddExpensePage';
import moment from 'moment'
import expensesReducer from './reducers/expenses';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import  getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
});

const waterBill = store.dispatch(addExpense(
  { description: 'Water Bill', amount: 20000, createdAt: 45687}
));

const gasBill = store.dispatch(addExpense(
  { description: 'Gas Bill', amount: 155800 }
));

const sprite = store.dispatch(addExpense(
  { description: 'Sprite', amount: 30000, createdAt: 1000 }
));

const rent = store.dispatch(addExpense({
  description: 'rent', amount: 109500
}));



const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));
