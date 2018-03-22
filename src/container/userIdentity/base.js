import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetIdentityService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [],
    };
  }
  getData = () => {
    this.sleek.toggle();
    GetIdentityService({
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          type: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  clickOne = (identityId, identityName) => {
    const data = {
      IdentityId: identityId,
      IdentityName: identityName,
    };
    DeviceEventEmitter.emit('emitType', data);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
