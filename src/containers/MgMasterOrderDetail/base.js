import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { Alert } from 'react-native';
import Dateformat from 'dateformat';
import Communications from 'react-native-communications';
import { GetMasterOrderInfoService, UpdateMasterOrderItemService, UpdateMasterOrderItemLogService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const { masterOrderId, status } = this.props.navigation.state.params;
    this.state = {
      masterOrderId,
      status,
      upImages: [],
      masterImage: [],
      initImages: '',
      Uploadurl: '',
      memo: '',
      isDateShow: false,
      minimumDate: new Date(),
      maximumDate: new Date('2020-01-01'),
      bespeakStatus: '',
      bespeakText: '',
      bespeakDate: '',
      bespeakMemo: '',
      masterLogs: {},
      pointend: null,
      completeCode: '',
      isChangeDate: false,
      selectShow: false,
      options: [{
        label: '预约成功',
        value: '1',
      }, {
        label: '客户联系方式错误',
        value: '2',
      }, {
        label: '客户手机无法接听或关机',
        value: '3',
      }, {
        label: '其他',
        value: '4',
      }],
    };
  }
  getInit = () => {
    this.GetMasterOrderInfoService();
  }
  getImages = (upImages) => {
    this.setState({
      upImages,
    });
  }
  showSelect = () => {
    this.setState({
      selectShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      selectShow: false,
    });
  }
  selectModel = (bespeakStatus, bespeakText) => {
    this.setState({
      bespeakStatus,
      bespeakText,
    });
    this.closeModal();
  }
  showChangeDate = () => {
    this.setState({
      isDateShow: true,
      isChangeDate: true,
    });
  }
  toggleDate = () => {
    this.setState({
      isChangeDate: false,
      isDateShow: !this.state.isDateShow,
    });
  }
  dateConfirm = (c) => {
    const { isChangeDate } = this.state;
    const bespeakDate = Dateformat(c, 'yyyy-mm-dd HH:MM:ss');
    if (isChangeDate) {
      this.changeAppointDate(bespeakDate);
      return;
    }
    this.toggleDate();
    this.setState({
      bespeakDate,
    });
  }
  dateCancel = () => {
    this.toggleDate();
  }
  saveAudit = () => {
    const { info, masterOrderId, bespeakStatus, bespeakMemo, bespeakDate } = this.state;
    if (!bespeakStatus) {
      Toast.show('请选择预约结果');
      return;
    }
    if (bespeakStatus === '4' && !bespeakMemo) {
      Toast.show('请输入其他原因');
      return;
    }
    if (bespeakStatus === '1' && !bespeakDate) {
      Toast.show('请选择预约时间');
      return;
    }
    const parmas = {
      masterOrderItemIds: info.masterOrderItems.map(item => item.masterOrderItemId).join(','),
      masterOrderId,
      bespeakStatus,
      bespeakMemo,
      bespeakDate: bespeakStatus === '1' ? bespeakDate : '',
      status: bespeakStatus === '1' ? 3 : 2,
      masterId: global.masterId,
    };
    this.UpdateMasterOrderItemService(parmas);
  }
  changeAppointDate = (bespeakDate) => {
    const { masterOrderId, info } = this.state;
    Alert.alert(
      '温馨提示', `你的预约时间为${bespeakDate},确认修改？`,
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            const parmas = {
              masterOrderItemIds: info.masterOrderItems.map(item => item.masterOrderItemId).join(','),
              masterOrderId,
              bespeakStatus: '1',
              bespeakMemo: '',
              bespeakDate,
              masterId: global.masterId,
              status: 3,
            };
            this.toggleDate();
            this.UpdateMasterOrderItemService(parmas);
          } },
      ],
    );
  }
  SignIn = () => {
    const { pointend, masterOrderId, info } = this.state;
    if (!pointend) {
      Toast.show('用户地址有误，不允许签到，请联系客服');
      return;
    }
    Alert.alert(
      '温馨提示', '确定签到?',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            const parmas = {
              masterOrderItemIds: info.masterOrderItems.map(item => item.masterOrderItemId).join(','),
              masterOrderId,
              masterId: global.masterId,
              status: 4,
            };
            this.UpdateMasterOrderItemService(parmas);
          } },
      ],
    );
  }
  AuditIn = () => {
    const { masterOrderId, completeCode, info, memo, upImages } = this.state;
    if (!completeCode) {
      Toast.show('请输入完工码');
      return;
    }
    if (completeCode !== info.masterOrderItems[0].completeCode) {
      Toast.show('完工码错误');
      return;
    }
    if (memo.length < 5) {
      Toast.show('至少5个字的备注');
      return;
    }
    if (upImages.length < 2) {
      Toast.show('至少上传2张图片进行审核');
      return;
    }
    const parmas = {
      masterOrderItemIds: info.masterOrderItems.map(item => item.masterOrderItemId).join(','),
      masterOrderId,
      images: upImages.map(item => item.key).join(','),
      memo,
      masterId: global.masterId,
      status: 5,
    };
    this.UpdateMasterOrderItemService(parmas);
  }
  AddPic = () => {
    const { masterLogs, upImages } = this.state;
    if (upImages.length < 2) {
      Toast.show('至少上传2张图片进行审核');
      return;
    }
    this.sleek.toggle();
    UpdateMasterOrderItemLogService({
      images: upImages.map(item => item.key).join(','),
      id: masterLogs.id,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('保存成功');
        this.setState({
          images: [],
          upImages: [],
        });
        this.GetMasterOrderInfoService();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  cancelOrder = () => {
    Alert.alert(
      '温馨提示', '放弃该订单?',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            const parmas = {
              masterOrderItemIds: this.item.masterOrderItems.map(item => item.masterOrderItemId).join(','),
              masterOrderId: this.masterOrderId,
              masterId: global.masterId,
              status: '1',
            };
            this.UpdateMasterOrderItemService(parmas);
          } },
      ],
    );
  }
  GetMasterOrderInfoService = () => {
    const { masterOrderId, status } = this.state;
    this.sleek.toggle();
    GetMasterOrderInfoService({
      masterOrderId,
      masterId: global.masterId,
      status,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const info = res.data;
        const masterLogs = info.masterOrderItems[0].masterOrderItemLogs;
        let initImages = '';
        if (masterLogs && masterLogs.images) {
          initImages = masterLogs.images;
        }
        this.setState({
          info,
          masterLogs,
          initImages,
          pointend: {
            lat: info.latitude,
            lng: info.longitude,
          },
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  UpdateMasterOrderItemService = (parmas) => {
    this.sleek.toggle();
    UpdateMasterOrderItemService(parmas).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show(parmas.status === 4 ? '签到成功' : '保存成功');
        const status = parmas.status;
        this.setState({
          status,
        });
        if (status === '1') {
          this.props.pop();
        } else {
          this.GetMasterOrderInfoService();
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  call = (telhref) => {
    Communications.phonecall(telhref, false);
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
