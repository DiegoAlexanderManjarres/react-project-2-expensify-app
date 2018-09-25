import React from 'react';
import { shallow } from 'enzyme'
import { AddExpensePage } from '../../components/AddExpensePage'
import expenses from '../fixtures/expenses'

let onSubmit, history, wrapper, startAddExpense

beforeEach(() => {
   startAddExpense = jest.fn()
   history = { push: jest.fn() } //prop
   wrapper = shallow(<AddExpensePage 
      startAddExpense={startAddExpense}
      history={history}
      />)
})

test('should render AddExpensePage correctly' , () => {   
   expect(wrapper).toMatchSnapshot()
})

test('should handle on submit', () => {   
   wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1])   
   expect(history.push).toHaveBeenLastCalledWith('/dashboard')
   expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1])
})