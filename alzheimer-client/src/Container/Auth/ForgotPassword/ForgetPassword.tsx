import React,{useState} from 'react';
import {Col, Container, Form, Row,Spinner} from "react-bootstrap";
import Input from "../../../Components/Input/Input";
import Button from "../../../Components/Button/Button";
import {authValidation} from "../../../lib/validation";
import {useForm} from "react-hook-form";

interface IForgetPassword{
    email: string
}

const ForgetPassword = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<IForgetPassword>();
    const [loading, setLoading] = useState(false)

    const FormHandler = handleSubmit(data => {
        setLoading(true)

        setTimeout(() => {
            setLoading(false)
            console.log(data)
        }, 2000)
    })

    return (
        <Container className={'d-flex justify-content-center align-items-center flex-column'} style={{height: '100vh'}}>
            <div className={'login_form'}>
                <h3>Forget Password</h3>
                <Form onSubmit={FormHandler}>
                    <Row>
                        <Col md={12}>
                            <Input>
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder='Enter Your Email for verification Link'
                                              {...register("email", authValidation.email)}
                                />
                                { errors.email ? <small className={"text-danger"}>{errors.email?.message}</small> : null }
                            </Input>
                        </Col>
                        <Col md={12} className={'d-flex justify-content-end mt-4'}>
                            <Button type="submit" >
                            {loading ? <Spinner animation="border" size="sm" /> : "Reset"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
};
export default ForgetPassword;