import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import { startSetExpenses } from './actions/expenses'
import configureStore from './store/configureStore'
import { login, logout } from './actions/auth'
import LoadingPage from './components/LoadingPage'
import { firebase } from './firebase/firebase'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import './styles/styles.sass' 

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

ReactDOM.render(<LoadingPage />, document.getElementById('app'))


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



// ===========================================
/* const pyramid = () => {
   let hash = '#', dot = "", line = "\n", sot = ""
   for(let i = 0; i < 8; i++) {
      // hash += '#'
      dot += '.'
      line += '\n'      
   }
   for(let k = 8; k > 0; k--) { 
      dot = dot.slice(0, k)
      hash += '#'
      sot += dot+hash+"\n"
   }
   return sot
} */

/* const pyramid = () => {
   let hash = '#', dot = "", line = "\n", sot = ""
   for(let i = 0; i < 8; i++) {
      hash += '#'
      dot += '.'
      line += '\n'      
   }
   for(let k = 8; k > 0; k--) { 
      console.log(dot)
   }
   
}

console.log(pyramid()) */



