import React from 'react';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import citysJson from '../../api/citys.json';
import { DeepClone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      citys: DeepClone(citysJson),
    };
  }
  getDelete = () => {
    this.state = null;
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
    const { citys } = this.state;
    const data = {
      text: `${citys[index].name}`,
      ProvinceCode: citys[index].adcode,
    };
    DeviceEventEmitter.emit('emitMyFriend', data);
    this.props.pop();
  }
  changeAll = () => {
    const data = {
      text: '全国',
      ProvinceCode: '',
    };
    DeviceEventEmitter.emit('emitMyFriend', data);
    this.props.pop();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
