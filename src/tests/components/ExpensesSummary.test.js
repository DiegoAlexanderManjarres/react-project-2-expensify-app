import React from 'react'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'


test('Viewing 2 expenses to talling $94.34', () => {
   const expenses = [{ amount: 2000 }, { amount: 7434 }]
   const wrapper = shallow(<ExpensesSummary expenses={expenses}/>)
   expect(wrapper).toMatchSnapshot()
})

test('Viewing 1 expenses to talling $94.34', () => {
   const expenses = [{ amount: 9434 }]
   const wrapper = shallow(<ExpensesSummary expenses={expenses}/>)
   expect(wrapper).toMatchSnapshot()
})

test('Viewing 0 expenses', () => {
   const expenses = []
   const wrapper = shallow(<ExpensesSummary expenses={expenses}/>)
   expect(wrapper).toMatchSnapshot()
})



