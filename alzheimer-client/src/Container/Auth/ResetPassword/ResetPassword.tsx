import React, { useState } from 'react';
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import { authValidation } from "../../../lib/validation";
import { useForm } from "react-hook-form";
import { errorNotify } from "../../../util/toast";

interface IResetPassword {
    password: string,
    confirmPassword: string
}

const ResetPassword = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<IResetPassword>();
    const [loading, setLoading] = useState(false)

    const FormHandler = handleSubmit(data => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            console.log(data)
        }, 2000)

        if (data.password === data.confirmPassword) {
            console.log(data)
        }
        else {
            errorNotify("Password didn't match")
        }

    })

    return (
        <Container className={'d-flex justify-content-center align-items-center flex-column'} style={{ height: '100vh' }}>
            <div className={'login_form'}>
                <h3>Reset Password</h3>
                <Form onSubmit={FormHandler}>
                    <Row>
                        <Col md={12}>
                            <Input>
                                <Form.Label>New Password</Form.Label>
                                <Form.Control type="password" placeholder='Enter Your New Password'
                                    {...register("password", authValidation.password)}
                                />
                                {errors.password ? <small className={"text-danger"}>{errors.password?.message}</small> : null}
                            </Input>
                        </Col>
                        <Col md={12}>
                            <Input>
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder='Enter Your Confirm Password'
                                    {...register("confirmPassword", authValidation.password)}
                                />
                                {errors.confirmPassword ? <small className={"text-danger"}>{errors.confirmPassword?.message}</small> : null}
                            </Input>
                        </Col>
                        <Col md={12} className={'d-flex justify-content-end mt-4'}>
                            <Button type="submit" >
                                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
};
export default ResetPassword;