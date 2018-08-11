import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { Button, P } from "cc-ss-ui-kit";

const Nav = ({ handleRadius, radius, fetchVenues }) => (
  <div className="nav">
    <h1>
      <FormattedMessage id="detail.title" />
    </h1>
    <P align="center" primary>
      <FormattedMessage id="detail.slider" values={{ radius }} />
    </P>
    <input id="radius" min="1" max="30" list="tickmarks" defaultValue={radius} type="range" onInput={handleRadius} />
    <Link to="/map/venues">
      <Button primary onClick={fetchVenues}>
        <FormattedMessage id="detail.submit" />
      </Button>
    </Link>
  </div>
);

export default Nav;
