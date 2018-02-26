import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter, AsyncStorage } from 'react-native';
import Dateformat from 'dateformat';
import { UserSocket } from '../../components';
import { UpdateMemberService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { userData: { memberId, imgUrl, sex } } = UserSocket;
    this.state = {
      upImages: {},
      memberId,
      initImage: imgUrl || '',
      nickName: '',
      birthDay: '',
      phone: '',
      sex: sex || '',
      sexValue: sex ? (sex === 1 ? '男' : '女') : '',
      isDateShow: false,
      selectShow: false,
      minimumDate: new Date('1900-01-01'),
      maximumDate: new Date(),
      options: [
      { value: 1, label: '男' },
      { value: 2, label: '女' }],
    };
  }
  getInit = () => {
    this.emitNick = DeviceEventEmitter.addListener('emitNick', (nickName) => {
      this.setState({
        nickName,
      }, () => this.UpdateMemberService({ nickName }));
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    }, () => this.UpdateMemberService({ imgUrl: upImages.key }));
  }
  deleteInit = () => {
    this.emitNick.remove();
  }
  toggleDate = () => {
    this.setState({
      isDateShow: !this.state.isDateShow,
    });
  }
  dateConfirm = (c) => {
    const birthDay = Dateformat(c, 'yyyy-mm-dd');
    this.setState({
      birthDay,
      isDateShow: false,
    });
    this.UpdateMemberService({ birthDay });
  }
  dateCancel = () => {
    this.toggleDate();
  }
  showSelectSex = () => {
    this.setState({
      selectShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  selectModel = (sex, sexValue) => {
    this.setState({
      sex,
      sexValue,
    });
    this.UpdateMemberService({ sex });
    this.closeModal();
  }
  UpdateMemberService = (data) => {
    this.sleek.toggle();
    UpdateMemberService({
      ...data,
      memberId: global.memberId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        UserSocket.changeData(res.data);
        AsyncStorage.setItem('userData', JSON.stringify(res.data));
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
