import React from 'react'
import { Link } from 'react-router-dom'
import { logout } from '../redux/actions/loginAction'
import { connect } from 'react-redux'
class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">
                    <img src="/images/OLX-Logo.png" className="img-fluid pr-4" width={100} alt="" />
                    Pakistan Larget Marketplace
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" style={{ background: 'black !important' }} ></span>
                </button>

                <div className="collapse navbar-collapse " id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">

                    </ul>
                    <ul className="navbar-nav">

                        {this.props.isAuthenticated.isAuthenticated ? <li className="nav-item dropdown m-2">
                            <button className="nav-link dropdown-toggle border" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fa fa-user" ></i> {this.props.isAuthenticated.user.name ? this.props.isAuthenticated.user.name : ' My Account'}
                            </button>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <a className="dropdown-item">{this.props.isAuthenticated.user.name}</a>
                                <a className="dropdown-item">{this.props.isAuthenticated.user.email}</a>
                                <Link className="dropdown-item" to="/dashboard" replace >Dashboard</Link>

                                <a className="dropdown-item" href="/" onClick={this.props.logout} >Logout</a>

                                <div className="dropdown-divider"></div>

                            </div>

                        </li>

                            : <li className="nav-item m-2">
                                <Link to="/login" replace className="nav-link btn-warning px-4 rounded olx-btn">
                                    <i className="fa fa-user" ></i>  My Account
                                </Link>
                            </li>
                        }
                        {this.props.isAuthenticated.isAuthenticated ?
                            <li className="nav-item m-2">
                                <Link to="/postadd" replace className="nav-link btn-warning px-4 rounded olx-btn">
                                    Post an Ad</Link> </li>
                            : ''
                        }


                    </ul>

                </div>
            </nav>
        )
    }
}
const mapStateToProps = (state) => {

    return { isAuthenticated: state.auth }
}

export default connect(mapStateToProps, { logout })(Navbar)
