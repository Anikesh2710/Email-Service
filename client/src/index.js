// Data layer control (Redux)
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import App from './components/App'

const store = createStore(() => [], {}, applyMiddleware());

ReactDOM.render(
	<Provider store={store}><App /></Provider>, //a provider reads update in the store and update all the children components.
	document.querySelector('#root')
);