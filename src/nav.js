import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

const Nav = ({ handleRadius, radius, fetchVenues }) => (
  <div className="nav">
    <h1>
      <FormattedMessage id="detail.title" />
    </h1>
    <p>
      <FormattedMessage id="detail.slider" values={{ radius }} />
    </p>
    <input id="radius" min="1" max="30" list="tickmarks" defaultValue={radius} type="range" onInput={handleRadius} />
    <Link to="/map/venues">
      <button onClick={fetchVenues} id="drink">
        <FormattedMessage id="detail.submit" />
      </button>
    </Link>
  </div>
);

export default Nav;
