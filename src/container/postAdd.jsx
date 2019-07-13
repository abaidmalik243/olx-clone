import React from 'react'
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom'
import Footer from '../components/footer';
import Axios from 'axios';
import { connect } from 'react-redux'
import postAdDataAction from '../redux/actions/postAdAction'
import { showLoadingAction } from '../redux/actions/loadingAction';
class PostAdd extends React.Component {
    state = {
        img1: '',
        img2: '',
        img3: '',
        img4: '',
    }
    onchange = (event) => {
        event.preventDefault();

        switch (event.target.name) {

            case 'img1':
                if (event.target.files.length === 4) {
                    this.setState({
                        img1: `${event.target.files[0].name}${' , '}
                         ${event.target.files[1].name}${' , '} 
                         ${event.target.files[2].name}${' , '} 
                         ${event.target.files[3].name} `
                    })
                }
                else {
                    alert('Please Attach Four Files')
                    this.setState({ img1: '' })
                }
                break;
            // case 'img2':
            //     this.setState({ img2: event.target.files[0].name })
            //     break;
            // case 'img3':
            //     this.setState({ img3: event.target.files[0].name })
            //     break;
            // case 'img4':
            //     this.setState({ img4: event.target.files[0].name })
            //     break;

            default:
                break;
        }


    }

    submit = (event) => {
        event.preventDefault();
        this.props.showLoadingAction(true)
        var form = document.getElementById('postad')
        var formData = new FormData(form);

        formData.append('id', this.props.id)
        // debugger;
        Axios.post('/postadd', formData)
            .then((response) => {
                this.props.showLoadingAction(false)
                this.props.postAdDataAction(response.data)
                alert("Your Post Has Been Added")
            })
            .catch((err) => {
                this.props.showLoadingAction(false)
                alert(err)
            })
    }
    componentDidMount() {
        window.scrollTo(0, 0)
    }
    render() {
        return (
            <div>
                <div className="container" >
                    <Navbar />

                    <nav >
                        <ol className="breadcrumb" >
                            <li className="breadcrumb-item" > <Link to="/">Home</Link> </li>
                            <li className="breadcrumb-item active" >PostAd </li>

                        </ol>
                    </nav>
                    <form action="" onSubmit={this.submit} id="postad" >
                        <div className="card" >
                            <div className="card-header">Submit an Ad</div>
                            <div className="card-body px-5" >
                                <div className="form-group" >
                                    <label htmlFor="addtitle">Add Title</label>
                                    <input id="addtitle" name="addtitle" className="form-control" type="text" required />
                                </div>

                                <div className="form-group" >
                                    <label htmlFor="category">Select Category</label>
                                    <select name="category" className="form-control" id="category" required>
                                        <option value="">Select</option>

                                        <option value="All">All</option>
                                        <option value="Mobile">Mobile</option>
                                        <option value="Labtop">Labtop</option>
                                        <option value="Bike">Bike</option>
                                        <option value="Vehicles">Vehicles</option>

                                    </select>
                                </div>

                                <div className="form-group" >
                                    <label htmlFor="model">Model</label>
                                    <input id="model" name="model" className="form-control" type="text" required />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="category">Condition</label>
                                    <select name="condition" className="form-control" id="category" required>
                                        <option value="">Select</option>
                                        <option value="New">New</option>
                                        <option value="Used">Used</option>



                                    </select>
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="price">Price</label>
                                    <input id="price" name="price" className="form-control" type="text" required />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="description">Description</label>

                                    <textarea id="description" name="description" className="form-control" type="text" required />
                                </div>
                                <div className="custom-file mb-3" >

                                    <input type="file" className="custom-file-input" onChange={this.onchange} name="img1" id="img1" multiple required />
                                    <label htmlFor="img1" className="custom-file-label" >{this.state.img1}</label>
                                </div>
                                {/* <div className="custom-file mb-3" >
                                    <input type="file" className="custom-file-input" onChange={this.onchange} name="img2" id="img2" required />
                                    <label htmlFor="img2" className="custom-file-label" >{this.state.img2}</label>
                                </div>
                                <div className="custom-file mb-3" >
                                    <input type="file" className="custom-file-input" onChange={this.onchange} name="img3" id="img3" required />
                                    <label htmlFor="img3" className="custom-file-label" >{this.state.img3}</label>
                                </div>
                                <div className="custom-file mb-3" >
                                    <input type="file" className="custom-file-input" onChange={this.onchange} name="img4" id="img4" required />
                                    <label htmlFor="img4" className="custom-file-label" >{this.state.img4}</label>
                                </div> */}
                                <hr />
                                <h5>Your Contact Detail</h5>
                                <div className="form-group" >
                                    <label htmlFor="Name">Name</label>
                                    <input id="Name" name="Name" className="form-control" type="text" required />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="phoneNumber">Phone Number</label>
                                    <input id="phoneNumber" name="phoneNumber" className="form-control" type="text" required />
                                </div>
                                <div className="form-group" >
                                    <label htmlFor="City">City</label>
                                    <input id="City" name="City" className="form-control" type="text" required />
                                </div>
                                <p className="text-right" ><button className="btn btn-warning px-5 olx-btn" type="submit">Submit</button></p>
                            </div>

                        </div>
                    </form>
                </div>

                <hr className="my-5" />
                <Footer />
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state)
    return {

        id: state.auth.user._id
    }
}
export default connect(
    mapStateToProps,
    {
        postAdDataAction,
        showLoadingAction
    })(PostAdd);


// WEBPACK FOOTER //
// ./src/container/postAdd.jsx