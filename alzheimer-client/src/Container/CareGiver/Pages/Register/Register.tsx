import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import CareGiverRegister1 from "../../../../Assets/lawyer-register1.jpg";
import CareGiverRegister2 from "../../../../Assets/about_section3.jpg";
import Register from "../../../Auth/Register/Register";
import Quote from "../../../../Components/Quote/Quote";
import '../../../Lawyer/Pages/Register/Register.scss';
import {useLocation} from "react-router-dom";
import Login from "../../../Auth/Login/Login";
import {USER_ROLE} from "../../../../interfaces";

const CareGiverRegister = () => {
    const location = useLocation();
    let showForm;
    if(location.pathname === '/caregiver/register'){
        showForm = <Register role={USER_ROLE.CAREGIVER} heading="careGiver" />
    }
    else if(location.pathname === '/caregiver/login'){
        showForm = <Login role={USER_ROLE.CAREGIVER} />
    }
    return (
        <React.Fragment>
            <Container fluid>
                <Row>
                    <Col md={5} className={'register_section1'}>
                        <div>
                            <h1>Caregivers</h1>
                            <h5>of Alzheimer Disease</h5>
                        </div>
                    </Col>
                    <Col md={7} className={'LawyerRegister1_img'}>
                        <img src={CareGiverRegister1} alt={'home'} />
                    </Col>
                </Row>
            </Container>
            <Container className={'lawyer_section2'}>
                <Row>
                    <Col md={5}>
                        <img src={CareGiverRegister2} alt={'LawyerRegister2'}/>
                    </Col>
                    <Col md={6}>
                        <div className={'section2_desc'}>
                            <h6>Our Message to all Caregivers of Alzheimer’s Disease</h6>
                            <p>Receiving news that a loved one has dementia or Alzheimer’s Disease is an overwhelming feeling that often causes a caregiver to feel hopeless with no place to turn to for help. The uncertainty of what lies ahead creates a
                                vulnerability that none of us are prepared for. </p>
                            <p>
                                The legal, financial, and medical responsibilities that come next require
                                trusted expertise and guidance to help families navigate through a grueling process of deadlines and paperwork to secure the well being of their
                                loved one.
                            </p>
                            <h6>The risk of no <span> legal plan </span> may result in: </h6>
                            <ul>
                                <li>Inadequate long-term care and health services</li>
                                <li>Lack of Financial and Property Management plan</li>
                                <li>Failure to determine who is next in line to make tough life decisions</li>
                                <li>Misunderstanding State Health Reform Benefits</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container className={'caregiver_legal_professional'}>
                <h6>ALZ Nexus was created to allow caregivers of Alzheimer’s Disease to communicate directly with trusted legal
                    professionals who are ready to represent and serve those are most vulnerable to this disease.</h6>
                <h5>Immediate Benefits of having a <span> Legal Professional </span> on your side:</h5>
                <ul>
                    <li>Get back your time and peace of mind</li>
                    <li>Avoid missing important health and legal deadlines to receive benefits</li>
                    <li>Build a stronger community around your family for support</li>
                </ul>
            </Container>
            {showForm}
            <Quote />
        </React.Fragment>
    );
};
export default CareGiverRegister;
