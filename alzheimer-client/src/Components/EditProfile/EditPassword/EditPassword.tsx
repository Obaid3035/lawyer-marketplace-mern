import React, { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Input from "../../Input/Input";
import { authValidation } from "../../../lib/validation";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";
import { errorNotify, successNotify } from "../../../util/toast";
import AuthApi from "../../../api/auth";

interface IPassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPassword>();
  const [loading, setLoading] = useState(false);

  const ChangePasswordHandler = handleSubmit(async (data) => {
    if (data.newPassword === data.confirmPassword) {
      try {
        setLoading(true);
        const res = await AuthApi.changePassword(data);
        successNotify(res.data.message);
        setLoading(false);
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setLoading(false);
      }
    } else {
      errorNotify("New Password & Confirm Password are not same");
    }
  });

  return (
    <Container>
      <h3>Change Password</h3>
      <Form onSubmit={ChangePasswordHandler}>
        <Row>
          <Col md={12}>
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
          <Col md={12}>
            <Input>
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                {...register("newPassword", authValidation.password)}
              />
              {errors.newPassword ? (
                <small className={"text-danger"}>
                  {errors.newPassword?.message}
                </small>
              ) : null}
            </Input>
          </Col>
          <Col md={12}>
            <Input>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
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
              {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default EditPassword;
