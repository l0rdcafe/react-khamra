import React from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { List, P } from "cc-ss-ui-kit";

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
  return (
    <List className="sidebar">
      <P primary align="center" style={!isFetched ? { paddingTop: "3%" } : null}>
        {isFetched ? data : <FormattedMessage id="detail.sidebarDefault" />}
      </P>
    </List>
  );
};

export default Sidebar;
