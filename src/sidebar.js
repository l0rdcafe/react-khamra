import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Sidebar = ({ venues, isFetched }) => {
  const data =
    venues.length > 0 ? (
      venues.map(venue => (
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
    ) : (
      <FormattedMessage id="detail.sidebar" />
    );
  return <ul className="sidebar">{isFetched ? data : <FormattedMessage id="detail.sidebarDefault" />}</ul>;
};

export default Sidebar;
