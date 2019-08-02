import React from 'react';
import './css/bootstrap.min.css'
import './css/owl.carousel.min.css'
import './css/style.css'
import './css/themify-icons.css'
import logo from './images/logo.png'
import iphonex from './images/iphonex.png'
import clientLogos from './images/client-logos.png'
import perspective from './images/perspective.png'
import graphic from './images/graphic.png'
import dualphone from './images/dualphone.png'
import client from './images/client.png'
import screen1 from './images/screen1.png'
import screen2 from './images/screen2.png'
import screen3 from './images/screen3.png'
import screen4 from './images/screen4.png'
import appleicon from './images/appleicon.png'
import playicon from './images/playicon.png'

import themify from './fonts/themify.svg'


class LandingPage extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {};
      }
    render(){

    return(
        <div>
            {/* <!-- Nav Menu --> */}

            <div className="nav-menu fixed-top">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="navbar navbar-dark navbar-expand-lg">
                                <a className="navbar-brand" href="/login"><img src={logo} className="img-fluid logo-img" alt="logo"/></a> <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation"> <span className="navbar-toggler-icon"></span> </button>
                                <div className="collapse navbar-collapse" id="navbar">
                                    <ul className="navbar-nav ml-auto">
                                        <li className="nav-item"> <a className="nav-link active" href="#home">HOME <span className="sr-only">(current)</span></a> </li>
                                        <li className="nav-item"> <a className="nav-link" href="#features">FEATURES</a> </li>
                                        <li className="nav-item"> <a className="nav-link" href="#gallery">GALLERY</a> </li>
                                        <li className="nav-item"> <a className="nav-link" href="#pricing">PRICING</a> </li>
                                        <li className="nav-item"> <a className="nav-link" href="#contact">CONTACT</a> </li>
                                        <li className="nav-item"><a href="/login" className="btn btn-outline-light my-3 my-sm-0 ml-lg-3">Download</a></li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>

            <div className="landing-header bg-gradient" id="home">
                <div className="container mt-5">
                    <h1>RentMe </h1>
                    <p className="tagline">The one and only solution for your property managment needs.</p>
                    <div className="cyc">
                    <div className="box">Better
                        <div className="words">
                            <span className="spn">communication.</span>
                            <span className="spn">document tracking.</span>
                            <span className="spn">property management.</span>
                            <span className="spn">experience.</span>
                        </div>
                    </div>  
                    </div>
                </div>
                <div className="img-holder mt-3"><img src={iphonex} alt="phone" className="img-fluid"/></div>
            </div>

            <div className="client-logos my-5">
                <div className="container text-center">
                    <img src={clientLogos} alt="client logos" className="img-fluid"/>
                </div>
            </div>

            <div className="section light-bg" id="features">


                <div className="container">

                    <div className="section-title">
                        <small>HIGHLIGHTS</small>
                        <h3>Features you love</h3>
                    </div>


                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <div className="card features">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="ti-face-smile gradient-fill ti-3x mr-3"></span>
                                        <div className="media-body">
                                            <h4 className="card-title">Simple</h4>
                                            <p className="card-text">Built for the Busy owner that you are. Our team offers a clearer user interface. removing unnessisary clutter</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="card features">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="ti-settings gradient-fill ti-3x mr-3"></span>
                                        <div className="media-body">
                                            <h4 className="card-title">Intuitive</h4>
                                            <p className="card-text">Your dashboard shows you what you need to see when you need to see it. cutting down on diggin through piles of paperwork. or spend hours flipping through pages trying to find what you need </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-4">
                            <div className="card features">
                                <div className="card-body">
                                    <div className="media">
                                        <span className="ti-lock gradient-fill ti-3x mr-3"></span>
                                        <div className="media-body">
                                            <h4 className="card-title">Secure</h4>
                                            <p className="card-text">Using the latest Authentication practices you can be gauranteed your information is in good hands. </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>



            </div>
            {/* <!-- // end .section --> */}
            <div className="section">

                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 offset-lg-6">
                            <div className="box-icon"><span className="ti-mobile gradient-fill ti-3x"></span></div>
                            <h2>Discover our App</h2>
                            <p className="mb-4">To learn more about the project check it out here</p>
                            <a href="/login" className="btn btn-primary">Sign In</a>
                        </div>
                    </div>
                    <div className="perspective-phone">
                        <img src={perspective} alt="perspective phone" className="img-fluid"/>
                    </div>
                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section light-bg">
                <div className="container">
                    <div className="section-title">
                        <small>FEATURES</small>
                        <h3>Do more with our app</h3>
                    </div>

                    <ul className="nav nav-tabs nav-justified" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link active" data-toggle="tab" href="#communication">Communication</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#schedule">Scheduling</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#messages">Messages</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#livechat">Live Chat</a>
                        </li> */}
                    </ul>
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="communication">
                            <div className="d-flex flex-column flex-lg-row">
                                <img src={graphic} alt="graphic" className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"/>
                                <div>

                                    <h2>Communicate with ease</h2>
                                    <p className="lead">Uniquely underwhelm premium outsourcing with proactive leadership skills. </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                                        congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem placerat volutpat. Praesent quis facilisis elit. Sed condimentum neque quis ex porttitor,
                                    </p>
                                    <p> malesuada faucibus augue aliquet. Sed elit est, eleifend sed dapibus a, semper a eros. Vestibulum blandit vulputate pharetra. Phasellus lobortis leo a nisl euismod, eu faucibus justo sollicitudin. Mauris consectetur, tortor
                                        sed tempor malesuada, sem nunc porta augue, in dictum arcu tortor id turpis. Proin aliquet vulputate aliquam.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="schedule">
                            <div className="d-flex flex-column flex-lg-row">
                                <div>
                                    <h2>Scheduling when you want</h2>
                                    <p className="lead">Uniquely underwhelm premium outsourcing with proactive leadership skills. </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                                        congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem placerat volutpat. Praesent quis facilisis elit. Sed condimentum neque quis ex porttitor,
                                    </p>
                                    <p> malesuada faucibus augue aliquet. Sed elit est, eleifend sed dapibus a, semper a eros. Vestibulum blandit vulputate pharetra. Phasellus lobortis leo a nisl euismod, eu faucibus justo sollicitudin. Mauris consectetur, tortor
                                        sed tempor malesuada, sem nunc porta augue, in dictum arcu tortor id turpis. Proin aliquet vulputate aliquam.
                                    </p>
                                </div>
                                <img src={graphic} alt="graphic" className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"/>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="messages">
                            <div className="d-flex flex-column flex-lg-row">
                                <img src={graphic} alt="graphic" className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"/>
                                <div>
                                    <h2>Realtime Messaging service</h2>
                                    <p className="lead">Uniquely underwhelm premium outsourcing with proactive leadership skills. </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                                        congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem placerat volutpat. Praesent quis facilisis elit. Sed condimentum neque quis ex porttitor,
                                    </p>
                                    <p> malesuada faucibus augue aliquet. Sed elit est, eleifend sed dapibus a, semper a eros. Vestibulum blandit vulputate pharetra. Phasellus lobortis leo a nisl euismod, eu faucibus justo sollicitudin. Mauris consectetur, tortor
                                        sed tempor malesuada, sem nunc porta augue, in dictum arcu tortor id turpis. Proin aliquet vulputate aliquam.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="livechat">
                            <div className="d-flex flex-column flex-lg-row">
                                <div>
                                    <h2>Live chat when you needed</h2>
                                    <p className="lead">Uniquely underwhelm premium outsourcing with proactive leadership skills. </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. Ut placerat dui eu nulla
                                        congue tincidunt ac a nibh. Mauris accumsan pulvinar lorem placerat volutpat. Praesent quis facilisis elit. Sed condimentum neque quis ex porttitor,
                                    </p>
                                    <p> malesuada faucibus augue aliquet. Sed elit est, eleifend sed dapibus a, semper a eros. Vestibulum blandit vulputate pharetra. Phasellus lobortis leo a nisl euismod, eu faucibus justo sollicitudin. Mauris consectetur, tortor
                                        sed tempor malesuada, sem nunc porta augue, in dictum arcu tortor id turpis. Proin aliquet vulputate aliquam.
                                    </p>
                                </div>
                                <img src={graphic} alt="graphic" className="img-fluid rounded align-self-start mr-lg-5 mb-5 mb-lg-0"/>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            {/* <!-- // end .section --> */}

            <div className="section">

                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <img src={dualphone} alt="dual phone" className="img-fluid"/>
                        </div>
                        <div className="col-md-6 d-flex align-items-center">
                            <div>
                                <div className="box-icon"><span className="ti-rocket gradient-fill ti-3x"></span></div>
                                <h2>Get Started</h2>
                                <p className="mb-4">A better property managemnt experience is just a click away, and sign-up is simple with Google or Facebook</p>
                                <a href="/login" className="btn btn-primary">Sign Up</a></div>
                        </div>
                    </div>

                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section light-bg">

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 d-flex align-items-center">
                            <ul className="list-unstyled ui-steps">
                                <li className="media">
                                    <div className="circle-icon mr-4">1</div>
                                    <div className="media-body">
                                        <h5>Create an Account</h5>
                                        <p>Just sign in via Google Facebook or email with password.  </p>
                                    </div>
                                </li>
                                <li className="media my-4">
                                    <div className="circle-icon mr-4">2</div>
                                    <div className="media-body">
                                        <h5>Share with friends</h5>
                                        <p>Property managment's never been easier with Rent Me. </p>
                                    </div>
                                </li>
                                <li className="media">
                                    <div className="circle-icon mr-4">3</div>
                                    <div className="media-body">
                                        <h5>Enjoy your life</h5>
                                        <p>Easily manage your properties and cut down on the back and forth comunication when setting up work orders.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <img src={iphonex} alt="iphone" className="img-fluid"/>
                        </div>

                    </div>

                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section">
                <div className="container">
                    <div className="section-title">
                        <small>TESTIMONIALS</small>
                        <h3>What our Customers Says</h3>
                    </div>

                    <div className="testimonials owl-carousel">
                        <div className="testimonials-single">
                            <img src={client} alt="client" className="client-img"/>
                            <blockquote className="blockquote">Uniquely streamline highly efficient scenarios and 24/7 initiatives. Conveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.</blockquote>
                            <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                            <p className="text-primary">United States</p>
                        </div>
                        <div className="testimonials-single">
                            <img src={client} alt="client" className="client-img"/>
                            <blockquote className="blockquote">Uniquely streamline highly efficient scenarios and 24/7 initiatives. Conveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.</blockquote>
                            <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                            <p className="text-primary">United States</p>
                        </div>
                        <div className="testimonials-single">
                            <img src={client} alt="client" className="client-img"/>
                            <blockquote className="blockquote">Uniquely streamline highly efficient scenarios and 24/7 initiatives. Conveniently embrace multifunctional ideas through proactive customer service. Distinctively conceptualize 2.0 intellectual capital via user-centric partnerships.</blockquote>
                            <h5 className="mt-4 mb-2">Crystal Gordon</h5>
                            <p className="text-primary">United States</p>
                        </div>
                    </div>

                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section light-bg" id="gallery">
                <div className="container">
                    <div className="section-title">
                        <small>GALLERY</small>
                        <h3>App Screenshots</h3>
                    </div>

                    <div className="img-gallery owl-carousel owl-theme">
                        <img src={screen1} alt="image"/>
                        <img src={screen2} alt="image"/>
                        <img src={screen3} alt="image"/>
                        <img src={screen4} alt="image"/>
                    </div>

                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section" id="pricing">
                <div className="container">
                    <div className="section-title">
                        <small>PRICING</small>
                        <h3>Simple Plan Selection</h3>
                    </div>

                    <div className="card-deck">
                        <div className="card pricing">
                            <div className="card-head">
                                <small className="text-primary">As a Tenant</small>
                                <span className="price">$0<sub>/m</sub></span>
                            </div>
                            <ul className="list-group list-group-flush">
                                <div className="list-group-item">Rental History</div>
                                <div className="list-group-item">Unlimited Document Storage</div>
                                <div className="list-group-item">Basic Support</div>
                                <div className="list-group-item"><del>Collaboration</del></div>
                                <div className="list-group-item"><del>Reports and analytics</del></div>
                            </ul>
                            <div className="card-body">
                                <a href="/login" className="btn btn-primary btn-lg btn-block">Sign Up as Tenant</a>
                            </div>
                        </div>
                        <div className="card pricing popular">
                            <div className="card-head">
                                <small className="text-primary"> Residential property Owner</small>
                                <span className="price">$1<sub>/door/m</sub></span>
                            </div>
                            <ul className="list-group list-group-flush">
                                <div className="list-group-item">Unlimited Properties</div>
                                <div className="list-group-item">Unlimited Document Storage</div>
                                <div className="list-group-item">1 additional team member</div>
                                <div className="list-group-item">Collaboration tools</div>
                                <div className="list-group-item">Reports and analytics</div>
                            </ul>
                            <div className="card-body">
                                <a href="/login" className="btn btn-primary btn-lg btn-block">Sign Up as Owner</a>
                            </div>
                        </div>
                        <div className="card pricing">
                            <div className="card-head">
                                <small className="text-primary">Commecial property Owner</small>
                                <span className="price">$1.50<sub>/door/m</sub></span>
                            </div>
                            <ul className="list-group list-group-flush">
                                <div className="list-group-item">Unlimited Properties</div>
                                <div className="list-group-item">Unlimited Document Storage</div>
                                <div className="list-group-item">Collaboration tools</div>
                                <div className="list-group-item">Reports and analytics</div>
                                <div className="list-group-item">Unlimited Team Member acounts</div>
                            </ul>
                            <div className="card-body">
                                <a href="/login" className="btn btn-primary btn-lg btn-block">Sign Up as owner</a>
                            </div>
                        </div>
                    </div>
                    {/* <!-- // end .pricing --> */}


                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section pt-0">
                <div className="container">
                    <div className="section-title">
                        <small>FAQ</small>
                        <h3>Frequently Asked Questions</h3>
                    </div>

                    <div className="row pt-4">
                        <div className="col-md-6">
                            <h4 className="mb-3">Can I try before I buy?</h4>
                            <p className="light-font mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. </p>
                            <h4 className="mb-3">What payment methods do you accept?</h4>
                            <p className="light-font mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. </p>

                        </div>
                        <div className="col-md-6">
                            <h4 className="mb-3">Can I change my plan later?</h4>
                            <p className="light-font mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. </p>
                            <h4 className="mb-3">Do you have a contract?</h4>
                            <p className="light-font mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer rutrum, urna eu pellentesque pretium, nisi nisi fermentum enim, et sagittis dolor nulla vel sapien. Vestibulum sit amet mattis ante. </p>

                        </div>
                    </div>
                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="section bg-gradient">
                <div className="container">
                    <div className="call-to-action">

                        <div className="box-icon"><span className="ti-mobile gradient-fill ti-3x"></span></div>
                        <h2>Download Anywhere</h2>
                        <p className="tagline">Available for all major mobile and desktop platforms. Rapidiously visualize optimal ROI rather than enterprise-wide methods of empowerment. </p>
                        <div className="my-4">

                            <a href="/login" className="btn btn-light"><img src={appleicon} alt="icon"/> App Store</a>
                            <a href="/login" className="btn btn-light"><img src={playicon} alt="icon"/> Google play</a>
                        </div>
                        <p className="text-primary"><small><i>*Works on iOS 10.0.5+, Android Kitkat and above. </i></small></p>
                    </div>
                </div>

            </div>
            {/* <!-- // end .section --> */}

            <div className="light-bg py-5" id="contact">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 text-center text-lg-left">
                            
                            <div className=" d-block d-sm-inline-block">
                                <p className="mb-2">
                                    <span className="ti-email mr-2"></span> <a className="mr-4" href="mailto:labs13.property.manager@google.com">labs13.property.manager@google.com</a>
                                </p>
                            </div>
                            <div className="d-block d-sm-inline-block">
                                
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="social-icons">
                                {/* <!-- <a href="#"><span className="ti-facebook"></span></a>
                                <a href="#"><span className="ti-twitter-alt"></span></a>
                                <a href="#"><span className="ti-instagram"></span></a> --> */}
                                <a href="/login"><span className="ti-github"></span></a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            {/* <!-- // end .section --> */}
        </div>
    )
}
}

export default LandingPage;