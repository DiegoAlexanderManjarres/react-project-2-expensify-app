import React from 'react'
import { connect } from 'react-redux'
import selectExpenseTotal from '../selectors/Exenses-total'
import selectExpenses from '../selectors/expenses'
import numeral from 'numeral'

export const ExpensesSummary = ({ expenses }) => {
   const total = numeral(selectExpenseTotal(expenses) / 100).format('$0,0.00')
   return (            
      <React.Fragment>
         { expenses.length ?
            <div>
               <div>Summary</div>
               <p><strong> Expenses available: </strong>{expenses.length}</p>
               <p><strong> Expenses Total: </strong>{total}</p>
            </div>
            : <div>Add expense</div>
         }     
      </React.Fragment>       
   )
} 

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
})

export default connect(mapStateToProps)(ExpensesSummary);
