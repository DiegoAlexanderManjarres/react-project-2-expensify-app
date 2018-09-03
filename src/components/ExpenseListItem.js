// Export a Stateless functional component
// description, amount, createdAt
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeExpense } from '../actions/expenses';

export const ExpenseListItem = ({id, description, amount, createdAt}) => {
  return (    
	  	<li  data-id={id}>
				<h3><Link to={`/edit/${id}`}>{description}</Link></h3>
				<p>
					<strong>Amount:</strong> {amount}  
					<strong>CreatedAt:</strong> {createdAt}
				</p>        
	  	</li>   
  )
}
export default connect()(ExpenseListItem);