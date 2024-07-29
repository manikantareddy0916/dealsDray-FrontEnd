import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

import allEmployeesReducer from '../reduxReducer/allEmployeesReducer'

//import userReducer from '../reduxReducer/userReducer'
// import myProductsRdx from '../reduxReducer/myProductsRdx'
// import categoryRdx from '../reduxReducer/categoryRdxReducer'
// import reqForm from '../reduxReducer/reqFormRdxReducer'
// import { paymentsReducer } from '../reduxReducer/paymentRdxReducer'

export function configureStore(){
    const store= createStore(combineReducers({
        
        allEmployees : allEmployeesReducer,
        // user : userReducer,
        // address : addressRdxReducer,
        // allProducts : myProductsRdx,
        // category : categoryRdx,
        // reqForm : reqForm,
        // payments : paymentsReducer

    }),applyMiddleware(thunk))
    return store
}