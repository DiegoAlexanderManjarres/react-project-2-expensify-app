import uuidv4 from 'uuid';
import database from '../firebase/firebase'

// ADD_EXENSE
export const addExpense = (expense) => ({
   type: 'ADD_EXPENSE',
   expense
})

export const startAddExpense = (expenseData = {}) => {
	return (dispatch) => {

		const { 
			description = '', 
			note = '', 
			amount = 0, 
			createdAt = 0
		} = expenseData // destructured obj

		const expense = { description, note, amount, createdAt } 

		return database.ref('expenses').push(expense).then(ref => {
			dispatch(addExpense({
				id: ref.key,
				...expense
			}))
		})  
	}
} 

// REMOVE_ EXPENSE
export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE', 
  id 
})

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
})

// SET_EXPENSES
export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSES',
	expenses
})

//export const startSetExpenses

export const startSetExpenses = () => (dispatch) => (
	 database.ref('expenses').once('value').then(snapshot => {
		 const expenses = []
			snapshot.forEach(childSnapshots => {
				expenses.push({ id: childSnapshots.key, ...childSnapshots.val() })
			})
			dispatch(setExpenses(expenses))				
		})
	)

export const startRemoveExpense = ({ id }) => (dispatch) => (
	database.ref(`expenses/${id}`).set(null)
		.then(() => dispatch(removeExpense({ id })))
)

export const startEditExpense = (id, expenseUpdates) => (dispatch) => ( 
	database.ref(`expenses/${id}`).update(expenseUpdates)
		.then(() => dispatch(editExpense(id, expenseUpdates)))
)		

	
 

	
		 		
 
