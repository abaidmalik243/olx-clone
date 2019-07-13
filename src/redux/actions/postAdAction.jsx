
const postAdDataActionType = (data) => {
    return {
        type: 'POSTAD', payload: data
    }
}
const postAdDataAction = (data) => {
    return (dispatch) => {
        dispatch(postAdDataActionType(data))
    }
}

export default postAdDataAction


// WEBPACK FOOTER //
// ./src/redux/actions/postAdAction.jsx