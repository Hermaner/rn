import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberSellOrderCountService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.isSend = false;
    this.state = {
      memberId: '',
      tu: require('../../assets/img/no.png'),
      countList: [],
    };
  }
  getInit = () => {
    this.EmitSoldGoodsCount = DeviceEventEmitter.addListener('getSoldGoodsCount', () => {
      this.getSoldGoodsCount();
    });
    this.getData();
  }
  getSoldGoodsCount = () => {
    this.getData();
  }
  getData = () => {
    const { countList } = this.state;
    GetMemberSellOrderCountService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        countList[0] = '0';
        countList[1] = result.update || '0';
        countList[2] = result.send || '0';
        countList[3] = result.refund || '0';
        this.setState({
          countList,
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
  status: PropTypes.string,
};
export default Base;
