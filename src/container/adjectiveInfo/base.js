import React from 'react';
import Toast from 'react-native-simple-toast';
import { GetIdentityService, SaveMemberRoleService } from '../../api';

class AdjectiveInfoBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      typeIndex: null,
      type: 0,
      memberId: '',
    };
  }
  getInit = () => {
    this.GetIdentityService();
    global.storage.load({
      key: 'userData',
    }).then((ret) => {
      this.setState({
        memberId: ret.memberId,
      });
    }).catch(() => {
      console.log('没有用户数据');
    });
  }
  GetIdentityService = () => {
    GetIdentityService()
    .then((res) => {
      this.setState({
        items: res.data,
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
  identityChange = (type) => {
    this.setState({
      type,
    });
  }
  submitData = () => {
    const { items, typeIndex, type, memberId } = this.state;
    if (typeIndex === null) {
      Toast.show('请选择身份');
      return;
    }
    this.sleek.toggle();
    SaveMemberRoleService({
      memberId,
      role: type,
      identityId: items[typeIndex].identityId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        global.storage.save({
          key: 'userData',
          data: {
            ...res.data,
            memberId: res.data.memberId.toString(),
          },
          expires: null,
        });
        Toast.show('保存成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
}
export default AdjectiveInfoBase;
