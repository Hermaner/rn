import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import citysJson from '../../api/citys.json';
import { DeepClone } from '../../api';

citysJson[0].cur = true;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: DeepClone(citysJson),
      leftIndex: 0,
    };
  }
  selectCity = (index) => {
    const { citys, leftIndex } = this.state;

    const data = {
      text: `${citys[leftIndex].name}${citys[leftIndex].citys[index].name}`,
      ProvinceCode: citys[leftIndex].adcode,
      CityName: citys[leftIndex].citys[index].name,
      CityCode: citys[leftIndex].citys[index].adcode,
    };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'cbj':
        emit = 'getBjCity';
        break;
      case 'cga':
        emit = 'getACity';
        break;
      case 'cgb':
        emit = 'getCity';
        break;
      default:
    }
    DeviceEventEmitter.emit(emit || type, data);
    this.props.pop();
  }
  locationDistrict = () => {
    const { type } = this.props.navigation.state.params;
    const data = {
      ProvinceCode: global.provinceCode,
      CityCode: global.cityCode,
      CityName: global.cityName,
    };
    DeviceEventEmitter.emit(type, data);
    this.props.pop();
  }
  changeLeftTab = (index) => {
    const { citys, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    citys[index].cur = true;
    citys[leftIndex].cur = false;
    this.setState({
      citys,
      leftIndex: index,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
