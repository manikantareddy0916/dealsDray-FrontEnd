import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { configureStore } from './store/configureStore.js';
import {Provider} from 'react-redux'

const store=configureStore()
console.log('main',store.getState())
store.subscribe(()=>{
   console.log('subscribe',store.getState())
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store = {store}>
  <App />
  </Provider>
)
