import React, { useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import Input from "../../../../Components/Input/Input";
import { authValidation } from "../../../../lib/validation";
import Button from "../../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AuthApi from "../../../../api/auth";
import { successNotify } from "../../../../util/toast";
import { setToken } from "../../../../util/helper";
import useAuth from "../../../../hooks/useAuth";

interface ILoginInput {
  email: string;
  password: string;
}

const AdminLogin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const { setAuth } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({});

  const loginFormHandler = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const res = await AuthApi.signIn(data);
      setToken(res.data.token);
      setAuth(res.data.user);
      navigate("/admin/profile", {
        replace: true,
      });
      successNotify("Welcome!");
      setLoading(false);
    } catch (e: any) {
      setLoading(false);
      setErrorMsg(e.response.data.message);
    }
  });

  return (
    <div
      style={{
        height: "100vh",
      }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className={"login_form"}>
        <h3>Login</h3>

        {errorMsg ? (
          <div className={"error_msg"}>
            <p>
              <CgDanger /> {errorMsg}
            </p>
          </div>
        ) : null}
        <Form onSubmit={loginFormHandler}>
          <Row>
            <Col md={12}>
              <Input>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Email Address"
                  {...register("email", authValidation.email)}
                />
                {errors.email ? (
                  <small className={"text-danger"}>
                    {errors.email?.message}
                  </small>
                ) : null}
              </Input>
            </Col>
            <Col md={12}>
              <Input>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Your Password"
                  {...register("password", authValidation.password)}
                />
                {errors.password ? (
                  <small className={"text-danger"}>
                    {errors.password?.message}
                  </small>
                ) : null}
              </Input>
            </Col>
            <Col md={12} className={"d-flex justify-content-end mt-4"}>
              <Button type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : "Login"}
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
