import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import "./Profile.scss";
import Input from "../../../../Components/Input/Input";
import { authValidation } from "../../../../lib/validation";
import Button from "../../../../Components/Button/Button";
import { useForm } from "react-hook-form";
import Loader from "../../../../util/loader";
import useAuth from "../../../../hooks/useAuth";
import AuthApi from "../../../../api/auth";
import { errorNotify, successNotify } from "../../../../util/toast";
import { removeToken, setToken } from "../../../../util/helper";
import { useNavigate } from "react-router-dom";

interface IAdminProfile {
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(false);
  const { auth, setAuth } = useAuth();
  const navigation = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAdminProfile>();

  const FormHandler = handleSubmit(async (data) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        setLoading(true);
        const res = await AuthApi.changePassword(data);
        successNotify(res.data.message);
        setAuth(null);
        removeToken();
        navigation("/", {
          replace: true,
        });
        setLoading(false);
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setLoading(false);
      }
    } else {
      errorNotify("New Password & Confirm Password are not same");
    }
  });

  useEffect(() => {
    if (auth) {
      setValue("email", auth.email);
    }
  }, [auth]);

  return (
    <div className={"page_responsive"}>
      <h1> Edit Profile </h1>
      <div className={"profile_main py-5"}>
        {loader ? (
          <Loader />
        ) : (
          <Container>
            <Form onSubmit={FormHandler}>
              <Row>
                <Col md={6}>
                  <Input>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      disabled
                      placeholder="Enter Your Email Address"
                      {...register("email", authValidation.email)}
                    />
                  </Input>
                </Col>
                <Col md={6}>
                  <Input>
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your Password"
                      {...register("oldPassword", authValidation.password)}
                    />
                    {errors.oldPassword ? (
                      <small className={"text-danger"}>
                        {errors.oldPassword?.message}
                      </small>
                    ) : null}
                  </Input>
                </Col>
                <Col md={6}>
                  <Input>
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your confirm Password"
                      {...register("newPassword", authValidation.password)}
                    />
                    {errors.confirmPassword ? (
                      <small className={"text-danger"}>
                        {errors.confirmPassword?.message}
                      </small>
                    ) : null}
                  </Input>
                </Col>
                <Col md={6}>
                  <Input>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Your confirm Password"
                      {...register("confirmPassword", authValidation.password)}
                    />
                    {errors.confirmPassword ? (
                      <small className={"text-danger"}>
                        {errors.confirmPassword?.message}
                      </small>
                    ) : null}
                  </Input>
                </Col>
                <Col md={12} className={"d-flex justify-content-end mt-4"}>
                  <Button type="submit">
                    {loading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        )}
      </div>
    </div>
  );
};
export default Profile;
