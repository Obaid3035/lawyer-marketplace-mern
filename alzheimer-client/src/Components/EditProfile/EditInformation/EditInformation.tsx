import React, {useEffect, useState} from "react";
import {Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Input from "../../Input/Input";
import {authValidation} from "../../../lib/validation";
import Button from "../../Button/Button";
import {useForm} from "react-hook-form";
import Loader from "../../../util/loader";
import useAuth from "../../../hooks/useAuth";
import {successNotify} from "../../../util/toast";
import AuthApi from "../../../api/auth";
import Select, {MultiValue} from "react-select";
import {expertiseOption, ISelect,} from "../../../Container/Auth/Register/Register";
import {USER_ROLE} from "../../../interfaces";

interface IEditInformation {
    name: string;
    phoneNumber: string;
    nic: string;
    bio: string;
    firmName: string;
    firmUrl: string;
}

const EditInformation = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm<IEditInformation>();
    const [loading, setLoading] = useState(false);
    const {auth, setAuth} = useAuth();
    const [selectedOption, setSelectedOption] = useState<MultiValue<ISelect>>([]);

    useEffect(() => {
        if (auth) {
            setValue("name", auth?.name);
            setValue("nic", auth?.nic);
            setValue("bio", auth?.bio);
            setValue("phoneNumber", auth?.phoneNumber);
            setValue("firmUrl", auth?.firmUrl);
            setValue("firmName", auth?.firmName);
            setSelectedOption(
                expertiseOption.filter((option) =>
                    auth.expertise.includes(option.value)
                )
            );
        }
    }, [auth]);

    const informationHandler = handleSubmit(async (data) => {
        setLoading(true);
        const formData = {
            ...data,
            expertise: selectedOption.map((option) => option.value),
        };
        const res = await AuthApi.updateProfile(formData);
        setAuth({
            ...auth,
            ...formData,
        });
        successNotify(res.data.message);
        setLoading(false);
    });

    return (
        <Container>
            <h3>Edit Information</h3>
            {auth ? (
                <Form onSubmit={informationHandler}>
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
                                    <small className={"text-danger"}>
                                        {errors.name?.message}
                                    </small>
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
                        <Col md={12}>
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
                        <Col md={12}>
                            <Input>
                                <Form.Label>Short Bio</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder="Enter Your short bio"
                                    {...register("bio")}
                                />
                            </Input>
                        </Col>
                        {
                            auth && auth.role === USER_ROLE.LAWYER ? (
                                <>
                                    <Col md={6}>
                                        <Input>
                                            <Form.Label>Attorney Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Enter Attorney Name"
                                                {...register("firmName", authValidation.firmName)}
                                            />
                                            {errors.name ? (
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
                                                <small className={"text-danger"}>
                                                    {errors.firmUrl?.message}
                                                </small>
                                            ) : null}
                                        </Input>
                                    </Col>

                                    <Col md={12}>
                                        <Input>
                                            <Form.Label>Area of expertise</Form.Label>
                                            <Select
                                                isMulti
                                                value={selectedOption}
                                                options={expertiseOption}
                                                onChange={(e) => setSelectedOption(e!)}
                                            />
                                        </Input>
                                    </Col>
                                </>
                            ) : null
                        }
                        <Col md={12} className={"d-flex justify-content-end mt-4"}>
                            <Button type="submit">
                                {loading ? <Spinner animation="border" size="sm"/> : "Submit"}
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <Loader/>
            )}
        </Container>
    );
};

export default EditInformation;
