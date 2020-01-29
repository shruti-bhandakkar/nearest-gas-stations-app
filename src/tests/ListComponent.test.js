import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ListComponent from "../components/ListComponent";

Enzyme.configure({ adapter: new Adapter() });

const mockStationData = {
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

describe("List Component ", () => {

  test("renders", () => {
    const wrapper = shallow(<ListComponent stationData = {mockStationData} />);
    expect(wrapper.exists()).toBe(true);
  });

  test("station name is correct", () => {
    const wrapper = shallow(<ListComponent stationData = {mockStationData} />);
    expect(wrapper.find("h5").text()).toEqual("Shell");
  });

});
