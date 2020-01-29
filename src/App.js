import React from 'react';
import axios from 'axios';
import { geolocated } from "react-geolocated";
import ListComponent from "./components/ListComponent";

class App extends React.Component {

  state = {
    data: {},
    loading: true,
  }

  componentDidMount() {
    console.log("in componentDidMount");
    if(this.props.coords) {
      axios.get("http://devapi.mygasfeed.com/stations/radius/" + this.props.coords.latitude + "/" + this.props.coords.longitude + "/8/reg/distance/rfej9napna.json",
                {headers: {"content-type": "application/json"}})
        .then(res => {
          const data = res.data;
          this.setState({
            data: data,
            loading: false
           });
        });
      }
    }

  componentDidUpdate(prevProps) {
    console.log(" in componentDidUpdate");
    if(prevProps.coords !== this.props.coords) {
      axios.get("http://devapi.mygasfeed.com/stations/radius/" + this.props.coords.latitude + "/" + this.props.coords.longitude + "/8/reg/distance/rfej9napna.json",
                {headers: {"content-type": "application/json"}})
        .then(res => {
          const data = res.data;
          this.setState({
            data: data,
            loading: false
           });
        });
      }
  }

  render() {
    if(this.state.loading) {
      return (
        <div className="d-flex justify-content-center cardStyle">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

    return (
      <div>
        <nav className="navbar navbar-light" style={{"backgroundColor": "#e3f2fd"}}>
          <a className="navbar-brand" href="#!">
            Nearest Gas Stations
          </a>
        </nav>

        {this.state.data.stations && this.state.data.stations.length > 0 ?
          this.state.data.stations.map(station => <ListComponent key={station.id} stationData={station}></ListComponent>)
          : <div id="noGasStationFound"> No Gas Stations Nearby </div>
        }
      </div>
    );
  }
}

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);
