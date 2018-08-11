import React from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import { FaBeer } from "react-icons/fa";
import { Link } from "react-router-dom";
import Transition from "react-transition-group/Transition";
import { duration, defaultStyle, transitionStyles } from "./animation";
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
    const { venues, inProp } = this.props;

    return (
      <Transition in={inProp} timeout={duration}>
        {transState => (
          <div className="map" style={{ ...defaultStyle, ...transitionStyles[transState] }}>
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
                    <FaBeer style={{ color: "gold" }} />
                  </Link>
                  <span className="venue__name">{venue.name}</span>
                </Marker>
              ))}
            </ReactMapGL>
          </div>
        )}
      </Transition>
    );
  }
}

export default Map;
