import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import citysJson from '../../api/citys.json';
import { DeepClone } from '../../api';

citysJson[0].cur = true;
citysJson[0].citys[0].cur = true;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: DeepClone(citysJson),
      leftIndex: 0,
      midIndex: 0,
    };
  }
  getDelete = () => {
    this.state = null;
  }
  selectCity = (index) => {
    const { citys, leftIndex, midIndex } = this.state;
    citys[leftIndex].citys[midIndex].cur = false;
    citys[leftIndex].citys[index].cur = true;
    this.setState({
      citys,
      midIndex: index,
    });
  }
  locationDistrict = () => {
    const { type } = this.props.navigation.state.params;
    const data = {
      sendDistrictCode: global.districtCode,
      sendCityCode: global.cityCode,
      sendProvinceCode: global.provinceCode,
      text: global.provinceName + global.districtName,
    };
    DeviceEventEmitter.emit(type, data);
    this.props.pop();
  }
  selectDistrict = (index) => {
    const { citys, leftIndex, midIndex } = this.state;
    const data = {
      text: `${citys[leftIndex].name}${citys[leftIndex].citys[midIndex].name}${citys[leftIndex].citys[midIndex].districts[index].name}`,
      sendProvinceCode: citys[leftIndex].adcode,
      sendCityCode: citys[leftIndex].citys[midIndex].adcode,
      sendDistrictCode: citys[leftIndex].citys[midIndex].districts[index].adcode,
    };
    const { type } = this.props.navigation.state.params;
    DeviceEventEmitter.emit(type, data);
    this.props.pop();
  }
  changeLeftTab = (index) => {
    const { citys, leftIndex, midIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    citys[index].cur = true;
    citys[leftIndex].cur = false;
    citys[leftIndex].citys[midIndex].cur = false;
    citys[index].citys[0].cur = true;
    this.setState({
      citys,
      midIndex: 0,
      leftIndex: index,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
