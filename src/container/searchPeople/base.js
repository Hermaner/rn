import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetMemberByNickNameOrPhone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      searchList: [],
    };
  }
  onSearchChange = (userInfo) => {
    this.setState({
      userInfo,
    });
    GetMemberByNickNameOrPhone({
      criteria: userInfo,
    }).then((res) => {
      // console.log('11111111111', res)
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          searchList: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  login = () => {
    const { userInfo } = this.state;
    this.setState({
      searchList: [],
    });
    GetMemberByNickNameOrPhone({
      criteria: userInfo,
    }).then((res) => {
      // console.log('11111111111', res)
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          searchList: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
