import React from 'react';
import { Link } from 'react-router-dom'
import Axios from 'axios'
import { connect } from 'react-redux'


class FavoriteList extends React.Component {

    state = {
        AllPost: [],
        showMessages: false,
        postID: ''
    }
    componentDidMount() {

        Axios.get(`/favoritlist?id=${this.props.id}`)
            .then((response) => {
                this.setState({ AllPost: response.data })

            })
            .catch((err) => {
                alert('An Error Occured' + err);
            })
    }
    showMessageToggle = (postID) => {
        //this.setState({ showMessages: !this.state.showMessages, postID: data })
        Axios.post('/favoriteRemove', { postID: postID, userID: this.props.id })
            .then((response) => {
                //  console.log(response.data)
                this.setState({ AllPost: response.data })
            })
            .catch((err) => {
                alert(err.message)
            })
        // console.log(data)

    }
    render() {
        return (
            <div id="favorite" className="tab-pane">
                <h4 className="text-center"> Your Favorit Posts </h4>
                {this.state.AllPost.length > 0 ? this.state.AllPost.map((data) =>
                    <div className="row border m-2" key={data.postID._id}>
                        <div className="col-2 p-2" >
                            <Link to={"/postDescription/" + data.postID._id}>
                                <img className="img-fluid"
                                    src={data.postID.imageList[0]} alt="" />
                            </Link>
                        </div>
                        <div className="col-10 p-2">
                            <ul className="list-unstyled" >
                                <li style={{ fontWeight: 'bold', fontSize: 20 }} >
                                    <Link to={"/postDescription/" + data.postID._id}>    {data.postID.addTitle}</Link>

                                </li>
                                <li>
                                    <span className="pr-2" >Category</span>{data.postID.catagory}
                                </li>
                                <li>
                                    <span className="pr-2" >Rs</span>{data.postID.price}
                                </li>

                            </ul>
                            <button className="btn btn-outline-danger px-3" onClick={() => { this.showMessageToggle(data._id) }}><i className="fas fa-trash pr-3"></i>Remove</button>
                        </div>
                    </div>
                ) : <h4 style={{ textAlign: 'center' }}>No Record Favorit List Available</h4>}

            </div>
        )
    }
}
const mapStateToprops = (state) => {
    return {
        id: state.auth.user._id,

    }
}
export default connect(mapStateToprops, null)(FavoriteList)
