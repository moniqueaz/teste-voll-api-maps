import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoopIcon from "@material-ui/icons/Loop";
import * as MapDispachToActions from "../../../store/actions/actionCreators";
import Cards from "../../molecules/Cards";
import api from "../../../services/api";

import "./styles.scss";

const ListCards = () => {
  const { cards } = useSelector((state) => state.map);
  const { locations } = useSelector((state) => state.map);
  const { search } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);

  const handleToCards = async (data, location) => {
    const result = [];
    for (let dat of data) {
      const rsl = await api.get(
        `/details/?id=${dat.id}&lat=${location.lat}&lng=${location.lng}`
      );
      result.push(rsl.data);
    }
    dispatch(MapDispachToActions.mountToCards(result));
  };

  useEffect(() => {
    setLoader(false);
    locations && search && handleToCards(locations, search);
  }, [locations]);

  useEffect(() => {
    setLoader(true);
  }, [cards]);

  return (
    <>
      <div className="list-cards">
        {loader ? (
          <>
            {cards.map((item, index) => {
              return <Cards key={index} {...item} />;
            })}
          </>
        ) : (
          <div className="list-cards__loader">
            <LoopIcon className="loop" />
          </div>
        )}
      </div>
    </>
  );
};

export default ListCards;
