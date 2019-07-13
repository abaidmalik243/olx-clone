
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
class AuthPrivateRoute extends Component {


    render() {
        const Component = this.props.component;

        return (

            <Route render={(props) =>
                this.props.auth ? (<div>   <Redirect to={{ pathname: "/dashboard", state: { from: props.location } }} />
                </div>)
                    : (<div>

                        <Component {...props} />

                    </div>
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
export default connect(getState, null)(AuthPrivateRoute);
