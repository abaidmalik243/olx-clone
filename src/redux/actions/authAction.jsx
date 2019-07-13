const authAction = (data) => {

    return {

        type: 'SET_CURRENT_USER', user: data

    }
}



export const authActionFN = (user) => {

    return (dispatch, getState) => {


        // axios.post('/check')
        //     .then(response => response.data)
        //     .then(data => {

        dispatch(authAction(user))
        //     setState({ isLoaded: true })
        // // })
        // .catch(error => {
        //     // window.notify("Error is Occured")
        //     // alert("Error ", error)
        //     setState({ isLoaded: true })
        // })

    }

}


// WEBPACK FOOTER //
// ./src/redux/actions/authAction.jsx