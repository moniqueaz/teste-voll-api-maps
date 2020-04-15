import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Search from "../../molecules/Search";
import Map from "../../organisms/Map";
import ListCards from "../../organisms/ListCards";

import "../../../global.scss";

import "./styles.scss";

const SearchMap = () => {
  const { locations } = useSelector((state) => state.map);

  return (
    <div className="searchMap">
      <div className="container">
        <div className="grid grid--wrap">
          <div className="searchMap__search">
            <Search />
          </div>
          <div className="grid grid--wrap">
            <div
              className={`searchMap__list-cards ${
                locations.length === 0 && "hide"
              }`}
            >
              <ListCards />
            </div>
            <div className="searchMap__map">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchMap;
