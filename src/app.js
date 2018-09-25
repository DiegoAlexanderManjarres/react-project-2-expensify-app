import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import { startSetExpenses } from './actions/expenses'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import { firebase } from './firebase/firebase'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import './styles/styles.scss' 

const store = configureStore();

const jsx = (        
   <Provider store={store}>
      <AppRouter />
   </Provider>   
)

const has = { rendered: false }

const renderApp = () => {
   if(!has.rendered) {
      ReactDOM.render(jsx, document.getElementById('app'))
      has.rendered = true
   }
}

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'))



firebase.auth().onAuthStateChanged(user => {
   if (user) {
      store.dispatch(login(user.uid))
      store.dispatch(startSetExpenses()).then(() => {
         renderApp()
         if (history.location.pathname === '/') {
            history.push('/dashboard')
         }
      }) 
   } else {
      store.dispatch(logout())
      renderApp()
      history.push('/')
   }
})



