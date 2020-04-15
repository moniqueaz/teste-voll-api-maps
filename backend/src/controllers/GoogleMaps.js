const api = require("../services/api");

module.exports = {
  async findplacefromtext(request, response) {
    const { address } = request.params;
    const result = await api
      .get(
        `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${decodeURI(
          address
        )}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8`
      )
      .then((result) => {
        return response
          .status(200)
          .json(result.data.candidates[0].geometry.location);
      })
      .catch((error) => {
        return response.status(500).json({ error: error });
      });
    return result;
  },

  // async getNearbysearch(location) {
  //   const { lat, lng } = location;
  //   const result = await api
  //     .get(
  //       `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=steakhouse&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8`
  //     )
  //     .then((result) => {
  //       return response.status(200).json(result.data);
  //     })
  //     .catch((error) => {
  //       return response.status(500).json({ error: error });
  //     });
  //   return result;
  // },

  // async getDetails(data){
  //   for(let item in data){
  //     const result = await api
  //       .get(
  //         `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,rating,geometry,formatted_phone_number&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8`
  //       )
  //       .then((result) => {
  //         return response.status(200).json(result.data);
  //       })
  //       .catch((error) => {
  //         return response.status(500).json({ error: error });
  //       });
  //   }
  //   return result;
  // },

  async nearbysearch(request, response) {
    const { lat, lng } = request.query;
    const result = await api
      .get(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&type=restaurant&keyword=churrascaria&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8`
      )
      .then((result) => {
        const resultJson = result.data.results.map((item) => {
          return {
            id: item.place_id,
            lat: item.geometry.location.lat,
            lng: item.geometry.location.lng,
          };
        });
        return response.status(200).json(resultJson);
      })
      .catch((error) => {
        return response.status(500).json({ error: error });
      });
    return result;
  },

  async details(request, response) {
    const { id, lat, lng } = request.query;
    const result = await api
      .get(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=name,formatted_address,rating,geometry,formatted_phone_number&key=AIzaSyBBpCFyvFaOIEmJcYsy__Kw4ZDZvUwdIE8`
      )
      .then((result) => {
        const resultJson = {
          name: result.data.result.name,
          address: result.data.result.formatted_address,
          rating: result.data.result.rating,
          distance: {
            lat_inicial: parseFloat(lat),
            long_inicial: parseFloat(lng),
            lat_final: result.data.result.geometry.location.lat,
            long_final: result.data.result.geometry.location.lng,
          },
          phone: result.data.result.formatted_phone_number,
        };
        return response.status(200).json(resultJson);
      })
      .catch((error) => {
        return response.status(500).json({ error: error });
      });
    return result;
  },
};
