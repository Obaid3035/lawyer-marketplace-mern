import React, { useEffect, useState } from 'react'
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { useForm } from "react-hook-form";
import { IJoinsSection3 } from '../../../../../../interfaces';
import { cmsValidation } from '../../../../../../lib/validation';
import { successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'

const Section3: React.FC<any> = ({ section3 }) => {

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm<IJoinsSection3>();
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setValue("heading", section3?.heading);
        setValue("text", section3?.text);
        setValue("point_1", section3?.point_1);
        setValue("point_2", section3?.text);
        setValue("point_3", section3?.text);
        setLoading(false)
    }, [section3, setValue]);

    const onSubmitHandler = handleSubmit(async (data) => {
        const formData = {
            section_3: {
                heading: data.heading,
                text: data.text,
                point_1: data.point_1,
                point_2: data.point_2,
                point_3: data.point_3,
            }
        }
        console.log(formData)
        reset()
        successNotify("Form Submitted Successfully");

    })

    return (
        <React.Fragment>
            {loading ? <Loader /> :
                <Form onSubmit={onSubmitHandler}>
                    <Row>
                        <Col md={12} className='m-auto'>
                            <Form.Label>Heading</Form.Label>
                            <Form.Control type="text" {...register('heading', cmsValidation.heading)} />
                            <small className="text-danger"> {errors.heading && errors.heading.message} </small><br />

                            <Form.Label>Text</Form.Label>
                            <Form.Control type="text" {...register('text', cmsValidation.text)} />
                            <small className="text-danger"> {errors.text && errors.text.message} </small><br />

                            <Form.Label>Point-1</Form.Label>
                            <Form.Control type="text" {...register('point_1', cmsValidation.point_1)} />
                            <small className="text-danger"> {errors.point_1 && errors.point_1.message} </small><br />

                            <Form.Label>Point-2</Form.Label>
                            <Form.Control type="text" {...register('point_2', cmsValidation.point_2)} />
                            <small className="text-danger"> {errors.point_2 && errors.point_2.message} </small><br />

                            <Form.Label>Point-3</Form.Label>
                            <Form.Control type="text" {...register('point_3', cmsValidation.point_3)} />
                            <small className="text-danger"> {errors.point_3 && errors.point_3.message} </small><br />

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
