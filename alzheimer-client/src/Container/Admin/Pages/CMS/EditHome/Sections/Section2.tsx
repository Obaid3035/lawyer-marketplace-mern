import React, { useEffect, useState } from "react";
import { Col,Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { useForm } from "react-hook-form";
import { IHomeSection2 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import { successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'

const Section2: React.FC<any> = ({ section2 }) => {
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isSubmitSuccessful },
    setValue,
    reset,
  } = useForm<IHomeSection2>();

  useEffect(() => {
    setValue("heading", section2?.heading);
    setValue("subHeading", section2?.subHeading);
    setValue("text", section2?.text);
    setValue("heading_2", section2?.heading_2);
    setValue("text_2", section2?.text_2);
    setPreview(section2?.image?.url);
    setLoading(false)
  }, [section2]);

  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = {
      section_2: {
        heading: data.heading,
        subHeading: data.subHeading,
        text: data.text,
        heading_2: data.heading_2,
        text_2: data.text_2,
        image: data.image,
      },
    };
    console.log(formData);
    successNotify("Form Submitted Successfully");
  });

  return (
    <React.Fragment>
      {loading ? <Loader /> :
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col md={6}>
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("heading", cmsValidation.heading)}
              />
              <small className="text-danger">
                {" "}
                {errors.heading && errors.heading.message}{" "}
              </small>
              <br />

              <Form.Label>Sub Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("subHeading", cmsValidation.subHeading)}
              />
              <small className="text-danger">
                {" "}
                {errors.subHeading && errors.subHeading.message}{" "}
              </small>
              <br />

              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                {...register("text", cmsValidation.text)}
              />
              <small className="text-danger">
                {" "}
                {errors.text && errors.text.message}{" "}
              </small>
              <br />

              <Form.Label>Heading2</Form.Label>
              <Form.Control
                type="text"
                {...register("heading_2", cmsValidation.heading_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.heading_2 && errors.heading_2.message}{" "}
              </small>
              <br />

              <Form.Label>Text2</Form.Label>
              <Form.Control
                type="text"
                {...register("text_2", cmsValidation.text_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.text_2 && errors.text_2.message}{" "}
              </small>
            </Col>
            <Col md={6}>
              <Form.Label>Image</Form.Label>
              <div>
                <img
                  src={section2?.image.url ? section2?.image.url : DummyImg}
                  alt={"preview"}
                  className={"preview_img"}
                />
              </div>
              <div className={"input_file"}>
                <input
                  type="file"
                  id="file-input"
                  accept="image/png, image/jpeg"
                  {...register("image", cmsValidation.image)}
                  onChange={(e) => {
                    setSelectedFile(e.target.files![0]);
                    setPreview(URL.createObjectURL(e.target.files![0]));
                  }}
                  className="file_input"
                />
                <small className="text-danger">
                  {" "}
                  {errors.image && errors.image.message}{" "}
                </small>
                <label className="file_label" htmlFor="file-input">
                  <AiOutlineCamera />
                  <span>Upload Image</span>
                </label>
              </div>
            </Col>
          </Row>
          <hr />
          <div className={"text-end my-4"}>
            <SaveBtn type={"submit"}>SAVE CHANGES</SaveBtn>
          </div>
        </Form>
      }
    </React.Fragment>
  );
};

export default Section2;
