import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HomeSection1 from "../../../Assets/home_section1.png";
import HomeSection2 from "../../../Assets/home_section2.jpg";
import Button from "../../../Components/Button/Button";
import SearchLocation from "./SearchLocation/SearchLocation";
import Quote from "../../../Components/Quote/Quote";
import Testimonials from "./Testimonials/Testimonials";
import "./Home.scss";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col
            md={7}
            className={
              "d-flex justify-content-center align-items-center flex-column"
            }
          >
            <div className={"get_touch"}>
              <h1>Get in touch with Trusted Legal Professionals </h1>
              <p>
                to help protect your loved ones who suffer from
                <span> Alzheimer’s Disease </span>
              </p>
              {!auth ? (
                <div className={"lawyer_join"}>
                  <Button
                    type="button"
                    onClick={() => navigate("/lawyer/register")}
                  >
                    Join now to offer your legal services
                  </Button>
                </div>
              ) : null}
            </div>
            <SearchLocation />
          </Col>
          <Col md={5} className={"home_img"}>
            <img src={HomeSection1} alt="Home" />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col md={6} className={"homeSection2_img"}>
            <img src={HomeSection2} alt={"home"} />
          </Col>
          <Col md={6} className={"homeSection2_text"}>
            <div>
              <h5>About</h5>
              <h4>THE ALZ NEXUS</h4>
              <p>
                Time is precious when caring for a loved one. Get help now so
                you can get your time back
              </p>
              <hr />
              <h5>Why was ALZ Nexus Created?</h5>
              <p>
                After years of battling Alzheimer’s Disease and Dementia, my
                mother and grandparents’ loss their lives to this terrible
                disease that not only took its toll on their personal well being
                but also on our family who scrambled to find them sufficient
                care as well as manage their legal and financial matters. The
                hopeless feelings we experienced could have been alleviated if
                we had access to the right resources to plan for their
                unfortunate passing and their declining health.{" "}
              </p>
              <Button type={"button"} onClick={() => navigate("/about")}>
                Read More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container className={"legal_professional"}>
        <Row>
          <Col md={5} className={"legal_professional_desc"}>
            <div>
              <h1>Legal Professionals</h1>
              <h6>Why Join ALZ Nexus?</h6>
              <p>
                ALZ Nexus was created to help families who have a loved one
                suffering from Alzheimer’s Disease connect directly with trusted
                legal professionals to help them improve their circumstances and
                secure valuables at a time of great vulnerability.
              </p>
              <Button
                type="button"
                onClick={() => navigate("/lawyer/register")}
              >
                Find Out More
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Quote />
      <Testimonials />
    </React.Fragment>
  );
};
export default Home;
