import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import { ICoordinates } from "../../../interfaces";
import { errorNotify, successNotify } from "../../../util/toast";
import Loader from "../../../util/loader";
import Map from "../../Map/Map";
import useAuth from "../../../hooks/useAuth";
import AuthApi from "../../../api/auth";
import Geocode from "react-geocode";

const EditLocation = () => {
  const { auth, setAuth } = useAuth();
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<ICoordinates | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Geocode.setApiKey("AIzaSyAFsEP9H8HabaWXDeZzpZZ7-7JuVnXv2yk");
  }, []);

  useEffect(() => {
    if (auth) {
      setSelectedCoordinates({
        lat: auth?.location?.coordinates[1]!,
        lng: auth?.location?.coordinates[0]!,
      });
    }
  }, [auth]);

  const ChangeLocationHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCoordinates) {
      try {
        setLoading(true);

        const geoCodeRes = await Geocode.fromLatLng(
          selectedCoordinates.lat,
          selectedCoordinates.lng
        );

        const data = {
          location: {
            type: "Point",
            coordinates: [selectedCoordinates.lng, selectedCoordinates.lat],
          },
          address: geoCodeRes.results[0].formatted_address,
        };

        const res = await AuthApi.updateProfile(data);

        setAuth({
          ...auth,
          ...data,
        });

        successNotify(res.data.message);
        setLoading(false);
      } catch (e: any) {
        errorNotify(e.response.data.message);
        setLoading(false);
      }
    } else {
      errorNotify("Please Select Location");
    }
  };

  return (
    <Container>
      <h3>Edit Location</h3>
      {auth ? (
        <Form onSubmit={ChangeLocationHandler}>
          <Row>
            <Col md={12}>
              <Input>
                <Form.Label>Location</Form.Label>
                <Map
                  map={true}
                  search={true}
                  selectedCoordinate={selectedCoordinates}
                  setSelectedCoordinate={setSelectedCoordinates}
                />
              </Input>
            </Col>
            <Col md={12} className={"d-flex justify-content-end mt-4"}>
              <Button type="submit">
                {loading ? <Spinner animation="border" size="sm" /> : "Submit"}
              </Button>
            </Col>
          </Row>
        </Form>
      ) : (
        <Loader />
      )}
    </Container>
  );
};

export default EditLocation;
