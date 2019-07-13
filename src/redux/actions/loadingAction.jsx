const showLoadingType = (loading) => {
    return {
        type: 'LOADING',
        payload: loading
    }
}

export const showLoadingAction = (loading) => {

    return (dispatch) => {
        dispatch(showLoadingType(loading))
    }
}


// WEBPACK FOOTER //
// ./src/redux/actions/loadingAction.jsx