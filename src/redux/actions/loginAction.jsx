import axios from 'axios'
// import setAuthorization from '../util/setAuthorizationToken'
// import jwt from 'jsonwebtoken'
// import { Redirect } from 'react-router-dom'
// import React from 'react'
export function setCurrentUser(user) {

    return {
        type: 'SET_CURRENT_USER',
        user

    }
}

export function logout() {
    return dispatch => {
        return axios.get('/logout').then((data) => {
            dispatch(setCurrentUser({}));

        })
            .catch((err) => {

            })
        // localStorage.removeItem('jwtToken')
        // setAuthorization(false);

    }
}
export function singupAction(userData, history) {
    return (dispatch) => {

        return axios.post('/signup', userData)
            .then((response) => {

                // const token = response.data;
                // localStorage.setItem('jwtToken', token);
                // setAuthorization(token);
                // const user = jwt.decode(token);
                // console.log('user', user)

                // dispatch(setCurrentUser(response.data.user))

                alert(response.data)

                history.push('/login')

            })
            .catch((err) => {
                alert(err.message)
            })
    }
}
export function loginAction(userData) {
    return (dispatch) => {
        return axios.post('/login', userData).then((res) => {

            // const token = res.data.token;

            // localStorage.setItem('jwtToken', token)
            // setAuthorization(token)

            // const user = jwt.decode(token);
            // console.log("mobeen account", user)
            // localStorage.setItem('id', user.id)

            dispatch(setCurrentUser(res.data))

            alert('Welcom ' + res.data.name)
        })
            .catch((err) => {
                dispatch(setCurrentUser({}));
                alert(err.message)

            })
    }
}


// export function loginAction(userData) {
//     return (dispatch) => {


//         fetch('/login')


//         return fetch.post('/login', userData).then((res) => {

//             const token = res.data.token;

//             localStorage.setItem('jwtToken', token)
//             // setAuthorization(token)

//             const user = jwt.decode(token);

//             dispatch(setCurrentUser(user))

//             alert('Welcom ' + user.name)
//         })
//             .catch((err) => {

//                 alert(err.message)

//             })
//     }
// }



// WEBPACK FOOTER //
// ./src/redux/actions/loginAction.jsx