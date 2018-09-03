import React from "react";
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// connect for components that needs to read from the store or didpatch actions

export const ExpenseList = (props) => (
	<div>
		{
			!props.expenses.length ? (<p>No expenses</p>) : (
				<ul>    
					{
						props.expenses.map(expense => (
							<ExpenseListItem 
								key={expense.id} 
								{...expense} 
								{...props}/>
						))
					}
				</ul>    
			)
		}
			
	</div>
);

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);