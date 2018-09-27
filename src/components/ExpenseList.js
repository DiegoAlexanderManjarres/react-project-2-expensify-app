import React from "react";
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import selectExpenses from '../selectors/expenses';
// connect for components that needs to read from the store or didpatch actions

export const ExpenseList = (props) => (
	<div className="content-container">
		<div className="list-header">
			<div className="show-for-mobile">Expenses</div>
			<div className="show-for-desktop">Expense</div>
			<div className="show-for-desktop">Amount</div>
		</div>
		<div className="list-body">
			{
				!props.expenses.length ? (
					<div className="list-item-wrapper list-item list-item--message">
						<span>No expenses</span>
					</div>
					) : (
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
	</div>
);

const mapStateToProps = (state) => ({
	expenses: selectExpenses(state.expenses, state.filters)
});

export default connect(mapStateToProps)(ExpenseList);