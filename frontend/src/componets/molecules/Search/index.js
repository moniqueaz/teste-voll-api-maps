import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import LoopIcon from "@material-ui/icons/Loop";
import * as MapDispachToActions from "../../../store/actions/actionCreators";
import api from "../../../services/api";

import "./styles.scss";

const Search = ({ type, placeholder, value }) => {
  const [val, setVal] = useState(value);
  const [disabled, setDisabled] = useState(false);
  const { cards } = useSelector((state) => state.map);

  const dispatch = useDispatch();

  useEffect(() => {
    setDisabled(false);
  }, [cards]);

  const handleToMap = (valueSearch) => {
    dispatch(MapDispachToActions.mountToSearch(valueSearch));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (e.target.value !== "") {
      const result = await api.get(`/findplacefromtext/${convertString(val)}`);
      setDisabled(true);
      handleToMap(result.data);
    }
  };

  const convertString = (text) => {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  return (
    <form onSubmit={(e) => handleSearch(e)}>
      <div className="search grid grid--center">
        <input
          className="search__input box-shadow"
          type={type}
          placeholder={placeholder}
          value={val}
          onChange={(e) => setVal(e.target.value)}
        />
        <Button
          variant="contained"
          className="search__button"
          variant="contained"
          disabled={disabled && disabled}
          type="submit"
        >
          {disabled ? (
            <LoopIcon className="search__icon loop" />
          ) : (
            <SearchIcon className="search__icon" />
          )}
        </Button>
      </div>
    </form>
  );
};

Search.defaultProps = {
  type: "text",
  placeholder: "Endereço",
  value: "",
};

Search.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
};

export default Search;
