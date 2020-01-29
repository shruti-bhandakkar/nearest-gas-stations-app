import React from 'react';
import gasStationIcon from '../images/gas_station.png';
import '../App.css';

class ListComponent extends React.Component {

  render() {
    return (
      <div className="cardStyle">
      <a href="#!" className="list-group-item list-group-item-action flex-column align-items-start">
        <div className="row">
          <div className="col-sm-3 col-lg-3">
            <img
              alt="gas station logo"
              src={"//logo.clearbit.com/" + this.props.stationData.station + ".com"}
              onError={(e)=>{e.target.onerror = null; e.target.src=gasStationIcon}}
            />
          </div>

          <div className="col-sm-9 col-lg-9">
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{this.props.stationData.station}</h5>
              <small>{this.props.stationData.distance}</small>
            </div>
            <p className="mb-1 addressFormat">
              {this.props.stationData.address + "\n" + this.props.stationData.region + "\n" + this.props.stationData.city}
            </p>
            <p>Price - ${this.props.stationData.reg_price}</p>
          </div>
        </div>
      </a>
      </div>
    );
  }
}

export default ListComponent;
