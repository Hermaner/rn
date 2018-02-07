import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.navigation.state.params.item,
    };
  }
  getInit = () => {
  }
  computeDate = (time) => {
    let target = (new Date().getTime() - new Date(time).getTime()) / 1000 / 60;
    if (target < 60) {
      target = parseInt(target, 10);
      return `${target}分钟前`;
    } else if (target >= 60 && target < (24 * 60)) {
      target = parseInt(target / 60, 10);
      return `${target}小时前`;
    }
    return time.substr(0, 10);
  }
  closeModal = () => {
    this.setState({
      ModalOpen: false,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
