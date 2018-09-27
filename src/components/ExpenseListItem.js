// Export a Stateless functional component
// description, amount, createdAt
import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import numeral from 'numeral'

export const ExpenseListItem = ({id, description, amount, createdAt}) => {
   return (    
	  	<li  data-id={id} className="list-item-wrapper">
			<Link className="list-item"
				to={`/edit/${id}`}>
				<div>
					<h3 className="list-item__title">{description}</h3>
					<strong className="list-item__sub-title">
						{moment(createdAt).format('MMMM Do, YYYY')}
					</strong>
				</div>
				<h3 className="list-item__data">
					{numeral(amount / 100).format('$0,0.00')}
				</h3>				
			</Link>			       
	  	</li>   
   )
}
export default connect()(ExpenseListItem);