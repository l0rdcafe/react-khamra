import React from "react";
import Sidebar from "./sidebar";
import Map from "./map";

const Body = ({ lon, lat, radius, zoom, venues }) => (
  <div className="body">
    <Sidebar venues={venues} />
    <Map lon={lon} lat={lat} radius={radius} zoom={zoom} venues={venues} />
  </div>
);

export default Body;
