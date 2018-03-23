import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetMemberFollowService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      name: '',
      identityId: '',
      backGround1: require('../../assets/img/zhi.png'),
      text: '',
      peopleType: '',
    };
  }
  getData = () => {
    const { name, identityId, provinceCode } = this.state;
    this.sleek.toggle();
    GetMemberFollowService({
      memberId: global.memberId,
      name,
      provinceCode,
      identityId,
    }).then((res) => {
      this.sleek.toggle();
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          items: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  getDelete = () => {
    this.emitMineMyfriend.remove();
    this.emitMineUserType.remove();
  }
  emitMyFriend = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      text: data.text,
    }, this.getData);
  }
  emitType = (data) => {
    this.setState({
      identityId: data.IdentityId,
      peopleType: data.IdentityName,
    }, this.getData);
  }
  initData = () => {
    this.emitMineMyfriend = DeviceEventEmitter.addListener('emitMyFriend', (data) => {
      this.emitMyFriend(data);
    });
    this.emitMineUserType = DeviceEventEmitter.addListener('emitType', (data) => {
      this.emitType(data);
    });
  }
}
Base.propTypes = {
  provinceCode: PropTypes.string,
  push: PropTypes.func,
};

export default Base;
