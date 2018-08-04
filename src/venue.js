import React from "react";
import { Link } from "react-router-dom";

const Venue = ({ venue }) => (
  <div className="details">
    <Link to="/map/venues">
      <i className="fas fa-arrow-left" />
    </Link>
    <h1>{venue.name}</h1>
    <h3>Address: {venue.location.address}</h3>
  </div>
);

export default Venue;
