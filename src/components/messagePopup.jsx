import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Popup extends React.Component {
    state = {
        userID: this.props.userID,
        postID: this.props.postID,
        name: '',
        contact: '',
        message: '',
        errors: {}



    }

    handleValidation() {
        let fields = this.state;
        let errors = {};
        let formIsValid = true;



        //Password
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = "Name Cannot be empty";
        }
        if (typeof fields["name"] !== "undefined") {
            if (!fields["name"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["name"] = "You Can Enter Only letters";
            }
        }


        if (!fields["contact"]) {
            formIsValid = false;
            errors["contact"] = "Contact info Cannot be empty";
        }

        if (typeof fields["contact"] !== "undefined") {
            if (fields["contact"].length !== 11) {
                formIsValid = false;
                errors["contact"] = "Contact Detail is Not Valid";
            }
        }
        if (!fields["message"]) {
            formIsValid = false;
            errors["message"] = "Messge Cannot be empty";
        }

        if (typeof fields["message"] !== "undefined") {
            if (fields["message"].length < 20) {
                formIsValid = false;
                errors["message"] = "Text Length of Messge Must Be Greater Than 20";
            }
        }



        this.setState({ errors: errors });
        return formIsValid;
    }
    // componentDidMount() {
    //     console.log('user id', this.props.id)
    // }
    onchange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value.trim() })
        console.log(this.state)
    }
    onsubmit = (event) => {

        event.preventDefault();
        if (this.handleValidation()) {

            Axios.post('/saveMessage', this.state)
                .then((response) => {
                    alert(response.data)
                })
                .catch((err) => {
                    alert(err)
                })

        } else {
            alert("Form has errors.")
        }


    }
    render() {
        return (
            <div className="popup" >
                <div className="inner-popup">
                    <div className="p-5">
                        <h4>Message</h4>
                        <form onSubmit={this.onsubmit} >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" name="name" required onChange={this.onchange} className="form-control" />

                                <span style={{ color: "red" }}>{this.state.errors["name"]}</span>

                            </div>
                            <div className="form-group">
                                <label htmlFor="contact">Contact</label>
                                <input type="text" id="c" name="contact" required onChange={this.onchange} className="form-control" />

                                <span style={{ color: "red" }}>{this.state.errors["contact"]}</span>

                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea name="message" id="message" required onChange={this.onchange} className="form-control" ></textarea>

                                <span style={{ color: "red" }}>{this.state.errors["message"]}</span>

                            </div>

                            <div className="form-group">
                                <button className="btn btn-warning m-2" type="submit">Send Message</button>
                                <button className="btn btn-warning m-2" onClick={this.props.click}> Close</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {

    return {
        userID: state.auth.user.id
    }
}
export default connect(mapStateToProps, null)(Popup);
