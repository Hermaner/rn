import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetWithdrawalsNumberService, SetDefaultWithdrawalsNumberService } from '../../api';

class ChooseGatheringAccountNumbersBase extends React.Component {
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
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { memberId, items } = this.state;
    GetWithdrawalsNumberService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          items.push({
            title: result[i].numberName,
            name: result[i].realName,
            number: result[i].number,
            label: result[i].isDefault === '0' ? '设为收款账号' : '默认收款账号',
            isDefault: result[i].isDefault === '0' ? 0 : 1,
            type: result[i].type,
          });
        }
        this.setState({
          items,
          cardInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
  setDefult = (index) => {
    const { cardInfo } = this.state;
    this.sleek.toggle();
    SetDefaultWithdrawalsNumberService({
      withdrawalsNumberId: cardInfo[index].withdrawalsNumberId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          items: [],
        });
        this.getData();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
  chooseBank = (value) => {
    this.setState({
      selected1: value,
    });
  }
  choosePlace = (value) => {
    this.setState({
      selected2: value,
    });
  }
}
export default ChooseGatheringAccountNumbersBase;
