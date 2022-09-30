import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import AboutSection1 from "../../../Assets/about_section1.jpg";
import './About.scss';
import AboutSection2 from "../../../Assets/about_section2.jpg";
import AboutMission from "../../../Assets/about_section3.jpg";
import VectorImg1 from "../../../Assets/about_vector1.png";
import VectorImg2 from "../../../Assets/about_vector2.png";
import VectorImg3 from "../../../Assets/about_vector3.png";
import Quote from "../../../Components/Quote/Quote";

const About = () => {
    return (
        <React.Fragment>
            <Container fluid>
                <Row className={'h-100'}>
                    <Col md={5} className={'about_section1'}>
                        <div>
                            <h1>About us</h1>
                        </div>
                    </Col>
                    <Col md={7} className={'about_section1_img'}>
                        <img src={AboutSection1} alt={'home'} />
                    </Col>
                </Row>
            </Container>
            <Container className={'about_section2'}>
                <Row>
                    <Col md={5} className={'text-center'}>
                        <img src={AboutSection2} alt={'about_section2'} />
                    </Col>
                    <Col md={6} className={'aboutSection2_desc'}>
                        <h6>THE HARD TRUTH ABOUT ALZHEIMER'S DISEASE</h6>
                        <ul>
                            <li>Over <span> 6 million </span> americans are living with alzheimer's. by 2050, this number
                                is projected to rise to nearly 13 million.</li>
                            <li>Nearly <span> $300m </span> worth of care is provided by family members and unpaid
                                caregivers</li>
                            <li>Alzheimer's will cost our nation nearly <span> $400b </span></li>
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Container className={'about_section3'}>
                <h4>WHERE THIS LEAVES ALZHEIMER'S PATIENTS MOST VULNERABLE</h4>
                <Row>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Medicare and Medicaid Eligibility</p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Long Term Care Planning </p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Age Discrimination</p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Guardianship</p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Inheritance </p>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className={'about_boxSection'}>
                            <p>Elder Abuse</p>
                        </div>
                    </Col>
                </Row>
                <hr />
            </Container>
            <Container className={'about_section4'}>
                <h4><span> ALZ NEXUS </span> IS HERE TO CONNECT YOU WITH PROFESSIONALS WHO CAN FIND
                    IMMEDIATE SOLUTIONS</h4>
                <Row>
                    <Col md={4}>
                        <div className="alz_nexus_section">
                            <h5>Choose from dozens of legal professionals</h5>
                            <p>Browse a list of legal professionals in your local area, who socialize in:</p>
                            <ul>
                                <li>Power of attorney</li>
                                <li>Standard will</li>
                                <li>Living Trust</li>
                                <li>Guardianship</li>
                            </ul>
                            <div className={'text-center'}>
                                <img src={VectorImg1} alt="vector" />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="alz_nexus_section">
                            <h5>Communicate:</h5>
                            <p>Contact who you need in real time</p>
                            <ul>
                                <li>Chat</li>
                                <li>Inbox Messaging</li>
                                <li>Negotiate Pricing</li>
                                <li>Determine Availability</li>
                            </ul>
                            <div className={'alz_nexus_img1'}>
                                <img src={VectorImg2} alt="vector" />
                            </div>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="alz_nexus_section">
                            <h5>Decide:</h5>
                            <p>Evaluate Reviews Find a match and Book!</p>
                            <div className={'alz_nexus_img2'}>
                                <img src={VectorImg3} alt="vector" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className={'about_mission_section'}>
                <Row>
                    <Col md={6} className={'mission_desc'}>
                        <div>
                            <h3>OUR MISSION</h3>
                            <ul>
                                <li>BUILDING A STRONGER COMMUNITY TO SUPPORT FAMILIES
                                    BATTLING ALZHEIMER'S DISEASE</li>
                                <li>IMPROVE THE TREATMENT AND LONG-TERM CARE OUTLOOK OF
                                    ALZHEIMER'S PATIENTS</li>
                                <li>HELP CAREGIVERS GET THEIR TIME BACK TO SPEND WITH THEIR
                                    LOVED ONES</li>
                            </ul>
                        </div>

                    </Col>
                    <Col md={6}>
                        <img src={AboutMission} alt={'about'} />
                    </Col>
                </Row>
            </Container>
            <Quote />
        </React.Fragment>
    );
};
export default About;