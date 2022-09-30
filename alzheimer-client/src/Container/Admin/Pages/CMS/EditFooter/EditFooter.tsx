import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from "react-bootstrap";
import { getFooterSections } from '../../../../../api/CMS';
import { IFooterSection1, IFooterSection2 } from '../../../../../interfaces';
import '../EditHome/EditHome.scss';
import Section1 from './Sections/Section1';
import Section2 from './Sections/Section2';



const EditFooter = () => {
    const [activeTab, setActiveTab] = useState('SECTION1')
  const [getFooterSection1, setGetFooterSection1] = useState<IFooterSection1>();
  const [getFooterSection2, setGetFooterSection2] = useState<IFooterSection2>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getFooterSections().then((res) => {
      setGetFooterSection1(res.data?.footer[0].section_1);
      setGetFooterSection2(res.data?.footer[0].section_2);

    });
  }, []);
    
    let showSection = null
    if (activeTab === 'SECTION1') {
        showSection = (
            <Section1 section1={getFooterSection1}/>
        )
    }
    else if (activeTab === 'SECTION2') {
        showSection = (
            <Section2 section2={getFooterSection2}/>
        )
    }


    return (
        <div>
            <Container fluid style={{marginTop:"10%"}}>
                <Row>
                    <Col md={2}>
                        <div className={'tabs_btn'}>
                            <Button className={activeTab === 'SECTION1' ? 'active' : ''}
                                onClick={() => setActiveTab('SECTION1')}
                            > Section 1 </Button>
                            <Button className={activeTab === 'SECTION2' ? 'active' : ''}
                                onClick={() => setActiveTab('SECTION2')}
                            > Section 2</Button>
                        </div>
                    </Col>
                    <Col md={10}>
                        <div className={'tabs_description'}>
                            {showSection}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
export default EditFooter;