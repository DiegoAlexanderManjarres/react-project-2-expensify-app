import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Expensify</h1>
    <div>
      <NavLink to="/" activeClassName="is-active" exact={true}>
        <strong> Dashboard </strong> 
      </NavLink>
      <br />
      <NavLink to="/create" activeClassName="is-active"> 
        <strong> Create-Expense </strong> 
      </NavLink>
    </div>
  </header>
)

export default Header;