import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        name: '刘德华',
        time: '2018-08-09',
      }, {
        name: '胡歌',
        time: '2018-08-09',
      }],
    };
  }
}
Base.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
