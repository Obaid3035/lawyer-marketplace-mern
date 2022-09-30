import React from 'react';
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom";
import FooterLogo from "../../Assets/logo.png";
import PhoneIcon from "../../Assets/phone_icon.png";
import EmailIcon from "../../Assets/email_icon.png";
import LocationIcon from "../../Assets/location_icon2.png";
import FbIcon from "../../Assets/fb_icon.png";
import TwitterIcon from "../../Assets/twitter_icon.png";
import InstagramIcon from "../../Assets/instagram_icon.png";
import './Footer.scss';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col md={4}>
                        <div className={'footer_desc'}>
                            <img src={FooterLogo} alt="logo" />
                            <p>Families who suffer a similar pain need more protection and guidance to help them through these difficult times.
                                Many family members who become caregivers are not adequately protected and, in many cases, become victims themselves to the viscous cycle of this disease.
                                The call to help these families has never been more important.</p>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
                            <h6>Quick Links</h6>
                            <ul>
                                <li>Home</li>
                                <li>About Us</li>
                                <li>Terms and Condition</li>
                                <li> <Link to={'/privacy-policy'}> Privacy Policy </Link></li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={3}>
                        <div>
                            <h6>Let us help</h6>
                            <ul>
                                <li>
                                    <img src={PhoneIcon} alt="phone_icon" />
                                    +1 123 456-7890
                                </li>
                                <li>
                                    <img src={EmailIcon} alt="phone_icon" />
                                    info@yourdomain.com
                                </li>
                                <li>
                                    <img src={LocationIcon} alt="phone_icon" />
                                    834 E. Shadow Brook Street
                                    Lake Zurich, IL 60047
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div>
                            <h6>Follow Us</h6>

                            <img src={FbIcon} alt={'fb_icon'}/>
                            <img src={TwitterIcon} alt={'fb_icon'}/>
                            <img src={InstagramIcon} alt={'fb_icon'}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
