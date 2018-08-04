import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import Loading from "./loading";
import Body from "./body";
import Sidebar from "./sidebar";
import VenueDetails from "./venue";
import { CLIENT_ID, CLIENT_SECRET } from "./secrets";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lon: "",
      lat: "",
      radius: 10,
      zoom: 13,
      loading: true,
      venues: "Please submit a radius to fetch venues"
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.setLoc, err => {
        this.handleLocErr("Please provide your location");
      });
    } else {
      this.handleLocErr("Geolocation is not supported on this browser");
    }
  }
  setLoc = pos => {
    const lon = pos.coords.longitude;
    const lat = pos.coords.latitude;
    this.setState({ lon, lat, loading: false });
  };
  handleLocErr = msg => {
    this.setState({ error: msg, loading: false });
  };
  handleRadius = e => {
    const radius = e.target.value;
    this.setState({ radius });
  };
  fetchVenues = () => {
    const { lon, lat, radius } = this.state;
    const convertedRadius = radius * 1000;
    const url = `https://api.foursquare.com/v2/venues/explore?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&ll=${lat},${lon}&radius=${convertedRadius}&section=drinks&v=20180707&limit=20`;

    fetch(url)
      .then(res => res.json())
      .then(data => this.setVenues(data.response.groups[0].items))
      .catch(err => err.message);
  };
  setVenues = items => {
    const venues =
      items.length > 0
        ? items.map(item => {
            const { id, name } = item.venue;
            const { distance, formattedAddress, lat, lng } = item.venue.location;
            const location = {
              distance,
              address: formattedAddress.join(" "),
              lat,
              lng
            };
            return {
              id,
              name,
              location
            };
          })
        : "No results found";

    this.setState({ venues });
  };
  render() {
    const { radius, loading, lon, lat, error, zoom, venues } = this.state;
    return (
      <Router>
        <div>
          <Route
            path="/"
            render={() => (
              <div>
                <Nav handleRadius={this.handleRadius} radius={radius} fetchVenues={this.fetchVenues} />
                {loading && <Loading />}
                {!loading && !error && <Redirect to="/map" />}
                <Footer />
              </div>
            )}
          />
          <Route
            path="/map"
            render={() => lon && lat && <Body lon={lon} radius={radius} lat={lat} zoom={zoom} venues={venues} />}
          />
          {Array.isArray(venues)
            ? venues.map(venue => (
                <Route
                  path={`/venue/${venue.name
                    .toLowerCase()
                    .split(" ")
                    .join("-")}`}
                    key={`/venue/${venue.name.toLowerCase()}`}
                  render={() => (
                    <div className="body">
                      <Sidebar venues={venues} />
                      <VenueDetails venue={venue} />
                    </div>
                  )}
                />
              ))
            : null}
        </div>
      </Router>
    );
  }
}

export default App;
