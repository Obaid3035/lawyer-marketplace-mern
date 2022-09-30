import React, { useState } from "react";
import "./SearchLocation.scss";
import { useNavigate } from "react-router-dom";
import Input from "../../../../Components/Input/Input";
import { Form, Row, Col, Spinner } from "react-bootstrap";
import Button from "../../../../Components/Button/Button";
import { ICoordinates } from "../../../../interfaces";
import Map from "../../../../Components/Map/Map";

const SearchLocation = () => {
  const navigate = useNavigate();
  const [selectedCoordinates, setSelectedCoordinates] =
    useState<ICoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [address, setAddress] = useState(null);

  const LocationHandler = (e: any) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      if (selectedCoordinates) {
        setLoading(false);
        navigate(
          `/search?lat=${selectedCoordinates.lat}&lng=${selectedCoordinates.lng}&address=${address}`
        );
      } else {
        setLoading(false);
        setLocationError("Please Enter Your Location");
      }
    }, 2000);
  };

  return (
    <div className={"search_location"}>
      <Form onSubmit={LocationHandler}>
        <Row>
          <Col md={9}>
            <Input>
              <Map
                map={false}
                search={true}
                setAddress={setAddress}
                selectedCoordinate={selectedCoordinates}
                setSelectedCoordinate={setSelectedCoordinates}
              />
              {locationError ? (
                <small className={"text-danger"}>{locationError}</small>
              ) : null}
            </Input>
          </Col>
          <Col md={3}>
            <Button type="submit">
              {loading ? <Spinner animation="border" size="sm" /> : "Search"}
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default SearchLocation;
