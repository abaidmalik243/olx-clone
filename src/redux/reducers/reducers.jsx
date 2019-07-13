const reducer = (state = {}, action) => {

    if (action.type === 'AGE') {
        state = { ...state, age: action.payload }

    }
    if (action.type === 'NAME') {
        state = { ...state, name: action.payload }
    }
    if (action.type === 'POSTAD') {

        state = { ...state, postData: action.payload }
    }
    return state;
}

export default reducer;


// WEBPACK FOOTER //
// ./src/redux/reducers/reducers.jsx