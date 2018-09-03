import moment from 'moment'
import filtersReducer from '../../reducers/filters'

// check redux if it inserts correctly

test('should setup default filter values', () => {
   const state = filtersReducer(undefined, { type: '@@INIT' })
   expect(state).toEqual({
      text: '',
      sortBy: 'date',
      startDate: moment().startOf('month'),
      endDate: moment().endOf('month')
   })
})

test('should set sortBy to amount', () => {
   const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' })
   expect(state.sortBy).toBe('amount')
}) 

test('should set sortBy to date', () => {
   const currentState = {
      text: '',
      startDate: undefined,
      endDate: undefined,
      sortBy: 'amount'
   }
   const action = { type: 'SORT_BY_DATE' }
   const state = filtersReducer(currentState, action)
   expect(state.sortBy).toBe('date')
}) 

// should set text filter
test('should set text filter', () => {
   const text = 'rent'
   const action = { 
      type: 'SET_TEXT_FILTER',
      text
   }
   const state = filtersReducer(undefined, action)
   expect(state.text).toBe(text)
})

// should set start date filter
test('should set startDate filter', () => {
   const startDate = moment(0)
   const action = {
      type: 'SET_START_DATE',
      startDate
   }
   const state = filtersReducer(undefined, action)
   expect(state.startDate).toBe(startDate)
})

// should set end date filter
test('should set end date filter', () => {
   const endDate = moment(0).add(3, 'days')
   const action = {
      type: 'SET_END_DATE',
      endDate
   }
   const state = filtersReducer(undefined, action)
   expect(state.endDate).toBe(endDate)
})
