import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      shares: [{
        label: '微信',
        icon: 'md-alarm',
        color: '#62b900',
      }, {
        label: '朋友圈',
        icon: 'md-alarm',
        color: '#556876',
      }, {
        label: '微博',
        icon: 'md-alarm',
        color: '#fc5e6a',
      }, {
        label: 'QQ',
        icon: 'md-alarm',
        color: '#68a5e1',
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
