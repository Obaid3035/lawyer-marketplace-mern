import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { useForm } from "react-hook-form";
import { IJoinsSection2 } from "../../../../../../interfaces";
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
    formState: { errors },
    setValue,
    reset,
  } = useForm<IJoinsSection2>();

  useEffect(() => {
    setValue("heading", section2?.heading);
    setValue("text", section2?.text);
    setValue("heading_2", section2?.heading_2);
    setValue("point_1", section2?.point_1);
    setValue("point_2", section2?.point_2);
    setValue("point_3", section2?.point_3);
    setValue("point_4", section2?.point_4);
    setPreview(section2?.image?.url);
    setLoading(false)
  }, [section2, setValue, setPreview]);

  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = {
      section_2: {
        heading: data.heading,
        text: data.text,
        heading_2: data.heading_2,
        image: data.image,
        point_1: data.point_1,
        point_2: data.point_2,
        point_3: data.point_3,
        point_4: data.point_4,
      },
    };
    console.log(formData);
    reset();
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

              <Form.Label>Point-1</Form.Label>
              <Form.Control
                type="text"
                {...register("point_1", cmsValidation.point_1)}
              />
              <small className="text-danger">
                {" "}
                {errors.point_1 && errors.point_1.message}{" "}
              </small>
              <br />

              <Form.Label>Point-2</Form.Label>
              <Form.Control
                type="text"
                {...register("point_2", cmsValidation.point_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.point_2 && errors.point_2.message}{" "}
              </small>
              <br />

              <Form.Label>Point-3</Form.Label>
              <Form.Control
                type="text"
                {...register("point_3", cmsValidation.point_3)}
              />
              <small className="text-danger">
                {" "}
                {errors.point_3 && errors.point_3.message}{" "}
              </small>
              <br />

              <Form.Label>Point-4</Form.Label>
              <Form.Control
                type="text"
                {...register("point_4", cmsValidation.point_4)}
              />
              <small className="text-danger">
                {" "}
                {errors.point_4 && errors.point_4.message}{" "}
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
                  id="file-input4"
                  accept="image/png, image/jpeg"
                  {...register("image", cmsValidation.image)}
                  onChange={(e) => {
                    setSelectedFile(e.target.files![0]);
                    setPreview(URL.createObjectURL(e.target.files![0]));
                  }}
                  className="file_input"
                />
                <small className="text-danger text-center">
                  {" "}
                  {errors.image && errors.image.message}{" "}
                </small>
                <label className="file_label" htmlFor="file-input4">
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
