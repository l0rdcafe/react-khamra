import { CLIENT_ID, CLIENT_SECRET } from "./secrets";

const fetchVenues = async (lat, lon, rad) => {
  const convertedRadius = rad * 1000;
  const url = `https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${lat},${lon}&radius=${convertedRadius}&section=drinks&v=20180707&limit=20`;

  let data;
  try {
    data = await fetch(url);
    data = await data.json();
    data = await data.response.groups[0];
    const { items } = data;

    const venues =
      items.length > 0
        ? items.map(item => {
            const { id, name } = item.venue;
            const { distance, formattedAddress, lat, lng } = item.venue.location;
            const location = {
              distance,
              address: formattedAddress.join(" "),
              lat,
              lng
            };
            return {
              id,
              name,
              location
            };
          })
        : [];
    return venues;
  } catch (err) {
    throw new Error(err);
  }
};

export default fetchVenues;
