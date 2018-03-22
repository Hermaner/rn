import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { Alert } from 'react-native';
import { CreateWithdrawalsNumberService } from '../../api';

class AddPersonalAccountBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      number: '',
      bankName: '',
    };
  }
  saveName = (value) => {
    this.setState({
      name: value,
    });
  }
  saveNumber = (value) => {
    this.setState({
      number: value,
    });
  }
  saveBank = (bankName) => {
    this.setState({
      bankName,
    });
  }
  submitBtn = () => {
    const { push } = this.props;
    const { name, number, bankName } = this.state;
    const { type, where } = this.props.navigation.state.params;
    const reg = /^\d{19}$/g;
    if (name === '') {
      Alert.alert(
        '提交失败',
        '请输入账号名',
      );
    }
    if (number === '') {
      Alert.alert(
        '提交失败',
        '请输入卡号',
      );
    }
    // if (!reg.test(number)) {
    //   Alert.alert(
    //     '提交失败',
    //     '格式错误，应该是19位数字',
    //   );
    // }
    CreateWithdrawalsNumberService({
      memberId: global.memberId,
      realName: name,
      numberName: type === 1 ? '支付宝' : bankName,
      number,
      type,
      isDefault: '0',
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        Toast.show('添加账号成功！');
        if (where === '1') {
          push({ key: 'ChooseGatheringAccountNumbers' });
        } else {
          push({ key: 'GatheringAccount' });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
AddPersonalAccountBase.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default AddPersonalAccountBase;
