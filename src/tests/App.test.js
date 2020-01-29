import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import App from "../App";
import { geolocated } from "react-geolocated";
import ListComponent from "../components/ListComponent";

jest.mock('react-geolocated',()=>{
  return {
    geolocated:function(hocConf) {
            return function(component) {
                component.defaultProps = {
                    ...component.defaultProps,
                    isGeolocationAvailable: true,
                    isGeolocationEnabled: true,
                    coords: {
                        accuracy: 130,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        latitude: 10,
                        longitude: 10,
                        speed: null
                     }
                };
                return component;
            };
          }
  }
});

Enzyme.configure({ adapter: new Adapter() });

const mockUrl = "http://devapi.mygasfeed.com/stations/radius/33.0334208/-117.09153280000001/8/reg/distance/rfej9napna.json";
const mockResponse = {
  data: {
    stations: [
        {
            "country": "Canada",
            "reg_price": "3.65",
            "mid_price": "3.65",
            "pre_price": "3.65",
            "diesel_price": "3.65",
            "address": "3885, Boulevard Saint-Rose",
            "diesel": "0",
            "id": "33862",
            "lat": "45.492367",
            "lng": "-73.710915",
            "station": "Shell",
            "region": "Quebec",
            "city": "Saint-Laurent",
            "reg_date": "3 hours agp",
            "mid_date": "3 hours agp",
            "pre_date": "3 hours agp",
            "diesel_date": "3 hours agp",
            "distance": "1.9km"
        }
    ]
  }
}

describe("App component", () => {

  test("renders", () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test("when there are no stations nearby", () => {
    const wrapper = mount(<App />);
    wrapper.setState({data: { stations: []}});
    expect(wrapper.find("#noGasStationFound").text()).toEqual(' No Gas Stations Nearby ');
    expect(wrapper.exists(ListComponent)).toEqual(false);
  });

  test("should fetch gas station data", () => {
    const wrapper = mount(<App />);
    wrapper.setState({data: mockResponse.data});
    expect(wrapper.exists(ListComponent)).toEqual(true);
  });

});
