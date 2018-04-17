import React from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
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
    this.setState({
      memberId: global.memberId || '',
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
        AsyncStorage.setItem('userData', JSON.stringify(res.data));
        global.memberId = res.data.memberId.toString();
        Toast.show('保存成功');
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  search = () => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    this.props.push({ key: 'SearchPeople' });
  }
}
AdjectiveInfoBase.propTypes = {
  push: PropTypes.func,
};
export default AdjectiveInfoBase;
