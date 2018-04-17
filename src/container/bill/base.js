import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetMemberAmountLogService } from '../../api';

class BillBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected1: '',
      selected2: '',
      items: [],
      cardInfo: '',
      zhi: require('../../assets/img/zhi.png'),
      card: require('../../assets/img/dg.png'),
    };
  }
  getData = () => {
    GetMemberAmountLogService({
      memberId: global.memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        // const result = res.data;
        // console.log('44444444446666666666', result);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
}
export default BillBase;
