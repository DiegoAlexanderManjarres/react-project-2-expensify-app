import selectctExpenseTotal from '../../selectors/Exenses-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
   const total = selectctExpenseTotal([])
   expect(total).toBe(0)
})

test('should correctly add up a single expense', () => {
   const total = selectctExpenseTotal([ expenses[0] ])
   expect(total).toBe(195)
})

test('should correctly add up a multiple expense', () => {
   const total = selectctExpenseTotal(expenses)
   expect(total).toBe(114195)
})