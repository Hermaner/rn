import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter, Alert } from 'react-native';
import { CreateWithdrawalsNumberMasterService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { type, info: { realName, numberName, number } } = this.props.navigation.state.params;
    this.state = {
      type,
      realName: realName || '',
      numberName: numberName || '',
      number: number || '',
    };
  }
  getInit = () => {
  }
  CreateWithdrawalsNumberMasterService = () => {
    const {
      realName,
      numberName,
      number,
      type,
    } = this.state;
    if (realName.length < 2 || realName.length > 8) {
      Toast.show('姓名长度2-8');
      return;
    }
    if (type === 1 && !numberName) {
      Toast.show('请输入银行名称');
      return;
    }
    if (number < 6) {
      Toast.show('请输入正确账号');
      return;
    }
    const str = type === 0 ? `姓名:${realName}支付宝账号:${number}` : `姓名:${realName}银行名称:${numberName}银行账号:${number}`;
    Alert.alert(
      '温馨提示', str,
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            this.sleek.toggle();
            CreateWithdrawalsNumberMasterService({
              realName,
              numberName,
              number,
              type,
            }).then((res) => {
              console.log(res);
              this.sleek.toggle();
              if (res.isSuccess) {
                Toast.show('保存成功');
                DeviceEventEmitter.emit('emitLoad');
                this.props.pop();
              } else {
                Toast.show(res.msg);
                this.props.pop();
              }
            }).catch((err) => {
              this.sleek.toggle();
              console.log(err);
            });
          } },
      ],
    );
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
