// Export a Stateless functional component
// description, amount, createdAt
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

export const ExpenseListItem = ({id, description, amount, createdAt}) => {
   return (    
	  	<li  data-id={id}>
			<h3><Link to={`/edit/${id}`}>{description}</Link></h3>
			<p>
				<strong> Amount: </strong> 
					{numeral(amount / 100).format('$0,0.00')} 
				<strong> CreatedAt: </strong> 
					{moment(createdAt).format('MMMM Do, YYYY')}
			</p>        
	  	</li>   
   )
}
export default connect()(ExpenseListItem);