import React from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Nav from "./nav";
import Footer from "./footer";
import Loading from "./loading";
import Body from "./body";
import Sidebar from "./sidebar";
import VenueDetails from "./venue";
import getVenues from "./foursquare-api";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lon: "",
      lat: "",
      radius: 10,
      zoom: 13,
      loading: true,
      venues: [],
      isFetched: false,
      transitionIn: false
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
  fetchVenues = async () => {
    const { lon, lat, radius } = this.state;
    const venues = await getVenues(lat, lon, radius);
    this.setState({ venues, isFetched: true, transitionIn: true });
  };
  render() {
    const { radius, loading, lon, lat, error, zoom, venues, isFetched, transitionIn } = this.state;
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
            render={() =>
              lon &&
              lat && (
                <Body
                  lon={lon}
                  radius={radius}
                  lat={lat}
                  zoom={zoom}
                  venues={venues}
                  isFetched={isFetched}
                  inProp={transitionIn}
                />
              )
            }
          />
          {venues.map(venue => (
            <Route
              path={`/venue/${venue.name
                .toLowerCase()
                .split(" ")
                .join("-")}`}
              key={`/venue/${venue.name.toLowerCase()}`}
              render={() => (
                <div className="body">
                  <Sidebar venues={venues} isFetched={isFetched} inProp={transitionIn} />
                  <VenueDetails venue={venue} />
                </div>
              )}
            />
          ))}
        </div>
      </Router>
    );
  }
}

export default App;
