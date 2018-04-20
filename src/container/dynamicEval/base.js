import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetScoreInfoService, GetMemberInfoService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: '',
      commentInfo: '',
    };
  }
  getInit = () => {
    const { memberId } = this.props.navigation.state.params;
    this.setState({ memberId }, this.getData);
  }
  getDelete = () => {
    this.state = null;
  }
  getData = () => {
    const { memberId } = this.state;
    this.sleek.toggle();
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    GetScoreInfoService({
      memberId,
    }).then((res) => {
      // console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          commentInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  tellPhone = () => {
    Communications.phonecall(global.phone, false);
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
