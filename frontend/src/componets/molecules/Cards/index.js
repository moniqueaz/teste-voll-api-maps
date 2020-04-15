import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
// import { useDispatch, useSelector } from "react-redux";
// import * as MapDispachToActions from "../../../store/actions/actionCreators";
// import Cards from "../../molecules/Cards";

import "./styles.scss";

const Cards = ({ name, address, rating, distance, phone }) => {
  // const { xxx } = useSelector((state) => state.xxx);
  // const dispatch = useDispatch();
  // const xxx = () => {
  //   dispatch(MapDispachToActions.xxx());
  // };

  const calcDistancia = ({
    lat_inicial,
    long_inicial,
    lat_final,
    long_final,
  }) => {
    const R = 6371; // km (change this constant to get miles)
    const dLat = ((lat_final - lat_inicial) * Math.PI) / 180;
    const dLon = ((long_final - long_inicial) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat_inicial * Math.PI) / 180) *
        Math.cos((lat_final * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    if (d > 1) return Math.round(d) + "km";
    else if (d <= 1) return Math.round(d * 1000) + "m";
    return d;
  };

  return (
    <div className="cards box-shadow">
      <label className="cards__label cards__name">{name}</label>
      <label className="cards__label cards__address">
        <span>Address: </span>
        {address}
      </label>
      <label className="cards__label cards__rating">
        <span>Rating: </span>
        {rating}
      </label>
      <label className="cards__label cards__distance">
        <span>Distance: </span>
        {calcDistancia(distance)}
      </label>
      <label className="cards__label cards__phone">
        <span>Phone: </span>
        {phone}
      </label>
    </div>
  );
};

Cards.defaultProps = {};

Cards.propTypes = {
  name: PropTypes.string,
  address: PropTypes.string,
  rating: PropTypes.number,
  distance: PropTypes.object,
  phone: PropTypes.string,
};

export default Cards;
