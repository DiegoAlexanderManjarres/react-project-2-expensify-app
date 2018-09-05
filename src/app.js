import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import 'normalize.css/normalize.css'
import 'react-dates/lib/css/_datepicker.css'
import 'react-dates/initialize'
import './styles/styles.scss' 
import moment from 'moment'


const store = configureStore();

const jsx = (
   <Provider store={store}>
	   <AppRouter />
   </Provider>
)

ReactDOM.render(jsx, document.getElementById('app'));

