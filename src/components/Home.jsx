import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Navbar from './navbar'
import Footer from './footer'
class Home extends React.Component {

    state = {
        category: '',
        title: '',
        AllPost: [],


    }
    componentDidMount() {
        window.scrollTo(0, 0)
        Axios.get('/allPost')

            .then((result) => {
                this.setState({ AllPost: result.data })

            })
            .catch((err) => {
                alert('An Error Occured' + err);
            })
    }
    onchangeItem = (event) => {

        // console.log(event.target.name)
        // event.preventDefault();
        // this.setState({ [event.target.name]: event.target.value })

        // console.log(this.state.category)
        // var a = this.state.category;
        // setTimeout(function (a) {
        //     console.log('hello')
        // },1000)
        if (event.target.value) {

            Axios.get('/byCategory?category=' + event.target.value)
                .then((response) => {
                    this.setState({ AllPost: response.data })
                })
                .catch((err) => {
                    alert(err)
                })
        }
    }
    onchange = (event) => {

        console.log(event.target.name)
        event.preventDefault();
        this.setState({ title: event.target.value })

        console.log(this.state.category)
        // var a = this.state.category;
        // setTimeout(function (a) {
        //     console.log('hello')
        // },1000)

    }
    onsubmit = (event) => {
        event.preventDefault();
        Axios.get('/byAddTitle?title=' + this.state.title.toUpperCase())
            .then((response) => {
                this.setState({ AllPost: response.data })
            })
            .catch((err) => {
                alert(err)
            })
    }
    render() {
        return (
            <div>
                <div className="container" id="areaImage">
                    <Navbar />
                    <nav >
                        <ol className="breadcrumb" >
                            <li className="breadcrumb-item active" >Home </li>
                        </ol>
                    </nav>
                    <div className="row" >
                        <div className="col-sm-6 col-md-6" >
                            <div className="form-group" >
                                <label htmlFor="category">Search Products By Category</label>
                                <select name="category" onChange={this.onchangeItem} className="form-control" id="category">
                                    <option value="">Select</option>

                                    <option value="All">All</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Labtop">Labtop</option>
                                    <option value="Bike">Bike</option>
                                    <option value="Vehicles">Vehicles</option>

                                </select>

                            </div>
                        </div>

                        <div className="col-sm-6 col-md-6" >
                            <div className="form-group" >
                                <form action="" onSubmit={this.onsubmit} >
                                    <label htmlFor="name" >Search Products by Specfic Name</label>
                                    <input id="name" name="name" onChange={this.onchange} className="form-control" type="text" />
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="container py-3" style={{ background: '#f8f8f7' }} >
                        <h5>Display All Ads
                        </h5>
                        <span className="text-muted" >we found {this.state.AllPost.length} items</span>
                        {this.state.AllPost.length > 0 ? this.state.AllPost.map((data) =>
                            <div className="row border m-2 hello" key={data._id} style={{ overflow: 'hidden' }} >
                                <div className="col-sm-2 p-4" >
                                    <Link to={"/postDescription/" + data._id}>
                                        <img className="img-fluid image-ad"
                                            src={data.imageList[0]} alt="" />
                                    </Link>
                                </div>
                                <div className="col-sm-8 p-4">
                                    <ul className="list-unstyled">
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
                                </div>
                            </div>
                        ) : <h1 style={{ textAlign: 'center' }}>No Record</h1>}
                    </div>
                    {/* <div className="col-sm-6">

                        <Link to="/channabChock"><img className="img-circle" style={{ width: "60%", height: '40%' }} src="../images/chanabChock.jpg" />
                            <h3>Chanab Chock</h3>
                        </Link>
                    </div> */}



                    <hr className="my-5" />
                    <Footer />
                </div>
            </div>
        )
    }
}

export default Home;