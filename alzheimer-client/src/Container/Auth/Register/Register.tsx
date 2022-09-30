import React, { useEffect, useState } from "react";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import "./Register.scss";
import { authValidation } from "../../../lib/validation";
import { useForm } from "react-hook-form";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import { useNavigate } from "react-router-dom";
import { ICoordinates, LoginType, USER_ROLE } from "../../../interfaces";
import RegisterPopUp from "../../Lawyer/Pages/Register/RegisterPopUp/RegisterPopUp";
import { errorNotify } from "../../../util/toast";
import Map from "../../../Components/Map/Map";
import { CgDanger } from "react-icons/cg";
import AuthApi from "../../../api/auth";
import { setToken } from "../../../util/helper";
import useAuth from "../../../hooks/useAuth";
import Select, { MultiValue } from "react-select";
import Geocode from "react-geocode";

interface IRegister {
  role: USER_ROLE;
  heading: string;
}

interface IRegisterInput {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phoneNumber: string;
  role: USER_ROLE;
  location: {
    lat: number;
    lng: number;
  };
  nic: string;
  resume: File[];
  firmName: string;
  firmUrl: string;
  isVerified: boolean;
}

export const expertiseOption = [
  {
    label: "Level 1",
    value: "level_1",
  },
  {
    label: "Level 2",
    value: "level_2",
  },
  {
    label: "Level 3",
    value: "level_3",
  },
];

export interface ISelect {
  label: string;
  value: string;
}

const Register: React.FC<IRegister> = ({ role, heading }) => {
  const navigate = useNavigate();

  const [selectedCoordinate, setSelectedCoordinate] =
    useState<ICoordinates | null>(null);
  const { setAuth } = useAuth();
  const [selectedOption, setSelectedOption] = useState<MultiValue<ISelect>>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterInput>();
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    Geocode.setApiKey("AIzaSyAFsEP9H8HabaWXDeZzpZZ7-7JuVnXv2yk");
  }, []);

  const toLogin = () => {
    switch (role) {
      case USER_ROLE.CAREGIVER:
        navigate(LoginType.caregiver);
        break;
      case USER_ROLE.LAWYER:
        navigate(LoginType.lawyer);
        break;
    }
  };

  const registerSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const userData: { [key: string]: any } = {
        email: data.email,
        password: data.password,
        name: data.name,
        phoneNumber: data.phoneNumber,
        role: role,
        nic: data.nic,
      };

      if (data.password !== data.confirmPassword) {
        errorNotify("Passwords didn't match");
        return;
      }
      if (role === USER_ROLE.LAWYER) {
        if (!selectedCoordinate) {
          errorNotify("Please Select Location");
          return;
        }
        if (selectedOption.length <= 0) {
          errorNotify("Please Select Area of Expertise");
          return;
        }

        const geoCodeRes = await Geocode.fromLatLng(
          selectedCoordinate.lat,
          selectedCoordinate.lng
        );
        userData.firmName = data.firmName;
        userData.firmUrl = data.firmUrl;
        userData.address = geoCodeRes.results[0].formatted_address;
        userData.location = {
          type: "Point",
          coordinates: [selectedCoordinate?.lng, selectedCoordinate?.lat],
        };
        userData.resume = data.resume[0];
        userData.isVerified = false;
        const formData = new FormData();
        for (const value in userData) {
          if (value === "location")
            formData.set(value, JSON.stringify(userData[value]));
          else formData.set(value, userData[value]);
        }
        formData.set(
          "expertise",
          JSON.stringify(selectedOption.map((option) => option.value))
        );
        const res = await AuthApi.lawyerSignUp(formData);
        setToken(res.data.token);
        setAuth(res.data.user);
        navigate("/", {
          replace: true,
        });
        setLoading(false);
        setShowModal(true);
      } else {
        const res = await AuthApi.caregiverSignUp(userData);
        setToken(res.data.token);
        setAuth(res.data.user);
        navigate("/", {
          replace: true,
        });
        setLoading(false);
        setShowModal(true);
      }
    } catch (e: any) {
      setErrorMsg(e.response.data.message);
      setLoading(false);
    }
  });

  let additionalField = null;

  if (role === USER_ROLE.LAWYER) {
    additionalField = (
      <React.Fragment>
        <Col md={6}>
          <Input>
            <Form.Label>Attorney Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Attorney Name"
              {...register("firmName", authValidation.firmName)}
            />
            {errors.firmName ? (
              <small className={"text-danger"}>
                {errors.firmName?.message}
              </small>
            ) : null}
          </Input>
        </Col>
        <Col md={6}>
          <Input>
            <Form.Label>Attorney Url</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Attorney Url"
              {...register("firmUrl", authValidation.firmUrl)}
            />
            {errors.firmUrl ? (
              <small className={"text-danger"}>{errors.firmUrl?.message}</small>
            ) : null}
          </Input>
        </Col>

        <Col md={12}>
          <Input>
            <Form.Label>Area of expertise</Form.Label>
            <Select
              isMulti
              options={expertiseOption}
              onChange={(e) => setSelectedOption(e!)}
            />
          </Input>
        </Col>
        <Col md={12} className={"w-100"}>
          <Input>
            <Form.Label>Location</Form.Label>
            <Map
              map={true}
              search={true}
              selectedCoordinate={selectedCoordinate}
              setSelectedCoordinate={setSelectedCoordinate}
            />
          </Input>
        </Col>
        <Col md={4} className={"mt-4"}>
          <Input>
            <Form.Control
              type="file"
              placeholder="Choose file"
              {...register("resume", authValidation.resume)}
            />
            {errors.resume ? (
              <small className={"text-danger"}>{errors.resume?.message}</small>
            ) : null}
          </Input>
        </Col>
      </React.Fragment>
    );
  }

  return (
    <div className={"registration_form"}>
      <RegisterPopUp show={showModal} setShow={setShowModal} />
      <h3>{heading} Registration</h3>
      {errorMsg ? (
        <div className={"error_msg"}>
          <p>
            <CgDanger /> {errorMsg}
          </p>
        </div>
      ) : null}
      <Form onSubmit={registerSubmit}>
        <Row>
          <Col md={6}>
            <Input>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                {...register("name", authValidation.name)}
              />
              {errors.name ? (
                <small className={"text-danger"}>{errors.name?.message}</small>
              ) : null}
            </Input>
          </Col>
          <Col md={6}>
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
          <Col md={6}>
            <Input>
              <Form.Label>phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Phone Number"
                {...register("phoneNumber", authValidation.phone)}
              />
              {errors.phoneNumber ? (
                <small className={"text-danger"}>
                  {errors.phoneNumber?.message}
                </small>
              ) : null}
            </Input>
          </Col>
          <Col md={6}>
            <Input>
              <Form.Label>id number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your ID"
                {...register("nic", authValidation.nic)}
              />
              {errors.nic ? (
                <small className={"text-danger"}>{errors.nic?.message}</small>
              ) : null}
            </Input>
          </Col>
          <Col md={6}>
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
          {additionalField}
          <Col md={12} className={"d-flex justify-content-end mt-4"}>
            <Button type="submit">
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
      <p>
        Already have an account?{" "}
        <button onClick={toLogin} className={"btn_login"}>
          Login
        </button>
      </p>
    </div>
  );
};
export default Register;
