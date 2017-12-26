import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import citys from './citys.json';

class Base extends React.Component {
  constructor(props) {
    super(props);
    citys[0].cur = true;
    this.state = {
      citys,
      leftIndex: 0,
    };
  }
  selectCity = (index) => {
    const { citys, leftIndex } = this.state;
    const data = {
      text: `${citys[leftIndex].name}${citys[leftIndex].citys[index].name}`,
      ProvinceCode: citys[leftIndex].adcode,
      CityCode: citys[leftIndex].citys[index].adcode,
    };
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'cga':
        emit = 'getACity';
        break;
      case 'cgb':
        emit = 'getCity';
        break;
      default:
    }
    DeviceEventEmitter.emit(emit, data);
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
