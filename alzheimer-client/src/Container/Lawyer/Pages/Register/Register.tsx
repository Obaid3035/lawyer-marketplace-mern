import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import LawyerRegister1 from "../../../../Assets/lawyer-register1.jpg";
import LawyerRegister2 from "../../../../Assets/lawyer-register2.jpg";
import Register from "../../../Auth/Register/Register";
import Quote from "../../../../Components/Quote/Quote";
import './Register.scss';
import Login from "../../../Auth/Login/Login";
import {useLocation} from "react-router-dom";
import {USER_ROLE} from "../../../../interfaces";

const LawyerRegister = () => {
    const location = useLocation();
    let showForm;
    if(location.pathname === '/lawyer/register'){
        showForm = <Register role={USER_ROLE.LAWYER} heading={"Lawyer"} />
    }
    else if(location.pathname === '/lawyer/login'){
        showForm = <Login role={USER_ROLE.LAWYER} />
    }
    return (
        <React.Fragment>
            <Container fluid>
                <Row className={'h-100'}>
                    <Col md={5} className={'register_section1'}>
                        <div>
                            <h1>Estate Planning
                                and Elder Law
                                Attorneys</h1>
                            <h5>Join ALZ Nexus</h5>
                        </div>
                    </Col>
                    <Col md={7} className={'LawyerRegister1_img'}>
                        <img src={LawyerRegister1} alt={'home'} />
                    </Col>
                </Row>
            </Container>
            <Container className={'lawyer_section2'}>
                <Row>
                    <Col md={5}>
                        <img src={LawyerRegister2} alt={'LawyerRegister2'}/>
                    </Col>
                    <Col md={6}>
                        <div className={'section2_desc'}>
                            <h6>Why Join ALZ Nexus?</h6>
                            <p>ALZ Nexus was created to help families who have a loved one suffering from Alzheimer’s Disease connect
                                directly with trusted legal professionals to help them improve their circumstances
                                and secure valuables at a time of great vulnerability.</p>
                            <h6>Benefits of <span> Legal Professionals </span> who Join ALZ Nexus:</h6>
                            <ul>
                                <li>Build off referrals</li>
                                <li>Transact quicker with customers who need immediate help</li>
                                <li>Reduce spend on advertising and marketing in your local area</li>
                                <li>Expand client base within Alzheimer’s Disease and Dementia </li>
                            </ul>
                        </div>
                    </Col>
                </Row>
            </Container>
            {showForm}
            <Quote />
        </React.Fragment>
    );
};
export default LawyerRegister;
