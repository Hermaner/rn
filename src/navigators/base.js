import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      isModalShow: false,
      shares: [{
        label: '固价需求',
        icon: 'ios-unlock',
        color: '#ff892f',
        page: 'FixedList',
      }, {
        label: '大众需求',
        icon: 'ios-clipboard',
        color: '#00CD66',
        page: 'DemandCategory',
      }],
    };
  }
  getInit = () => {
    this.emitmodalShow = DeviceEventEmitter.addListener('emitmodalShow', () => {
      this.showModal();
    });
  }
  showModal = () => {
    this.setState({
      isModalShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      isModalShow: false,
    });
  }
  go = () => {
    this.closeModal();
    this.props.dispatch({ type: 'push', routes: { key: 'ApplyWant' } });
  }
}
Base.propTypes = {
  dispatch: PropTypes.func,
};
export default Base;
