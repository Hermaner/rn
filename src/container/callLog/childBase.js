import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import {  } from '../../api';

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
      isFollow: false,
    };
  }
  getData = () => {

  }
}
Base.propTypes = {
  type: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
