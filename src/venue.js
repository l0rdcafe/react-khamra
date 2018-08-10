import React from "react";
import { Link } from "react-router-dom";
import { H1, H3 } from "cc-ss-ui-kit";

const Venue = ({ venue }) => (
  <div className="details">
    <Link to="/map/venues">
      <i className="fas fa-arrow-left" />
    </Link>
    <H1>{venue.name}</H1>
    <H3>Address: {venue.location.address}</H3>
  </div>
);

export default Venue;
