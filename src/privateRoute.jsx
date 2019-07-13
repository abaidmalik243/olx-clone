
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
class PrivateRoute extends Component {

    render() {
        const Component = this.props.component;

        return (

            <Route component={(props) =>
                this.props.auth ? (<div><Component {...props} /></div>)
                    : (
                        <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                    )
            } />

        );
    }
}
const getState = (state) => {

    return {
        auth: state.auth.isAuthenticated,

    }
}
export default connect(getState, null)(PrivateRoute);
