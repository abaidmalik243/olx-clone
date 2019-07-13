import React from 'react';
import { BrowserRouter as Router, Route, Switch, HashRouter } from 'react-router-dom'
import Home from './components/Home';
import Login from './container/login'
import PostAdd from './container/postAdd'
import PostDetail from './components/postDetail'
import Signup from './container/signup'
import Dashbord from './components/Dashboard'
import PrivateRoute from './privateRoute'
import AuthPrivateRoute from './authPrivateRoute'
import { Loader } from './container/loader'
import { authActionFN } from './redux/actions/authAction'
import { connect } from 'react-redux'
import axios from 'axios'
class App1 extends React.Component {
    state = {
        isLoaded: false
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        var a = document.getElementById('loader-icon');
        // this.props.authActionFN(this.setState)
        axios.post('/check')
            .then(response => response.data)
            .then(data => {

                // dispatch(authAction(data.user))
                a.className = '';
                a.style.display = 'none';
                this.props.authActionFN(data.user)
                this.setState({ isLoaded: true })

            })
            .catch(error => {
                // window.notify("Error is Occured")
                // alert("Error ", error)
                a.className = '';
                a.style.display = 'none';
                this.props.authActionFN({})
                this.setState({ isLoaded: true })
            })

    }
    render() {
        return (
            <Router>
                <HashRouter>
                    {this.state.isLoaded ?
                        <div>

                            <Switch>
                                <Route exact={true} path='/' component={Home} />

                                <AuthPrivateRoute exact={true} path="/login" component={Login} />
                                <PrivateRoute exact={true} path="/dashboard" component={Dashbord} />
                                <PrivateRoute exact={true} path="/postadd" component={PostAdd} />
                                <Route exact={true} path="/postDescription/:data" component={PostDetail} />
                                <AuthPrivateRoute exact={true} path='/signup' component={Signup} />


                            </Switch>
                            {this.props.isLoading ? <Loader /> : ''}

                        </div>
                        : ''}
                </HashRouter>
            </Router>
        )
    }
}
const MapStateToProps = (state) => {
    return {
        isLoading: state.loading.isLoading
    }
}

export default connect(MapStateToProps, { authActionFN })(App1)