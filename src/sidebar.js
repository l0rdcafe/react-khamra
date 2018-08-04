import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ venues, isFetched }) => {
  const data =
    venues.length > 0
      ? venues.map(venue => (
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
        ))
      : "No results found";
  return <ul className="sidebar">{isFetched ? data : "Please submit a radius to fetch venues"}</ul>;
};

export default Sidebar;
