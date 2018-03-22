import React from 'react';
import { AsyncStorage, DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';
import { GetIdentityService, SaveMemberRoleService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      typeIndex: null,
      type: '', // 监听
      userType: 0,
      memberId: '',
      identityName: '',
    };
  }
  getInit = () => {
    const { userType, identityName, type } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId || '',
      userType,
      type,
      identityName,
    }, this.GetIdentityService);
  }
  GetIdentityService = () => {
    const { identityName } = this.state;
    GetIdentityService()
    .then((res) => {
      const result = res.data;
      for (let i = 0; i < result.length; i += 1) {
        if (result[i].identityName === identityName) {
          result[i].cur = true;
          this.setState({
            typeIndex: i,
          });
        }
      }
      this.setState({
        items: result,
      });
    });
  }
  userIdentity = (index) => {
    const { items, typeIndex } = this.state;
    if (typeIndex === index) {
      return;
    }
    if (typeIndex !== null) {
      items[typeIndex].cur = false;
    }
    items[index].cur = true;
    this.setState({
      items,
      typeIndex: index,
    });
  }
  identityChange = (userType) => {
    this.setState({
      userType,
    });
  }
  submitData = () => {
    const { items, typeIndex, userType, memberId, type } = this.state;
    if (typeIndex === null) {
      Toast.show('请选择身份');
      return;
    }
    this.sleek.toggle();
    SaveMemberRoleService({
      memberId,
      role: userType,
      identityId: items[typeIndex].identityId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        AsyncStorage.setItem('userData', JSON.stringify(res.data));
        UserSocket.changeData(res.data);
        global.memberId = res.data.memberId.toString();
        Toast.show('保存成功');
        DeviceEventEmitter.emit('emitUser');
        let emit;
        switch (type) {
          case 'memberInfoEmitUserType':
            emit = 'memberInfoEmitUserType';
            break;
          default:
        }
        DeviceEventEmitter.emit(emit, res.data);
        // this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
