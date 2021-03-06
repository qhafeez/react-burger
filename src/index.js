import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import burgerBuilderReducer from "./store/reducers/bb-reducer";
import orderReducer from "./store/reducers/order-reducer";
import authReducer from "./store/reducers/auth-reducer";
import thunk from "redux-thunk";
import {BrowserRouter} from "react-router-dom";


import registerServiceWorker from './registerServiceWorker';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	burgerBuilder:burgerBuilderReducer,
	order: orderReducer,
	auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(<Provider store={store}>

	<BrowserRouter basename="projects/react-burger">
	<App />
	</BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
