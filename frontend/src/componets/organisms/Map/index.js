import React, { useEffect, useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { useDispatch, useSelector } from "react-redux";
import * as MapDispachToActions from "../../../store/actions/actionCreators";
import api from "../../../services/api";

import "./styles.scss";

const MapContainer = ({ google }) => {
  const maps = google.maps;
  const { search } = useSelector((state) => state.search);
  const { locations } = useSelector((state) => state.map);

  const [location, setLocation] = useState({});
  const center = {
    lat: -22.9068467,
    lng: -43.1728965,
  };
  const dispatch = useDispatch();
  const handlePin = (data) => {
    dispatch(MapDispachToActions.mountToLocation(data));
  };

  const getCards = async ({ lat, lng }) => {
    const result = await api.get(`/nearbysearch/?lat=${lat}&lng=${lng}`);
    handlePin(result.data);
  };

  useEffect(() => {
    setLocation({ ...search });
    search && getCards(search);
  }, [search]);

  useEffect(() => {}, [locations]);

  useEffect(() => {}, []);

  return (
    <>
      <Map
        google={google}
        zoom={16}
        initialCenter={center}
        center={location}
        className="map"
      >
        <Marker position={new maps.LatLng({ ...location })} />

        {locations.map((local) => {
          return <Marker position={new maps.LatLng({ ...local })} />;
        })}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8",
})(MapContainer);
