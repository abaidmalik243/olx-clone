import React from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { connect } from 'react-redux'
import Messages from '../container/message'

class UserPost extends React.Component {

    state = {
        AllPost: [],
        showMessages: false,
        postID: ''
    }
    componentDidMount() {

        Axios.get(`/allUserPost?id=${this.props.id}`)
            .then((result) => {
                this.setState({ AllPost: result.data })
            })
            .catch((err) => {
                alert('An Error Occured' + err);
            })
    }
    showMessageToggle = (data) => {
        this.setState({ showMessages: !this.state.showMessages, postID: data })

    }
    deletePost = (postID) => {
        Axios.post('/deletePost', { postID })
            .then((response) => {
                var newList = this.state.AllPost.filter(function (ad) {
                    return ad._id !== postID
                })
                this.setState({ AllPost: newList })
            })
            .catch((err) => {
                alert(err)
            })
    }
    render() {
        return (
            <div id="userpost" className="tab-pane">
                <h4 className="text-center"> Your Posts </h4>

                {this.state.AllPost.length > 0 ? this.state.AllPost.map((data) =>
                    <div className="row border m-2" key={data._id}>
                        <div className="col-2 p-2" >
                            <Link to={"/postDescription/" + data._id}>
                                <img className="img-fluid"
                                    src={data.imageList[0]} alt="" />
                            </Link>
                        </div>
                        <div className="col-10 p-2">
                            <ul className="list-unstyled" >
                                <li style={{ fontWeight: 'bold', fontSize: 20 }} >
                                    <Link to={"/postDescription/" + data._id}>    {data.addTitle}</Link>

                                </li>
                                <li>
                                    <span className="pr-2" >Category</span>{data.catagory}
                                </li>
                                <li>
                                    <span className="pr-2" >Rs</span>{data.price}
                                </li>

                            </ul>

                            <button className="btn btn-primary" onClick={() => this.showMessageToggle(data._id)} ><i className="fas fa-comment px-2"></i>Show Message</button>
                            <button className="btn btn-danger mx-2" onClick={() => this.deletePost(data._id)} ><i className="fas fa-trash px-2"></i>Delete Post</button>

                        </div>
                    </div>
                ) : <h1 style={{ textAlign: 'center' }}>No Record</h1>}
                {this.state.showMessages ? <Messages postID={this.state.postID} click={this.showMessageToggle} /> : null}
            </div>
        )
    }
}
const mapStateToprops = (state) => {
    // console.log('find', state)
    return {
        id: state.auth.user._id
    }
}
export default connect(mapStateToprops, null)(UserPost)