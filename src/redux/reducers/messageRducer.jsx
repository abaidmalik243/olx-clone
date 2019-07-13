const messagereducer = (state = {}, action) => {

    if (action.type === 'MESSAGE') {

        state = { ...state, message: action.message }

    }

    return state;
}

export default messagereducer;


// WEBPACK FOOTER //
// ./src/redux/reducers/messageRducer.jsx