import {isEmpty} from 'lodash'

const initialState = {
    isAuthenticated :false,
    user:{}
}

const auth= (state=initialState,action={})=>{
    switch (action.type) {
         
        case 'SET_CURRENT_USER':
            
        return{
            isAuthenticated:!isEmpty(action.user),
            user:action.user
        };
         
    
        default: return state;
            
    }
}
export default auth;


// WEBPACK FOOTER //
// ./src/redux/reducers/auth.js