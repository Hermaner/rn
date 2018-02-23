import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { DeviceEventEmitter } from 'react-native';
import Dateformat from 'dateformat';
import { UpdateMemberService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upImages: [],
      initImages: [],
      nickName: '',
      birthDay: '',
      phone: '',
      sex: '',
      sexValue: '',
      isDateShow: false,
      minimumDate: new Date('1900-01-01'),
      maximumDate: new Date(),
      optionType: '',
      options: [{ value: '', label: '请选择性别' },
      { value: '1', label: '男' },
      { value: '2', label: '女' }],
    };
  }
  getInit = () => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    console.log(Dateformat(date, 'N'));
    this.emitNick = DeviceEventEmitter.addListener('emitNick', (nickName) => {
      this.setState({
        nickName,
      });
    });
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
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
    this.SelectInput.focus();
  }
  selectSex = (optionType) => {
    if (!optionType) {
      return;
    }
    const { options } = this.state;
    options.forEach((item) => {
      if (item.value === optionType) {
        this.setState({
          sexValue: item.label,
          optionType,
        });
        this.UpdateMemberService({ sex: optionType });
      }
    });
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
