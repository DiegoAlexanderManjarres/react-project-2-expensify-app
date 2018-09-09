import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'
import { isMoment } from 'moment';

test('sould set default state', () => {
   const state = expensesReducer(undefined, { type: '@@INIT' })
   expect(state).toEqual([])
})

test('should remove expense by id', () => {
   const action = {
      type: 'REMOVE_EXPENSE',
      id: expenses[1].id
   }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual([expenses[0], expenses[2]])
})

test('should not remove expense if id not found', () => {
   const action = {
      type: 'REMOVE_EXPENSE',
      id: '-1'
   }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual(expenses)
})

// should add an expense
test('should add an expense', () => {
   const expense = {
      id: '4',
      description: 'cat',
      note: 'buy food',
      amount: '2000',
      createdAt: 1597532358
   }
   const action = {
      type: 'ADD_EXPENSE',  
      expense    
   }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual([...expenses, expense])
})

// should edit an expense
test('should edit an expense', () => {
   const updates = { note: 'this is an update' }
   const action = {
      type: 'EDIT_EXPENSE',
      id: expenses[2].id,
      updates
   }
   const state = expensesReducer(expenses, action)
   expect(state[2]).toEqual({ ...expenses[2], ...updates })
})

// should not edit expense if not found
test('should not edit an expense if id not found', () => {
   const updates = { note: 'this is another update' }
   const action = {
      type: 'EDIT_EXPENSE',
      id: '-1',
      updates
   }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual(expenses)
})

test('should set expenses', () => {
   const action = {
      type: 'SET_EXPENSES',
      expenses: [expenses[2]]
   }
   const state = expensesReducer(expenses, action)
   expect(state).toEqual([expenses[2]])
})

