import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListItem } from '../../components/ExpenseListItem'
import expenses from '../fixtures/expenses'

// Render ExpenseListItem with fixture data
test('should render expenseListItem with fixture date', () => {
   const wrapper = shallow(<ExpenseListItem { ...expenses[1] }/>)
   expect(wrapper).toMatchSnapshot()
})