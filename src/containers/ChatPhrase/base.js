import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { getPhraseService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      refresh: false,
    };
  }
  getInit = () => {
    this.getPhraseService();
  }
  getPhraseService = () => {
    getPhraseService().then((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          items: res.data,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  add = () => {
    this.getPhraseService();
  }
  select = (text) => {
    DeviceEventEmitter.emit('phraseEmit', text);
    this.props.pop();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  pop: PropTypes.func,
};
export default Base;
