import { combineReducers } from 'redux'
import auth from './auth'
import reducer from './reducers';
import messageRducer from './messageRducer'
import LoadingReducer from './loadingReducer';

export default combineReducers({
    post: reducer,
    auth: auth,
    message: messageRducer,
    loading: LoadingReducer
});


// WEBPACK FOOTER //
// ./src/redux/reducers/rootReducer.js