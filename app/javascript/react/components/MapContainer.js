import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";

const MapContainer = (props) => {
  const [markerCoords, setMarkerCoords] = useState({
    lat: null,
    lng: null,
  });

  const defaultLoc = {
    center: {
      lat: 42.34,
      lng: -71.15,
    },
    zoom: 15,
  };

  const handleMapClick = (event) => {
    setMarkerCoords({
      lat: event.lat,
      lng: event.lng,
    });
  };

  useEffect(() => {
    props.handleChange(markerCoords.lat, markerCoords.lng);
  }, [markerCoords]);

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDTsqOcVhh7AP2Ppy0Bs6KRThy4kglpjvw" }}
          defaultCenter={defaultLoc.center}
          defaultZoom={defaultLoc.zoom}
          onClick={handleMapClick}
        >
          <Marker lat={markerCoords.lat} lng={markerCoords.lng} />
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default MapContainer;
