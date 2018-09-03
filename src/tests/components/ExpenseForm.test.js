import React from 'react'
import { shallow } from 'enzyme'
import  ExpenseForm  from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'
import moment from 'moment'

test('should render ExpenseForm correctly', () => {
   const wrapper = shallow(<ExpenseForm />)
   expect(wrapper).toMatchSnapshot()
})

test ('should render expense form with expense data', () => {
   const wrapper = shallow(<ExpenseForm expense={expenses[0]} />)
   expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {   
   const wrapper = shallow(<ExpenseForm />)
   expect(wrapper).toMatchSnapshot()
   wrapper.find('form').simulate('submit', { preventDefault: () => {} })
   // enzyme will get state
   expect(wrapper.state('error').length).toBeGreaterThan(0)
   expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
   const value = 'value test'
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('input').at(0).simulate('change', {
      preventDefault: () => {},
      target: { value }
   })
   expect(wrapper.state('description')).toBe(value)
   expect(wrapper).toMatchSnapshot()
})

test('should set note on textarea change', () => {
   const value = 'my message text'
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('textarea').simulate('change', {
      preventDefault: () => {},
      target: { value }
   })
   expect(wrapper.state('note')).toBe(value)
   expect(wrapper).toMatchSnapshot()
})

test('should set amount if valid input 23.50', () => {
   const value = '23.50'
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('input').at(1).simulate('change', {
      preventDefault: () => {},
      target: { value }
   })
   expect(wrapper.state('amount')).toBe(value)
   expect(wrapper).toMatchSnapshot()
})

test('should set amount if invalid input 12.1220', () => {
   const value = '12.122'
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('input').at(1).simulate('change', {
      preventDefault: () => {},
      target: { value }
   })
   expect(wrapper.state('amount')).toBe('')
   expect(wrapper).toMatchSnapshot()
})

test('should call onSubmit prop for valid form submission', () => {
   const onSubmitSpy = jest.fn()
   const { id, description, createdAt, amount, note } = expenses[2]
   const wrapper = shallow(
      <ExpenseForm expense={expenses[2]} onSubmit={onSubmitSpy}/>
   )
   wrapper.find('form').simulate('submit', {
      preventDefault: () => {}
   })
   expect(wrapper.state('error')).toBe('')
   expect(onSubmitSpy).toHaveBeenLastCalledWith({ 
      description, 
      createdAt, 
      amount, 
      note 
   })
}) 

// (// check this one)
test('should set new date on date change', () => {
   const now = moment()
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now)
   expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set calendar focus on change', () => {
   const focused = true
   const wrapper = shallow(<ExpenseForm />)
   wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused })
   expect(wrapper.state('calendarFocused')).toBe(focused)
})