import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

export const PublicRoute = (props) => {
   const { isAuthenticated, component: Component, ...rest } = props   
   return (
      <Route {...rest} render={props => (
         isAuthenticated 
         ? (<Redirect to="/Dashboard" />) : (<Component {...props} />) 
      )} />
   )
}

const mapStateToProps = (state) => ({ isAuthenticated: !!state.auth.uid })

export default connect(mapStateToProps)(PublicRoute) 
