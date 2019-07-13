import React from 'react'
import Navbar from './navbar';
import Footer from './footer';
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Popup from './messagePopup';
import { connect } from 'react-redux'

class PostDetail extends React.Component {
    state = {
        dataDescription: {
            addTitle: '',
            catagory: '',
            model: '',
            condition: '',
            price: '',
            destination: '',
            imageList: [],
            name: '',
            phone: '',
            city: '',
            _id: '',
            userID: { _id: '', singupDate: '' },
            postDate: ''
        },
        showPopup: false,
        fvt: false,
    }
    showPopupFN = () => {
        this.setState({ showPopup: !this.state.showPopup })
    }
    componentDidMount() {
        window.scrollTo(0, 0)
        Axios.get('/detailDescription?id=' + this.props.match.params.data)
            .then((response) => {
                //   console.log("desctpiion",response.data)

                this.setState({ dataDescription: response.data })
                //  console.log(this.state.dataDescription)
                {
                    this.props.auth ? Axios.post('/getfavorite',
                        {
                            userID: this.props.user,
                            postID: this.state.dataDescription._id
                        })
                        .then((response) => {
                            // console.log(response.data)
                            this.setState({ fvt: response.data })
                            //console.log(this.state.fvt)
                        })
                        : ''
                }

            })
            .catch((err) => {
                alert(err);
                //this.props.history.push('/')

            })
    }
    saveFavorite = (userID, postID) => {
        // console.log("user " + userID, " postid " + postID)
        Axios.post('/favorite', { userID, postID })
            .then((response) => {

                this.setState({ fvt: response.data })
            })
            .catch((err) => {
                console.log(err.message)
            })
    }
    render() {
        return (
            <div>
                <div className="container" >
                    <Navbar />
                    <nav >
                        <ol className="breadcrumb" >
                            <li className="breadcrumb-item" > <Link to="/">Home</Link> </li>
                            <li className="breadcrumb-item active" >Post Description </li>

                        </ol>
                    </nav>
                    <div className="row">

                        <div className="col-sm-12 col-md-9">
                            <div className="card">
                                <div className="card-header" >
                                    <h5>{this.state.dataDescription.addTitle}</h5>

                                    <ul className="list-inline" >

                                        <li className="list-inline-item" ><i className="fa fa-map-pin" >{this.state.dataDescription.city}</i></li>
                                        <li className="list-inline-item" > <span className="text-muted px-2" >|</span></li>
                                        added on {this.state.dataDescription.postDate}. ID {this.state.dataDescription._id}
                                    </ul>
                                </div>

                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        {this.state.dataDescription.imageList && this.state.dataDescription.imageList.length > 0 ? this.state.dataDescription.imageList.map((data, index) => {

                                            return <div key={index} className={index === 0 ? "carousel-item active" : "carousel-item"}>
                                                <img className="d-block mx-auto w-100 img-size px-5 py-2" src={data} alt="First slide" />
                                            </div>
                                        }) : <h1>No Record</h1>}

                                    </div>
                                    {this.state.dataDescription.imageList && this.state.dataDescription.imageList.length > 0 ? <div><a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                            <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                                            <span className="sr-only">Next</span>
                                        </a></div>
                                        : ''}


                                </div>
                                <div className="card-footer">

                                    <div className="row">
                                        <div className="col">
                                            <h5>Category  </h5>
                                            <h5>Condition </h5>

                                            <h5>Price </h5>
                                        </div>
                                        <div className="col">
                                            <h5 className="px-3" >{this.state.dataDescription.catagory}</h5>
                                            <h5 className="px-3">{this.state.dataDescription.condition}</h5>
                                            <h5 className="px-3">{this.state.dataDescription.price}</h5>

                                        </div>

                                        <div className="col"></div>
                                    </div>


                                    <p className="text-justify" >{this.state.dataDescription.destination}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-3">
                            <div className="description-container">
                                <div className="arrow"></div>
                                <div className="bg-warning price">RS {this.state.dataDescription.price}</div>
                            </div>
                            <div className="container">
                                <div className="row p-3" style={{ background: '#f1f5fc' }}  >
                                    <div className="col-3">
                                        <img src="/images/avatar.png" className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-9 pt-2">
                                        <h5>{this.state.dataDescription.name ? this.state.dataDescription.name : ''}</h5>
                                        <p> Active on site since {this.state.dataDescription.userID ? this.state.dataDescription.userID.singupDate : ''}</p>
                                        <Link to="/" >User Ads</Link>

                                    </div>

                                </div>


                                <div className="row mt-3 pt-3 px-3" style={{ background: '#f1f5fc' }}  >
                                    <div className="col-12">
                                        <p>Phone {this.state.dataDescription.phone}</p>
                                    </div>
                                </div>
                                <div className="row mt-3 pt-3" style={{ background: '#f1f5fc' }}  >
                                    <div className="col-12">
                                        <h5 style={{ textAlign: 'center' }} >Safety Tips for Buyers</h5>
                                        <ol>
                                            <li>
                                                Meet seller at a safe location
                                    </li>
                                            <li>
                                                Check the item before you buy
                                    </li>
                                            <li>
                                                Check the item before you buy
                                    </li>

                                        </ol>
                                    </div>
                                </div>


                                {this.state.dataDescription.userID && this.props.user !== this.state.dataDescription.userID._id ? <div className="row mt-3 pt-3">
                                    <div className="col-12 text-center">
                                        <button className="btn btn-outline-primary"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.props.auth ? this.showPopupFN()
                                                    : alert('Please Login First')
                                            }} >
                                            <i className="fab fa-facebook-messenger px-3"></i></button>
                                    </div>
                                    <div className="col-12 mt-3 text-center">
                                        <button className={this.state.fvt ? "btn btn-outline-danger " : "btn btn-outline-success"}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                this.props.auth ? this.saveFavorite(this.props.user, this.state.dataDescription._id)
                                                    : alert('Please Login First')
                                            }}><i className={this.state.fvt ? "fas fa-trash px-3" : "far fa-star px-3"}></i></button>

                                    </div>
                                </div>
                                    : ''}
                            </div>
                        </div>

                    </div>
                </div>
                <hr className="my-5" />
                <Footer />
                {this.state.showPopup ? <Popup postID={this.state.dataDescription._id} click={this.showPopupFN} /> : ''}
            </div>
        )
    }
}
const getState = (state) => {

    return {
        auth: state.auth.isAuthenticated,
        user: state.auth.user,
    }
}
export default connect(getState, null)(PostDetail);
