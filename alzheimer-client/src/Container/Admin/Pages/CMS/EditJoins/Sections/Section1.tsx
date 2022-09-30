import React, { useEffect, useState } from "react";
import { Col,Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { AiOutlineCamera } from "react-icons/ai";
import { useForm } from "react-hook-form";
import DummyImg from "../../../../../../Assets/preview_dummy.png";
import { IJoinsSection1 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import { successNotify } from "../../../../../../util/toast";
import Loader from '../../../../../../util/loader'

const Section1: React.FC<any> = ({ section1 }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IJoinsSection1>();

  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setPreview(section1?.image?.url);
    setLoading(false)
  }, [section1, setPreview]);

  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = {
      section_1: {
        image: data.image,
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
            <Col md={6} className="m-auto">
              <Form.Label>Image</Form.Label>
              <div>
                <img
                  src={section1?.image.url ? section1?.image.url : DummyImg}
                  alt={"preview"}
                  className={"preview_img"}
                />
              </div>
              <div className={"input_file"}>
                <input
                  type="file"
                  id="file-input3"
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
                <label className="file_label" htmlFor="file-input3">
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

export default Section1;
