import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { LoginType, RegisterType, USER_ROLE } from "../../../interfaces";
import { useForm } from "react-hook-form";
import { authValidation } from "../../../lib/validation";
import { CgDanger } from "react-icons/cg";
import AuthApi from "../../../api/auth";
import useAuth from "../../../hooks/useAuth";
import { setToken } from "../../../util/helper";

interface ILoginInput {
  email: string;
  password: string;
  role: USER_ROLE;
}

const Login: React.FC<{ role: USER_ROLE }> = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [loginType, setLoginType] = useState("");
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({});

  useEffect(() => {
    switch (location.pathname) {
      case LoginType.caregiver:
        setLoginType(LoginType.caregiver);
        break;
      case LoginType.lawyer:
        setLoginType(LoginType.lawyer);
        break;
    }
  }, [location.pathname]);

  const toRegisterHandler = () => {
    switch (loginType) {
      case LoginType.caregiver:
        navigate(RegisterType.caregiver);
        break;
      case LoginType.lawyer:
        navigate(RegisterType.lawyer);
        break;
    }
  };

  const loginHandler = handleSubmit(async (data) => {
    setLoading(true);
    try {
      data.role = role;
      const res = await AuthApi.signIn(data);
      setToken(res.data.token);
      setAuth(res.data.user);
      setLoading(false);
      navigate("/");
    } catch (e: any) {
      setLoading(false);
      setErrorMsg(e.response.data.message);
    }
  });

  return (
    <div className={"login_form"}>
      <h3>Login</h3>

      {errorMsg ? (
        <div className={"error_msg"}>
          <p>
            <CgDanger /> {errorMsg}
          </p>
        </div>
      ) : null}
      <Form onSubmit={loginHandler}>
        <Row>
          <Col md={12}>
            <Input>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Email Address"
                {...register("email", authValidation.email)}
              />
              {errors.email ? (
                <small className={"text-danger"}>{errors.email?.message}</small>
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
      <p>
        <NavLink to={"/forgot-password"}> Forgotten Password? </NavLink>
      </p>
      <p>or</p>
      <p>
        Don't have an account?{" "}
        <button onClick={toRegisterHandler} className={"btn_login"}>
          Register{" "}
        </button>
      </p>
    </div>
  );
};
export default Login;
