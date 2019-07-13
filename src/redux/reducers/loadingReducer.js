const LoadingReducer = (state = { isLoading: false }, action) => {
    if (action.type === 'LOADING') {
        state = { ...state, isLoading: action.payload }
    }
    return state

}

export default LoadingReducer;


// WEBPACK FOOTER //
// ./src/redux/reducers/loadingReducer.js