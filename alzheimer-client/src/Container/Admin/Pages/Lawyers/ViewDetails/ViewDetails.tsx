import React, { useEffect, useState } from "react";
import { Badge, Col, Container, Form, Row } from "react-bootstrap";
import "./ViewDetails.scss";
import Input from "../../../../../Components/Input/Input";
import { useForm } from "react-hook-form";
import Loader from "../../../../../util/loader";
import Avatar from "../../../../../Assets/avatar.png";
import { useParams } from "react-router-dom";
import AdminApi from "../../../../../api/admin";
import {USER_ROLE} from "../../../../../interfaces";

interface IAdminProfile {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  location: string;
  firmName: string;
  firmUrl: string;
  isVerified: boolean;
  role: USER_ROLE
  bio: string;
  address: string;
  profilePicture: {
    url: string;
  };
  expertise: string[];
}

const ViewDetails = () => {
  const [loader, setLoader] = useState(true);
  const { id } = useParams();

  const [user, setUser] = useState<IAdminProfile | null>(null);

  useEffect(() => {
    setLoader(true);
    AdminApi.getLawyerById(id!).then((res) => {
      setUser(res.data);
      setLoader(false);
    });
  }, []);

  return (
    <div className={"page_responsive"}>
      <h1> Lawyer Details </h1>
      <div className={"profile_main py-5"}>
        {loader ? (
          <Loader />
        ) : (
          <Container>
            <Form>
              <Row>
                <Col md={12} className="m-auto imgSection">
                  <div className={"avatar"}>
                    <img
                      src={
                        user?.profilePicture ? user.profilePicture.url : Avatar
                      }
                      alt={"avatar"}
                    />
                  </div>
                </Col>

                <Col md={6}>
                  <Input>
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" disabled value={user?.name} />
                  </Input>
                </Col>

                <Col md={6}>
                  <Input>
                    <Form.Label>Email</Form.Label>
                    <Form.Control disabled type="email" value={user?.email} />
                  </Input>
                </Col>

                <Col md={6}>
                  <Input>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      disabled
                      type="text"
                      value={user?.phoneNumber}
                    />
                  </Input>
                </Col>
                {
                  user?.role === USER_ROLE.LAWYER ? (
                      <>
                        <Col md={6}>
                          <Input>
                            <Form.Label>Location</Form.Label>
                            <Form.Control disabled type="text" value={user?.address} />
                          </Input>
                        </Col>

                        <Col md={6}>
                          <Input>
                            <Form.Label>Attorney Firm Legal Name</Form.Label>
                            <Form.Control disabled type="text" value={user?.firmName} />
                          </Input>
                        </Col>

                        <Col md={6}>
                          <Input>
                            <Form.Label>Company URL</Form.Label>
                            <Form.Control disabled type="text" value={user?.firmUrl} />
                          </Input>
                        </Col>

                        <Col md={6}>
                          <div>
                            <Input>
                              <Form.Label>Area Of Expertise</Form.Label>
                            </Input>
                            {user?.expertise.map((str) => (
                                <Badge className="area_expertise_badge" pill>
                                  {str}
                                </Badge>
                            ))}
                          </div>
                        </Col>

                        <Col md={12}>
                          <Input>
                            <Form.Label>Short Bio</Form.Label>
                            <Form.Control
                                as="textarea"
                                disabled
                                rows={5}
                                value={user?.bio}
                            />
                          </Input>
                        </Col>
                      </>
                  ) : null
                }
              </Row>
            </Form>
          </Container>
        )}
      </div>
    </div>
  );
};
export default ViewDetails;
