const express = require("express");
const routes = express.Router();
const GoogleMap = require("./controllers/GoogleMaps");

const logRequest = (require, response, next) => {
  const { method, url } = require;
  const logLabel = `[${method.toUpperCase()} ${url}]`;

  console.time(logLabel);
  next();
  console.timeEnd(logLabel);
};

routes.use(logRequest);

// Local
//?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry
// &key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8
routes.get("/findplacefromtext/:address", GoogleMap.findplacefromtext);

// Redondesa
// https://maps.googleapis.com/maps/api/place/nearbysearch/json
// ?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=steakhouse&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8
routes.get("/nearbysearch/", GoogleMap.nearbysearch);

// Detalhes
// https://maps.googleapis.com/maps/api/place/details/json
// ?place_id=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,formatted_address,rating,geometry,formatted_phone_number
// &key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8
routes.get("/details/", GoogleMap.details);

module.exports = routes;
