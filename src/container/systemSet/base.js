import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
    };
  }
  clear = () => {
    const { push } = this.props;
    AsyncStorage.removeItem('userData');
    global.userData = null;
    global.memberId = null;
    global.masterId = null;
    UserSocket.changeData({});
    push({ key: 'User' });
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
