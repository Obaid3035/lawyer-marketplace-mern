import React, { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import LocationIcon from "../../Assets/location_icon.png";
import "./MapInput.scss";
import { ICoordinates, IMapInputProps } from "../../interfaces";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }: any) => <div>{text}</div>;

const MapInput: React.FC<any> = ({
  setSelectedCoordinates,
  selectedCoordinates,
  showMap,
}) => {
  const [markerCoordinates, setMarkerCoordinates] =
    useState<ICoordinates | null>(null);
  const [googlePlace, setGooglePlace] = useState<any>(null);
  // const getCurrentLocation = () => {
  //     setSelectedCoordinates(null)
  //     navigator.geolocation.getCurrentPosition(function ({coords: {latitude, longitude}}) {
  //         let coordinate = {
  //             lat: latitude,
  //             lng: longitude
  //         }
  //         setSelectedCoordinates(coordinate)
  //         setMarkerCoordinates(coordinate)
  //
  //         geocoder
  //             .geocode({ location: coordinate })
  //             .then((response: { results: any[]; }) => {
  //                 if (response.results[0]) {
  //                     let googleOption = {
  //                         label: response.results[0].formatted_address,
  //                         value: response.results[0],
  //                     }
  //                     setGooglePlace(googleOption)
  //                 }
  //             })
  //     });
  // }

  const onPlaceSearch = (place: { label: string }) => {
    setSelectedCoordinates(null);
    setGooglePlace(place);
    geocodeByAddress(place.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let coordinate = {
          lat,
          lng,
        };
        console.log(coordinate);
        setSelectedCoordinates(coordinate);
        setMarkerCoordinates(coordinate);
      });
  };

  // const onMapClickHandler: mapEventHandler = (IMapProps, _Map, mapCoordinates) => {
  //     setSelectedCoordinates(null)
  //     const {latLng} = mapCoordinates;
  //     let coordinate = {
  //         lat: latLng.lat(),
  //         lng: latLng.lng()
  //     }
  //     setSelectedCoordinates(coordinate)
  //     setMarkerCoordinates(coordinate)
  // }

  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  let map = (
    <div className={"text-center mt-3"}>
      <p />
    </div>
  );
  if (selectedCoordinates) {
    map = (
      <div
        style={{
          position: "relative",
          minHeight: "300px",
        }}
      >
        <div className={"mb-4"}>
          {/*@ts-ignore*/}
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyAFsEP9H8HabaWXDeZzpZZ7-7JuVnXv2yk",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            {/*@ts-ignore*/}
            <AnyReactComponent
              lat={selectedCoordinates.lat}
              lng={selectedCoordinates.lng}
              text="My Marker"
            />
          </GoogleMapReact>
        </div>
      </div>
    );
  }

  return (
    <React.Fragment>
      <div className={"d-flex w-100 align-items-center"}>
        <div className={"w-100"}>
          <GooglePlacesAutocomplete
            apiKey={"AIzaSyAy5GKZXkhiHbt_J_MN__a2ylt9N6jlN3U"}
            selectProps={{
              className: "form_group",
              placeholder: "Enter Location",
              value: googlePlace,
              onChange: (place: any) => onPlaceSearch(place),
            }}
          />
        </div>
        {/*<div className={'location_img'} onClick={getCurrentLocation}>*/}
        {/*    <img src={LocationIcon} alt={'location-icon'}/>*/}
        {/*</div>*/}
      </div>
      {showMap ? map : null}
    </React.Fragment>
  );
};
export default MapInput;
