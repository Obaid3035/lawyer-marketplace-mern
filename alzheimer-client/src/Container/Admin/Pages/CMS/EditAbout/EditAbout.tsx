import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import "../EditHome/EditHome.scss";
import Section1 from "./Sections/Section1";
import Section2 from "./Sections/Section2";
import Section3 from "./Sections/Section3";
import Section4 from "./Sections/Section4";
import Section5 from "./Sections/Section5";
import { getAboutSections } from "../../../../../api/CMS";
import {
  IAboutSection1,
  IAboutSection2,
  IAboutSection3,
  IAboutSection4,
  IAboutSection5,
} from "../../../../../interfaces/index";

const EditAbout = () => {
  const [activeTab, setActiveTab] = useState("SECTION1");
  const [getAboutSection1, setGetAboutSection1] = useState<IAboutSection1>();
  const [getAboutSection2, setGetAboutSection2] = useState<IAboutSection2>();
  const [getAboutSection3, setGetAboutSection3] = useState<IAboutSection3>();
  const [getAboutSection4, setGetAboutSection4] = useState<IAboutSection4>();
  const [getAboutSection5, setGetAboutSection5] = useState<IAboutSection5>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAboutSections().then((res) => {
      setGetAboutSection1(res.data?.about[0].section_1);
      setGetAboutSection2(res.data?.about[0].section_2);
      setGetAboutSection3(res.data?.about[0].section_3);
      setGetAboutSection4(res.data?.about[0].section_4);
      setGetAboutSection5(res.data?.about[0].section_5);
    });
  }, []);
  console.log(getAboutSection1, getAboutSection2);

  let showSection = null;
  if (activeTab === "SECTION1") {
    showSection = <Section1 section1={getAboutSection1} />;
  } else if (activeTab === "SECTION2") {
    showSection = <Section2 section2={getAboutSection2} />;
  } else if (activeTab === "SECTION3") {
    showSection = <Section3 section3={getAboutSection3} />;
  } else if (activeTab === "SECTION4") {
    showSection = <Section4 section4={getAboutSection4} />;
  } else if (activeTab === "SECTION5") {
    showSection = <Section5 section5={getAboutSection5} />;
  }

  return (
    <div>
      <Container fluid style={{ marginTop: "10%" }}>
        <Row>
          <Col md={2}>
            <div className={"tabs_btn"}>
              <Button
                className={activeTab === "SECTION1" ? "active" : ""}
                onClick={() => setActiveTab("SECTION1")}
              >
                {" "}
                Section 1{" "}
              </Button>

              <Button
                className={activeTab === "SECTION2" ? "active" : ""}
                onClick={() => setActiveTab("SECTION2")}
              >
                {" "}
                Section 2{" "}
              </Button>

              <Button
                className={activeTab === "SECTION3" ? "active" : ""}
                onClick={() => setActiveTab("SECTION3")}
              >
                {" "}
                Section 3{" "}
              </Button>

              <Button
                className={activeTab === "SECTION4" ? "active" : ""}
                onClick={() => setActiveTab("SECTION4")}
              >
                {" "}
                Section 4{" "}
              </Button>

              <Button
                className={activeTab === "SECTION5" ? "active" : ""}
                onClick={() => setActiveTab("SECTION5")}
              >
                {" "}
                Section 5{" "}
              </Button>
            </div>
          </Col>
          <Col md={10}>
            <div className={"tabs_description"}>{showSection}</div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default EditAbout;
