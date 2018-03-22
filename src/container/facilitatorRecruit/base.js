import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetEnlistImgService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headImgUrl: '',
      phone: '400400400',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    this.sleek.toggle();
    GetEnlistImgService({
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          headImgUrl: result.imgUrl,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  tellPhone = () => {
    Communications.phonecall(global.phone, false);
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
