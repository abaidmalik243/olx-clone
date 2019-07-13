import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App1 from './routes';



import { createStore, applyMiddleware, } from 'redux';
import { Provider } from 'react-redux'

import thunk from 'redux-thunk'
import reducer from './redux/reducers/rootReducer';


const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware)

ReactDOM.render(<Provider store={store} >
    <App1 />
</Provider>, document.getElementById('root'));
