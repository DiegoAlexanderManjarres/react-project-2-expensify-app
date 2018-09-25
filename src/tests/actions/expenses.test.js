import { 
	startAddExpense,
	startSetExpenses, 
   addExpense, 
   editExpense, 
	removeExpense, 
	startRemoveExpense,
	setExpenses,
	startEditExpense
} from '../../actions/expenses'
import expenses  from '../fixtures/expenses'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import database from '../../firebase/firebase'

const uid = 'this-is-my-test-uid'
const defaultAuthState = { auth: { uid } }
const createMockStore = configureMockStore([thunk])

beforeEach((done) => {
	const expensedata = {}
	expenses.forEach(({ id, description, note, amount, createdAt }) => {
		expensedata[id] = { description, note, amount, createdAt }
	})
	database.ref(`users/${uid}/expenses`).set(expensedata).then(() => done())
})

test('should setup remove expense action object', () => {
   const action = removeExpense({ id:'123abc'  })
   expect(action).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '123abc'            
   })
})

test('should setup editExpense action object', () => {
   const action = editExpense('123abc', { note: 'New note value' })
   expect(action).toEqual({
      type: 'EDIT_EXPENSE',
      id: '123abc',
      updates: {
         note: 'New note value'
      }
   })
})

test('should setup add expense action object with provided values', () => {
   const action = addExpense(expenses[2])
   expect(action).toEqual({
      type:'ADD_EXPENSE',
      expense: expenses[2]
   })
})

test('should add expense to database and store', (done) => {

   const store = createMockStore(defaultAuthState)
   const expenseData = { 
         description: 'Cat', 
         amount: 4000, 
         note: 'this one is better', 
         createdAt: 1500
   }
   store.dispatch(startAddExpense(expenseData)).then(() => {
      const actions = store.getActions() // areay of actions
      expect(actions[0]).toEqual({
         type: 'ADD_EXPENSE',
            expense: {
            id: expect.any(String),
            ...expenseData
            }
			})
			
         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
         .once('value')
      }).then(snapshot => {
			expect(snapshot.val()).toEqual(expenseData)
			done()
		 })      
})

test('should add expense with defaults to  database and store', (done) => {
   const store = createMockStore(defaultAuthState)
   const expenseDefault = {
      description: '', 
      note: '', 
      amount: 0, 
      createdAt: 0
   }
   store.dispatch(startAddExpense(expenseDefault))
      .then(() => {
         const actions = store.getActions() // areay of actions
         expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
               id: expect.any(String),
               ...expenseDefault
            }
         })
         return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`)
         .once('value') 
      }).then(snapshot => {
			expect(snapshot.val()).toEqual(expenseDefault)
			done()
		})      
})

test('should setup set expense action object with data', () => {
	const action = setExpenses(expenses)
	expect(action).toEqual({
		type: 'SET_EXPENSES',
		expenses
	})
})

test('should fetch the expenses from firebase', (done) => {
	const store = createMockStore(defaultAuthState)
	store.dispatch(startSetExpenses()).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'SET_EXPENSES',
			expenses
		})
		done()
	})
})

test("should remove expenses from firebase", (done) => {
	const store = createMockStore(defaultAuthState)
	const id =  expenses[0].id 
	store.dispatch(startRemoveExpense({ id })).then(() => {
		const actions = store.getActions()
		expect(actions[0]).toEqual({
			type: 'REMOVE_EXPENSE',
			id
		})
		return database.ref(`users/${uid}/expenses/${id}`).once('value')
	}).then(snapshot => {
		expect(snapshot.val()).toBeFalsy()
		done()
	})
})

test("Should edit expense from firebase", (done) => {
  const store = createMockStore(defaultAuthState)
  const { id, createdAt, description } = expenses[0]
  const updates = { amount: 137, note: 'new Price', createdAt, description}
  
  store.dispatch(startEditExpense(id, updates)).then(() => {
	  const actions = store.getActions()
	  expect(actions[0]).toEqual({
		  type: 'EDIT_EXPENSE',
		  id,
		  updates
	  })
	   database.ref(`users/${uid}/expenses/${id}`).update(updates).then(() => (
			database.ref(`users/${uid}/expenses/${id}`).once('value')
		)).then(snapshot => {
			expect(snapshot.val()).toEqual(updates)
			done()
		})
  })
})