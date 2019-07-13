import React from 'react';
import { Link } from 'react-router-dom'
import Navbar from './navbar'
import MyAccount from './myAccount';
import Footer from './footer'
import UserPost from './userPost';
import FavoriteList from './favorlist';

import { connect } from 'react-redux'
class Dashbord extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {

        return (
            <div>
                <div className="container">
                    <Navbar />
                    <nav>
                        <ol className="breadcrumb" >
                            <li className="breadcrumb-item" > <Link to="/">Home</Link> </li>
                            <li className="breadcrumb-item active" >Dashbord </li>

                        </ol>
                    </nav>
                    <div className="card mt-3"  >
                        <div className="row m-3" >

                            <div className="col-sm-3 col-md-3" >
                                <div className="nav flex-column">

                                    <a className="nav-link" data-toggle="pill" href="#myAcc"><i className="fa fa-user-circle" ></i> My Account</a>

                                    <div className="dropdown-divider"></div>

                                    <Link className="nav-link" to="/postadd"><i className="fas fa-plus-circle"></i>  Post Ad</Link>

                                    <div className="dropdown-divider"></div>


                                    <a className="nav-link" data-toggle="pill" href="#userpost"><i className="fas fa-list-ul"></i> Your Ad List</a>

                                    <div className="dropdown-divider"></div>



                                    <a className="nav-link" data-toggle="pill" href="#favorite"><i className="fas fa-heart"></i>  Your Favorit Post </a>


                                </div>
                            </div>

                            <div className="col-sm-9 col-md-9 mt-5" >
                                <div className="tab-content" id="v-pills-tabContent" style={{ maxHeight: 260, overflowY: 'auto' }} >

                                    <MyAccount />
                                    <UserPost />
                                    <FavoriteList />

                                </div>
                            </div>
                        </div>

                    </div>

                </div>
                <hr className="my-5" />
                <Footer />
            </div >
        )
    }
}
const getState = (state) => {

    return {
        auth: state.auth.isAuthenticated,

    }
}
export default connect(getState, null)(Dashbord)
