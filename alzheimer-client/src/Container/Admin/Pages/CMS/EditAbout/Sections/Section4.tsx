import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import SaveBtn from "../../../../../../Components/Button/Button";
import { useForm } from "react-hook-form";
import { IAboutSection4 } from "../../../../../../interfaces";
import { cmsValidation } from "../../../../../../lib/validation";
import Loader from '../../../../../../util/loader'
import { successNotify } from "../../../../../../util/toast";

const Section4: React.FC<any> = ({ section4 }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IAboutSection4>();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setValue("heading", section4?.heading);
    setValue("box_1.subHeading", section4?.box_1.subHeading);
    setValue("box_1.text", section4?.box_1.text);
    setValue("box_1.point_1", section4?.box_1.point_1);
    setValue("box_1.point_2", section4?.box_1.point_2);
    setValue("box_1.point_3", section4?.box_1.point_3);
    setValue("box_1.point_4", section4?.box_1.point_4);
    setValue("box_2.subHeading", section4?.box_2.subHeading);
    setValue("box_2.text", section4?.box_2.text);
    setValue("box_2.point_1", section4?.box_2.point_1);
    setValue("box_2.point_2", section4?.box_2.point_2);
    setValue("box_2.point_3", section4?.box_2.point_3);
    setValue("box_2.point_4", section4?.box_2.point_4);
    setValue("box_3.subHeading", section4?.box_3.subHeading);
    setValue("box_3.text", section4?.box_3.text);
    setValue("box_3.point_1", section4?.box_3.point_1);
    setValue("box_3.point_2", section4?.box_3.point_2);
    setValue("box_3.point_3", section4?.box_3.point_3);
    setValue("box_3.point_4", section4?.box_3.point_4);
    setLoading(false)
  }, [section4]);


  const onSubmitHandler = handleSubmit(async (data) => {
    const formData = {
      section_3: {
        heading: data.heading,
        box_1: {
          subHeading: data.box_1.subHeading,
          text: data.box_1.text,
          point_1: data.box_1.point_1,
          point_2: data.box_1.point_2,
          point_3: data.box_1.point_3,
          point_4: data.box_1.point_4,
        },
        box_2: {
          subHeading: data.box_2.subHeading,
          text: data.box_2.text,
          point_1: data.box_2.point_1,
          point_2: data.box_2.point_2,
          point_3: data.box_2.point_3,
          point_4: data.box_2.point_4,
        },
        box_3: {
          subHeading: data.box_3.subHeading,
          text: data.box_3.text,
          point_1: data.box_3.point_1,
          point_2: data.box_3.point_2,
          point_3: data.box_3.point_3,
          point_4: data.box_3.point_4,
        },
      },
    };
    successNotify("Form Submitted Successfully");
    console.log(formData);
  });
  return (
    <React.Fragment>
      {loading ? <Loader /> :
        <Form onSubmit={onSubmitHandler}>
          <Row>
            <Col md={12}>
              <Form.Label>Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("heading", cmsValidation.heading)}
              />
              <small className="text-danger">
                {" "}
                {errors.heading && errors.heading.message}
              </small>
              <br />

              <Form.Label>Box-1 Sub Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.subHeading", cmsValidation.box_1.subHeading)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.subHeading && errors.box_1?.subHeading.message}
              </small>
              <br />

              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.text", cmsValidation.box_1.text)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.text && errors.box_1?.text.message}
              </small>
              <br />

              <Form.Label>Point-1</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.point_1", cmsValidation.box_1.point_1)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.point_1 && errors.box_1?.point_1.message}
              </small>
              <br />

              <Form.Label>Point-2</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.point_2", cmsValidation.box_1.point_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.point_2 && errors.box_1?.point_2.message}
              </small>
              <br />

              <Form.Label>Point-3</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.point_3", cmsValidation.box_1.point_3)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.point_3 && errors.box_1?.point_3.message}
              </small>
              <br />

              <Form.Label>Point-4</Form.Label>
              <Form.Control
                type="text"
                {...register("box_1.point_4", cmsValidation.box_1.point_4)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_1?.point_4 && errors.box_1?.point_4.message}
              </small>
              <br />

              <hr className="mt-4" />

              <Form.Label>Box-2 Sub Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.subHeading", cmsValidation.box_2.subHeading)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.subHeading && errors.box_2?.subHeading.message}
              </small>
              <br />

              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.text", cmsValidation.box_2.text)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.text && errors.box_2?.text.message}
              </small>
              <br />

              <Form.Label>Point-1</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.point_1", cmsValidation.box_2.point_1)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.point_1 && errors.box_2?.point_1.message}
              </small>
              <br />

              <Form.Label>Point-2</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.point_2", cmsValidation.box_2.point_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.point_2 && errors.box_2?.point_2.message}
              </small>
              <br />

              <Form.Label>Point-3</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.point_3", cmsValidation.box_2.point_3)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.point_3 && errors.box_2?.point_3.message}
              </small>
              <br />

              <Form.Label>Point-4</Form.Label>
              <Form.Control
                type="text"
                {...register("box_2.point_4", cmsValidation.box_2.point_4)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_2?.point_4 && errors.box_2?.point_4.message}
              </small>
              <br />

              <hr className="mt-4" />

              <Form.Label>Box-3 Sub Heading</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.subHeading", cmsValidation.box_3.subHeading)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.subHeading && errors.box_3?.subHeading.message}
              </small>
              <br />

              <Form.Label>Text</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.text", cmsValidation.box_3.text)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.text && errors.box_3?.text.message}
              </small>
              <br />

              <Form.Label>Point-1</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.point_1", cmsValidation.box_3.point_1)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.point_1 && errors.box_3?.point_1.message}
              </small>
              <br />

              <Form.Label>Point-2</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.point_2", cmsValidation.box_3.point_2)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.point_2 && errors.box_3?.point_2.message}
              </small>
              <br />

              <Form.Label>Point-3</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.point_3", cmsValidation.box_3.point_3)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.point_3 && errors.box_3?.point_3.message}
              </small>
              <br />

              <Form.Label>Point-4</Form.Label>
              <Form.Control
                type="text"
                {...register("box_3.point_4", cmsValidation.box_3.point_4)}
              />
              <small className="text-danger">
                {" "}
                {errors.box_3?.point_4 && errors.box_3?.point_4.message}
              </small>
              <br />
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

export default Section4;
