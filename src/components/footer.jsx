import React from 'react'
class Footer extends React.Component {
    render() {
        return (
            <footer className="container-fluid footer-background" style={{ minHeight: 200, }} >
                <div className="container">
                    <div className='row' >
                        <div className="col-12 col-sm-2" >
                            <img src="https://avatars0.githubusercontent.com/u/34600819?s=400&v=4" className="img-fluid" width={80} alt="" />
                        </div>
                        <div className="col-6 col-sm-3" >
                            <ul className="list-unstyled" >
                                <li> Ubaid Malik</li>
                                <li>Skype ID: abaidmalik243_1 </li>
                            </ul>
                        </div>
                        <div className="col-6 col-sm-2" >
                            <ul className="list-unstyled" >
                                <li> <a href="#">Terms of Use</a> </li>
                                <li><a href="#">Help & Contact Us</a> </li>

                            </ul>
                        </div>
                        <div className="col-6 col-sm-2" >
                            <ul className="list-unstyled" >
                                <li> <a href="#">Who we are </a> </li>
                                <li><a href="#">Join OLX</a> </li>
                                <li><a href="#">Happy OLXers</a> </li>

                            </ul>
                        </div>
                        <div className="col-6 col-sm-3" >
                            <ul className="list-unstyled" >
                                <li style={{ fontWeight: 'bold' }} >Contact Us</li>
                                <li> <a href="#">help@olx.com.pk</a> </li>
                                <li><a href="#"><h6>080010101 <small> (9:30am to 6:30pm)</small></h6></a> </li>
                                <li><a href="#"><h6>Business Packages <small>(featured ads, advertising)</small></h6></a> </li>
                                <li><a href="#">click here</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}
export default Footer
