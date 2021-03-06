import React from "react";
import Sidebar from "./sidebar";
import Map from "./map";

const Body = ({ lon, lat, radius, zoom, venues, isFetched, inProp }) => (
  <div className="body">
    <Sidebar venues={venues} isFetched={isFetched} />
    <Map lon={lon} lat={lat} radius={radius} zoom={zoom} venues={venues} inProp={inProp} />
  </div>
);

export default Body;
