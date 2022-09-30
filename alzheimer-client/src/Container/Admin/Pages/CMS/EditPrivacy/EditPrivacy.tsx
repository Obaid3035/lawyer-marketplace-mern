import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactQuill from "react-quill";
import "../EditHome/EditHome.scss";
import { useForm } from "react-hook-form";
import { formats, modules } from "../../../../../lib/helper";
import SaveBtn from "../../../../../Components/Button/Button";
import { IPrivacyPolicy } from "../../../../../interfaces/index";
import DummyImg from "../../../../../Assets/preview_dummy.png";
import { cmsValidation } from "../../../../../lib/validation";
import { AiOutlineCamera } from "react-icons/ai";
import { errorNotify, successNotify } from "../../../../../util/toast";
import { getPrivacyPolicySections } from "../../../../../api/CMS";
import Loader from "../../../../../util/loader";

const EditPrivacy = () => {
  const [quillData, setQuillData] = useState<any>("");
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const [preview, setPreview] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [getPrivacyPolicy, setPrivacyPoilcy] = useState<IPrivacyPolicy>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<IPrivacyPolicy>();

  useEffect(() => {
    getPrivacyPolicySections().then((res) => {
      console.log(res);
      setPrivacyPoilcy(res?.data?.privacyPolicy[0]);
      setQuillData(res?.data?.privacyPolicy[0]?.text);
    });
    setLoading(false);
  }, [setValue]);

  console.log(getPrivacyPolicy);
  console.log(quillData);

  const onSubmitHandler = handleSubmit(async (data) => {
    if (Object.keys(quillData).length === 0) {
      errorNotify("please fill the text editor");
    } else {
      const formData = {
        privacyPolicy: {
          text: quillData,
          image: data.image,
        },
      };
      console.log(formData);
      reset();
      successNotify("Form Submitted Successfully");
    }
  });

  return (
    <div>
      <div className="editor_container">
        {loading ? (
          <Loader />
        ) : (
          <Form onSubmit={onSubmitHandler}>
            <Row>
              <Col md={6}>
                <ReactQuill
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  value={quillData}
                  onChange={setQuillData}
                />
              </Col>
              <Col md={6}>
                <Form.Label>Image</Form.Label>
                <div>
                  <img
                    src={preview ? preview : DummyImg}
                    alt={"preview"}
                    className={"preview_img"}
                  />
                </div>
                <div className={"input_file"}>
                  <input
                    type="file"
                    id="file-input5"
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
                  <label className="file_label" htmlFor="file-input5">
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
        )}
      </div>
    </div>
  );
};

export default EditPrivacy;
