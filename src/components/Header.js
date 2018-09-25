import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { startLogout } from '../actions/auth'

export const Header = ({ startLogout }) => (
  <header>
	 <h1>Expensify</h1>
	 <div>
		<NavLink to="/dashboard" activeClassName="is-active">
		  <strong> Dashboard </strong> 
		</NavLink>
		<br />
		<NavLink to="/create" activeClassName="is-active"> 
		  <strong> Create-Expense </strong> 
		</NavLink>
		<button onClick={startLogout}>Logout</button>
	 </div>
  </header>
)

const mapDispatchToProps = (dispatch) => ({
	startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)