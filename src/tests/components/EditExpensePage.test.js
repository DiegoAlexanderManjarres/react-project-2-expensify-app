import React from 'react'
import { shallow } from 'enzyme'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'


let history, wrapper, editExpense, removeExpense, expense

beforeEach(() => {
   editExpense = jest.fn()
   history = { push: jest.fn() } //prop
   removeExpense = jest.fn()
   expense = expenses[1]
   wrapper = shallow(<EditExpensePage 
      expense={expense}
      editExpense={editExpense}
      history={history}
      removeExpense={removeExpense}
      />)
})
 
// should render edit expense page
test('should render edit expense page', () => {
   expect(wrapper).toMatchInlineSnapshot
})

// should handle edit expense spies
test('should handle edit expense spies', () => {
   wrapper.find('ExpenseForm').prop('onSubmit')(expense) 
   expect(history.push).toHaveBeenLastCalledWith('/')
   expect(editExpense).toHaveBeenLastCalledWith(expense.id, expense)
})

// should handle removeExpense spies // that prop hint
test('should handle remove expense spies', () => {
   wrapper.find('button').prop('onClick')()
   expect(history.push).toHaveBeenLastCalledWith('/')
   expect(removeExpense).toHaveBeenLastCalledWith({ id: expense.id })
})