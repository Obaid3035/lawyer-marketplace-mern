import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { useForm } from "react-hook-form";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { IFooterSection1 } from '../../../../../../interfaces';
import { cmsValidation } from '../../../../../../lib/validation';


const Section1: React.FC<any> = ({ section1 }) => {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm<IFooterSection1>();

    const [selectedFile, setSelectedFile] = useState<null | File>(null);
    const [preview, setPreview] = useState<any>(null);
    useEffect(() => {
        setValue("heading", section1?.heading);
        setPreview(section1?.image?.url);
      }, [section1]);
    const onSubmitHandler = handleSubmit(async (data) => {

        const formData = {
            section_1: {
                heading: data.heading,
                image: data.image
            }
        }
        console.log(formData)
    })

    return (
        <React.Fragment>
            <Form onSubmit={onSubmitHandler}>
                <Row>
                    <Col md={6}>
                        <Form.Label>Heading</Form.Label>
                        <Form.Control type="text" {...register('heading',cmsValidation.heading)} />
                        <small className="text-danger"> {errors.heading && errors.heading.message} </small>
                    </Col>
                    <Col md={6}>
                        <Form.Label>Image</Form.Label>
                        <div>
                            <img src={preview ? preview : DummyImg} alt={'preview'} className={'preview_img'} />
                        </div>
                        <div className={'input_file'}>
                            <input
                                type="file"
                                id="file-input7"
                                accept="image/png, image/jpeg"
                                {...register('image', cmsValidation.image)}
                                onChange={(e) => {
                                    setSelectedFile(e.target.files![0])
                                    setPreview(URL.createObjectURL(e.target.files![0]))
                                }}
                                className="file_input" />
                            <small className="text-danger text-center"> {errors.image && errors.image.message} </small>
                            <label className="file_label" htmlFor="file-input7">
                                <AiOutlineCamera />
                                <span>Upload Image</span>
                            </label>


                        </div>


                    </Col>
                </Row>
                <hr />
                <div className={'text-end my-4'}>
                    <SaveBtn type={'submit'}>
                        SAVE CHANGES
                    </SaveBtn>
                </div>
            </Form>
        </React.Fragment>
    )
}

export default Section1
