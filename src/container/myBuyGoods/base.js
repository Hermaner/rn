import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberBuyOrderCountService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countList: [],
    };
  }
  getBuyGoodsCount = () => {
    this.getData();
  }
  getData = () => {
    const { countList } = this.state;
    GetMemberBuyOrderCountService({
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        countList[0] = '0';
        countList[1] = result.confirm || '0';
        countList[2] = result.pay || '0';
        countList[3] = result.receive || '0';
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
  initData = () => {
    this.EmitBuyGoodsCount = DeviceEventEmitter.addListener('getBuyGoodsCount', () => {
      this.getBuyGoodsCount();
    });
  }
}
Base.propTypes = {
  status: PropTypes.string,
};
export default Base;
