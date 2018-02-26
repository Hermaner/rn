import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberDecorationService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memberId: '2' || global.memberId,
      items: [],
    };
  }
  getInit = () => {
    this.GetMemberDecorationService();
  }
  GetMemberDecorationService = () => {
    const {
      memberId,
    } = this.state;
    GetMemberDecorationService({
      memberId,
    }).then((res) => {
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
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
