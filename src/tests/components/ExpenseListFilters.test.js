import React from 'react'
import { shallow } from 'enzyme'
import { filters, altFilters } from '../fixtures/filters'
import expenses from '../fixtures/expenses'
import moment from 'moment'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
   setTextFilter = jest.fn()
   sortByDate = jest.fn()
   sortByAmount = jest.fn()
   setStartDate = jest.fn()
   setEndDate = jest.fn()
   wrapper = shallow(<ExpenseListFilters 
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
   />)
})

test('should render expenseListFilter correctly', () => { 
   wrapper.setState({ idGennerator: 'abc' })
   expect(wrapper).toMatchSnapshot()
})

test('should render expenseListFilter correctly', () => { 
   wrapper.setState({ idGennerator: 'abc' })   
   wrapper.setProps({ filters: altFilters })
   expect(wrapper).toMatchSnapshot()
}) 

test('should handle text change', () => {
   const value = 'rent'
   wrapper.setState({ idGennerator: 'abc' })
   wrapper.find('input').simulate('change', { target: { value } })
   expect(setTextFilter).toHaveBeenLastCalledWith(value)
   expect(wrapper).toMatchSnapshot()
})

test('should sort by date', () => {
   const value = 'date'
   wrapper.setState({ idGennerator: 'abc', filters: altFilters })
   wrapper.find('select').simulate('change', { target: { value } })
   expect(sortByDate).toHaveBeenCalled()
   expect(wrapper).toMatchSnapshot()
})

test('should sort by amount', () => {
   const value = 'amount'
   wrapper.setState({ idGennerator: 'abc' })
   wrapper.find('select').simulate('change', { target: { value } })
   expect(sortByAmount).toHaveBeenCalled()
   expect(wrapper).toMatchSnapshot()
})

test('should handle date changes', () => {
   const { startDate, endDate } = altFilters
   wrapper.setState({ idGennerator: 'abc' })
   wrapper.find('withStyles(DateRangePicker)')
   .prop('onDatesChange')({ startDate, endDate })
   expect(setStartDate).toHaveBeenLastCalledWith(startDate)
   expect(setEndDate).toHaveBeenLastCalledWith(endDate)
   expect(wrapper).toMatchSnapshot()
})

test('should handle date focus changes', () => {
   wrapper.setState({ 
      idGennerator: 'abc',
      filters: altFilters
   })
   const calendarFocused = 'endDate'
   wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused)
   expect(wrapper.state('calendarFocused')).toBe(calendarFocused)
   expect(wrapper).toMatchSnapshot()
})






