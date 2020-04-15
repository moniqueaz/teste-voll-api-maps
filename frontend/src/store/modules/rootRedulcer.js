import { combineReducers } from "redux";

import search from "./search/reducer";
import map from "./map/reducer";

export default combineReducers({
  search,
  map,
});
