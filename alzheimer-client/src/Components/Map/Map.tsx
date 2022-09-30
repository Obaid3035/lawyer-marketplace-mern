import React, { useState } from "react";
import LocationIcon from "../../Assets/location_icon.png";
import "./Map.scss";

import {
  Autocomplete,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Form } from "react-bootstrap";

interface IMap {
  map: boolean;
  search: boolean;
  setAddress?: any;
  selectedCoordinate: google.maps.LatLngLiteral | null;
  setSelectedCoordinate: any;
}

const Map: React.FC<IMap> = ({
  map,
  setAddress,
  search,
  selectedCoordinate,
  setSelectedCoordinate,
}) => {
  useState<google.maps.LatLngLiteral | null>(null);
  const [autocomplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [place, setPlace] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAFsEP9H8HabaWXDeZzpZZ7-7JuVnXv2yk",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <p>...Loading</p>;
  }

  const getGeocodeByCoordinate = (coordinate: google.maps.LatLngLiteral) => {
    const geocoder = new google.maps.Geocoder();
    geocoder
      .geocode({ location: coordinate })
      .then((response: { results: any[] }) => {
        if (response.results[0]) {
          setPlace(response.results[0].formatted_address);
          if (setAddress) {
            setAddress(response.results[0].formatted_address);
          }
        }
      });
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        const coordinate = {
          lat: latitude,
          lng: longitude,
        };
        setSelectedCoordinate(coordinate);
        getGeocodeByCoordinate(coordinate);
      }
    );
  };

  const onLoad = (e: google.maps.places.Autocomplete) => {
    setAutoComplete(e);
  };

  const onPlaceChanged = () => {
    if (autocomplete) {
      setPlace(autocomplete.getPlace().formatted_address!);
      if (setAddress) {
        setAddress(autocomplete.getPlace().formatted_address);
      }
      const coordinate = {
        lat: autocomplete.getPlace().geometry!.location!.lat(),
        lng: autocomplete.getPlace().geometry!.location!.lng(),
      };
      setSelectedCoordinate(coordinate);
    }
  };

  return (
    <React.Fragment>
      {search ? (
        <div className={"d-flex w-100 align-items-center"}>
          <Autocomplete
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            className={"w-100"}
          >
            <Form.Control
              onChange={(e) => setPlace(e.target.value)}
              value={place}
            />
          </Autocomplete>
          <div className={"location_img"} onClick={getCurrentLocation}>
            <img src={LocationIcon} alt={"location-icon"} />
          </div>
        </div>
      ) : null}
      {selectedCoordinate && map ? (
        <GoogleMap
          center={selectedCoordinate}
          zoom={15}
          mapContainerStyle={{
            width: "100%",
            height: "300px",
            marginTop: "10px",
          }}
        >
          <Marker
            icon={{
              url: "data:image/svg+xml;base64,PHN2ZyBiYXNlUHJvZmlsZT0iZnVsbCIgd2lkdGg9Ijg2IiBoZWlnaHQ9Ijg2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGRlZnM+CiAgICAgICAgPGZpbHRlciBpZD0iYSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KICAgICAgICAgICAgPGZlRHJvcFNoYWRvdyBkeD0iMCIgZHk9Ii41IiBzdGREZXZpYXRpb249Ii45IiBmbG9vZC1jb2xvcj0iIzkzOTM5OCIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGNpcmNsZSBjeD0iNDMiIGN5PSI0MyIgcj0iOCIgZmlsbD0iIzk0YzdmZiI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgZnJvbT0iMTEiIHRvPSI0MCIgZHVyPSIycyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPgogICAgICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIGZyb209IjEiIHRvPSIwIiBkdXI9IjJzIiBiZWdpbj0iMHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIi8+CiAgICA8L2NpcmNsZT4KICAgIDxjaXJjbGUgY3g9IjQzIiBjeT0iNDMiIHI9IjgiIGZpbGw9IiNmZmYiIGZpbHRlcj0idXJsKCNhKSIvPgogICAgPGNpcmNsZSBjeD0iNDMiIGN5PSI0MyIgcj0iNSIgZmlsbD0iIzAxN2FmZiI+CiAgICAgICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iciIgdmFsdWVzPSI1OzYuNTs1IiBiZWdpbj0iMHMiIGR1cj0iNC41cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgIDwvY2lyY2xlPgo8L3N2Zz4K",
            }}
            position={selectedCoordinate}
          />
        </GoogleMap>
      ) : null}
    </React.Fragment>
  );
};

export default Map;
