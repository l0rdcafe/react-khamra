import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { Link } from "react-router-dom";
import { API_KEY } from "./secrets";

class Map extends React.Component {
  constructor(props) {
    super(props);
    const { lon, lat, radius, zoom } = props;

    this.state = {
      viewport: {
        longitude: Number(lon),
        latitude: Number(lat),
        radius,
        zoom,
        width: 922,
        height: 600
      },
      userCoords: {
        lon,
        lat
      }
    };
  }
  render() {
    const { lon, lat } = this.state.userCoords;
    const { venues } = this.props;

    return (
      <div className="map">
        <ReactMapGL
          mapboxApiAccessToken={API_KEY}
          {...this.state.viewport}
          onViewportChange={viewport => this.setState({ viewport })}
        >
          <Marker longitude={Number(lon)} latitude={Number(lat)}>
            <div className="dot" />
          </Marker>
          {venues.map(venue => (
            <Marker key={venue.name} longitude={Number(venue.location.lng)} latitude={Number(venue.location.lat)}>
              <Link
                to={`/venue/${venue.name
                  .toLowerCase()
                  .split(" ")
                  .join("-")}`}
              >
                <div className="venue" />
              </Link>
              <span className="venue__name">{venue.name}</span>
            </Marker>
          ))}
        </ReactMapGL>
      </div>
    );
  }
}

export default Map;
