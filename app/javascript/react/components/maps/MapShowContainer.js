import React from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const MapShowContainer = (props) => {
  const loc = {
    center: {
      lat: props.stepLat,
      lng: props.stepLng,
    },
    zoom: 16,
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDTsqOcVhh7AP2Ppy0Bs6KRThy4kglpjvw" }}
        defaultCenter={loc.center}
        defaultZoom={loc.zoom}
      >
        <Marker lat={loc.center.lat} lng={loc.center.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default MapShowContainer;
