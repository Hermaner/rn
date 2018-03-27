import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import Communications from 'react-native-communications';
import { GetPowerBusinessImgService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headImgUrl: '',
      bodyImgUrls: [],
      footImgUrl: '',
      phone: '400400400',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    this.sleek.toggle();
    GetPowerBusinessImgService({
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        const imgList = result.bodyImgUrls.split(',');
        imgList.length = imgList.length > 5 ? 5 : imgList.length;
        this.setState({
          headImgUrl: result.headImgUrl,
          bodyImgUrls: imgList,
          footImgUrl: result.footImgUrl,
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
