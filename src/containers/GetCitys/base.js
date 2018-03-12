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
      type: props.navigation.state.params.type,
      midIndex: 0,
    };
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
  selectDistrict = (index) => {
    const { citys, leftIndex, midIndex, type } = this.state;
    const provinceName = citys[leftIndex].name;
    const cityName = citys[leftIndex].citys[midIndex].name;
    const districtName = citys[leftIndex].citys[midIndex].districts[index].name;
    const data = {
      addressTitle: `${provinceName}${cityName}${districtName}`,
      provinceId: citys[leftIndex].adcode,
      provinceName,
      cityId: citys[leftIndex].citys[midIndex].adcode,
      cityName,
      districtId: citys[leftIndex].citys[midIndex].districts[index].adcode,
      districtName,
    };
    DeviceEventEmitter.emit(type, data);
    this.props.pop();
  }
  locationDistrict = () => {
    const { type } = this.state;
    const data = {
      districtId: global.districtId,
      cityName: global.cityName,
    };
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
