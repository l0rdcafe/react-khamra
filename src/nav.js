import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ handleRadius, radius, fetchVenues }) => (
  <div className="nav">
    <h1>Khamra</h1>
    <p>Select radius in {radius} km</p>
    <input id="radius" min="1" max="30" list="tickmarks" defaultValue={radius} type="range" onInput={handleRadius} />
    <Link to="/map/venues">
      <button onClick={fetchVenues} id="drink">
        Submit
      </button>
    </Link>
  </div>
);

export default Nav;
