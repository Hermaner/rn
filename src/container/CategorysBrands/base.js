import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: global.brands,
    };
  }
  getInit = () => {
  }
  brandTab = (index) => {
    const { brands } = this.state;
    DeviceEventEmitter.emit('emitBrands', brands[index]);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
