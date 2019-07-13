import React from 'react'
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import { Link } from 'react-router-dom'
import { loginAction } from '../redux/actions/loginAction'
import { connect } from 'react-redux'
class Login extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {},
    }
    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;

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




        this.setState({ errors: errors });
        return formIsValid;
    }

    onchange = (event) => {


        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value })

    }
    login = (event) => {

        event.preventDefault();

        if (this.handleValidation()) {

            this.props.loginAction(this.state)
            // window.location.reload();
        } else {
            alert("Please Check Following Errors...")
        }


    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <Navbar />
                    <div className="card mt-5" >
                        <p className="p-3" >Login</p>

                        <form action="" className="p-5" onSubmit={this.login} >
                            <div className="form-group" >
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" onChange={this.onchange} name="email" id="email" required />
                                <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                            </div>

                            <div className="form-group" >
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" onChange={this.onchange} name="password" id="password" required />
                                <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                            </div>

                            <input type="submit" className="btn btn-primary px-5 align-self-center" value="Login" />

                        </form>


                        <div className="card-footer" > <Link to="/signup">Create Account</Link> </div>
                    </div>

                </div>
                <hr className="my-5" />
                <Footer />
            </div>
        )
    }
}
export default connect(null, { loginAction })(Login)


// WEBPACK FOOTER //
// ./src/container/login.jsx