import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const MapNewContainer = (props) => {
  const [markerCoords, setMarkerCoords] = useState({
    lat: null,
    lng: null,
  });

  const defaultLoc = {
    center: {
      lat: 42.3601, //Boston
      lng: -71.0589,
    },
    zoom: 12,
  };

  const handleMapClick = (event) => {
    setMarkerCoords({
      lat: event.lat,
      lng: event.lng,
    });
    props.handleChange(event.lat, event.lng);
  };

  return (
    <div style={{ height: "300px", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDTsqOcVhh7AP2Ppy0Bs6KRThy4kglpjvw" }}
        defaultCenter={defaultLoc.center}
        defaultZoom={defaultLoc.zoom}
        onClick={handleMapClick}
      >
        <Marker lat={markerCoords.lat} lng={markerCoords.lng} />
      </GoogleMapReact>
    </div>
  );
};

export default MapNewContainer;
