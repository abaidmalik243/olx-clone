import React from 'react'
import { connect } from 'react-redux'
import Axios from 'axios'
class Messages extends React.Component {
    state = {
        userID: this.props.userID,
        postID: this.props.postID,
        name: '',
        contact: '',
        message: '',
        messageData: [],


    }

    componentDidMount() {

        Axios.get('/showMessage?postID=' + this.props.postID)
            .then((response) => {
                console.log('message response', response.data)
                this.setState({ messageData: response.data })
            })
            .catch((err) => {
                console.log(err)
            })
    }
    onchange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value.trim() })
        console.log(this.state)
    }
    onsubmit = (event) => {

        event.preventDefault();
        Axios.post('/saveMessage', this.state)
            .then((response) => {
                console.log(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    deleteMessage = (data) => {
        console.log('meesageID', data)
        Axios.post('/deleteMessage', { data, postID: this.props.postID })
            .then((response) => {
                this.setState({ messageData: response.data })
            })
            .catch((err) => {
                console.log(err)
            })

    }

    render() {
        return (
            <div className="popup" >
                <div className="inner-popup-message">
                    <div className="p-3">
                        <button className="btn btn-warning" onClick={this.props.click} >close</button>
                        {this.state.messageData.length > 0 ? this.state.messageData.map((data, index) => {

                            return <div key={index} className="card mb-2 p-2 message">
                                <div className="row" >
                                    <div className="col-2" >
                                        <p style={{ fontWeight: "bold" }} >Name </p>
                                        <p style={{ fontWeight: "bold" }}>Contact </p>
                                        <p style={{ fontWeight: "bold" }}>Message </p>
                                    </div>
                                    <div className="col-8">
                                        <p>
                                            {data.name}
                                        </p>
                                        <p>
                                            {data.contact}
                                        </p>
                                        <p>
                                            {data.message}
                                        </p>
                                    </div>
                                    <div className="col-1">
                                        <button className="btn btn-info" onClick={() => this.deleteMessage(data._id)} >Delete</button>
                                    </div>


                                </div>
                            </div>
                        }) : <h5>No Message </h5>}




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
export default connect(mapStateToProps, null)(Messages);


// WEBPACK FOOTER //
// ./src/container/message.jsx