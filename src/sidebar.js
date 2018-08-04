import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ venues }) => {
  let result;
  if (typeof venues === "string") {
    result = venues;
  } else {
    result = venues.map(venue => (
      <Link
        to={`/venue/${venue.name
          .toLowerCase()
          .split(" ")
          .join("-")}`}
        key={venue.name}
      >
        <li style={{ textAlign: "left" }}>
          <h5>{venue.name}</h5>
        </li>
      </Link>
    ));
  }
  return <ul className="sidebar">{result}</ul>;
};

export default Sidebar;
