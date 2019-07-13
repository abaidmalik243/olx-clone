import React from 'react';
import { connect } from 'react-redux'
class MyAccount extends React.Component {

    render() {
        return (
            <div id="myAcc" className="tab-pane">
                <h3>{this.props.user.name} </h3>
                <h3>{this.props.user.email}</h3>
                {/* <button id="jan" onClick={()=>console.log("working ....")} className="js-push-btn mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">
                    Enable Push Messaging </button> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}
export default connect(mapStateToProps, null)(MyAccount)
