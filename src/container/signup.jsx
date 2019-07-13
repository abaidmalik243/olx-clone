import React from 'react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom'

import { singupAction } from '../redux/actions/loginAction'
import { connect } from 'react-redux'
class Signup extends React.Component {
    state = {
        name: '',
        email: '',
        password: '',
        errors: {}
    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Name Cannot be empty";
        }

        //Password
        if (!fields["password"]) {
            formIsValid = false;
            errors["password"] = "Password Cannot be empty";
        }

        if (typeof fields["password"] !== "undefined") {
            if (fields["password"].length < 6) {
                formIsValid = false;
                errors["password"] = "Password Length Must be 6";
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = "Email Cannot be empty";
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = "Email is not valid";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    signup = (event) => {
        event.preventDefault();
        if (this.handleValidation()) {
            this.props.singupAction(this.state, this.props.history)
        } else {
            alert("Please Check Following Errors...")
        }

    }
    onchange = (event) => {
        event.preventDefault();
        let errors = Object.assign({}, this.state.errors, { [event.target.name]: '' })
        this.setState({ [event.target.name]: event.target.value, errors })
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Navbar />
                    <div className="card mt-5" >
                        <p className="p-3" >Signup</p>

                        <form action="" onSubmit={this.signup} className="p-5" >
                            <div className="form-group" >
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control" onChange={this.onchange} name="name" id="name" />
                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" onChange={this.onchange} name="email" id="email" />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>
                            <div className="form-group" >
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" onChange={this.onchange} name="password" id="password" />
                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>

                            </div>

                            <input type="submit" className="btn btn-primary px-5 align-self-center" value="Signup" />

                        </form>

                        <div className="card-footer" >If Your Already Account Please  <Link to="/login">Login</Link> </div>
                    </div>

                </div>
                <hr className="my-5" />
                <Footer />
            </div>
        )
    }
}
export default connect(null, { singupAction })(Signup)


// WEBPACK FOOTER //
// ./src/container/signup.jsx