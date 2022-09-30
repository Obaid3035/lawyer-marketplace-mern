import React, { useEffect, useState } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { useForm } from "react-hook-form";
import { IAboutSection3 } from '../../../../../../interfaces';
import { cmsValidation } from '../../../../../../lib/validation';
import { successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'

const Section3: React.FC<any> = ({ section3 }) => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IAboutSection3>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setValue("heading", section3?.heading);
        setValue("box_1", section3?.box_1);
        setValue("box_2", section3?.box_2);
        setValue("box_3", section3?.box_3);
        setValue("box_4", section3?.box_4);
        setValue("box_5", section3?.box_4);
        setValue("box_6", section3?.box_4);
        setLoading(false)
    }, [section3]);

    const onSubmitHandler = handleSubmit(async (data) => {
        const formData = {
            section_3: {
                heading: data.heading,
                box_1: data.box_1,
                box_2: data.box_2,
                box_3: data.box_3,
                box_4: data.box_4,
                box_5: data.box_5,
                box_6: data.box_6,

            }
        }
        console.log(formData)
        successNotify("Form Submitted Successfully");
    })
    return (
        <React.Fragment>
            {loading ? <Loader /> :
                <Form onSubmit={onSubmitHandler}>
                    <Row>
                        <Col md={12}>

                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text" {...register('heading', cmsValidation.heading)} />
                            <small className="text-danger"> {errors.heading && errors.heading.message}</small><br />

                            <Form.Label>Box-1 Text</Form.Label>
                            <Form.Control type="text" {...register('box_1', cmsValidation.box_1)} />
                            <small className="text-danger"> {errors.box_1 && errors.box_1.message}</small><br />

                            <Form.Label>Box-2 Text</Form.Label>
                            <Form.Control type="text" {...register('box_2', cmsValidation.box_2)} />
                            <small className="text-danger"> {errors.box_2 && errors.box_2.message}</small><br />

                            <Form.Label>Box-3 Text</Form.Label>
                            <Form.Control type="text" {...register('box_3', cmsValidation.box_3)} />
                            <small className="text-danger"> {errors.box_3 && errors.box_3.message}</small><br />

                            <Form.Label>Box-4 Text</Form.Label>
                            <Form.Control type="text" {...register('box_4', cmsValidation.box_4)} />
                            <small className="text-danger"> {errors.box_3 && errors.box_3.message}</small><br />

                            <Form.Label>Box-5 Text</Form.Label>
                            <Form.Control type="text" {...register('box_5', cmsValidation.box_5)} />
                            <small className="text-danger"> {errors.box_5 && errors.box_5.message}</small><br />

                            <Form.Label>Box-6 Text</Form.Label>
                            <Form.Control type="text" {...register('box_6', cmsValidation.box_6)} />
                            <small className="text-danger"> {errors.box_6 && errors.box_6.message}</small><br />
                        </Col>
                    </Row>
                    <hr />
                    <div className={'text-end my-4'}>
                        <SaveBtn type={'submit'}>
                            SAVE CHANGES
                        </SaveBtn>
                    </div>
                </Form>
            }
        </React.Fragment>
    )
}

export default Section3
