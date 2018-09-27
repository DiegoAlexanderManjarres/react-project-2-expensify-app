import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import selectExpenseTotal from '../selectors/Exenses-total'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

export const ExpensesSummary = ({ expenses }) => {
   const total = numeral(selectExpenseTotal(expenses) / 100).format('$0,0.00')
   const expensesWord = expenses.length === 1 ? 'expense' : 'expenses'
   return (            
      <div className="page-header">
         <div className="content-container">
            { expenses.length ? (
               <h1 className="page-header__title">Viewing
                  <strong> {expenses.length} </strong> 
                  {expensesWord} totalling
                  <strong> {total} </strong>
               </h1>
            ) : (
               <h1 className="page-header__title">Add expense</h1>               
            )} 
            <div className="page-header__actions">
               <Link className="button" to="/create">Add Expense</Link>
            </div> 
         </div> 
          
      </div>       
   )
} 

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummary);
