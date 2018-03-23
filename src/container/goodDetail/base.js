import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import Communications from 'react-native-communications';
import PropTypes from 'prop-types';
import { GetSupplyInfoService, GetMemberInfoService, CreateCollectService, DeleteCollectService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      detail: null,
      items: [{
        title: '支持在线交易',
        id: '1',
        cur: false,
      }, {
        title: '完成企业认证',
        id: '2',
        cur: false,
      }, {
        title: '完成个人认证',
        id: '3',
        cur: false,
      }, {
        title: '现货供应',
        id: '4',
        cur: false,
      }],
      images: [
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
        {
          imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
        },
      ],
      otherItems: [],
      distance: 0,
      minPrice: '',
      maxPrice: '',
      count: '',
      skuCount: 1,
      memberId: '',
      isTabOne: 1,
      refresh: false, // 是否刷新
      thinkCount: 0,
      sellGoodsCount: 0,
      goodsScore: 5,
      memo: '',
      visible: false,
      transparent: true,
      realName: '', // 完成个人认证的真实姓名
      haveCollect: false, // 是否收藏
      DTgoodsScore: '',
      DTlogisticsScore: '',
      DTsellScore: '',
    };
  }
  getInit = () => {
    const { supplyId, memberId } = this.props.navigation.state.params;
    this.setState({
      supplyId,
      memberId,
    }, this.getData);
  }
  getData = () => {
    const { supplyId, memberId } = this.state;
    this.sleek.toggle();
    GetSupplyInfoService({
      supplyId,
      memberId: global.memberId || '',
      longitude: global.longitude,
      latitude: global.latitude,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        let allStart = 0;
        const thinkCount = result.supplyEvaluats.length;
        DeviceEventEmitter.emit('emitUser');
        if (result.isCollect === '1') {
          this.setState({
            haveCollect: true,
          });
        }
        if (result.otherSupplys) {
          this.setState({
            sellGoodsCount: result.otherSupplys.length,
          });
        } else {
          this.setState({
            sellGoodsCount: 0,
          });
        }
        if (result.supplyEvaluats.length > 0) {
          for (let i = 0; i < result.supplyEvaluats.length; i += 1) {
            allStart += parseFloat(result.supplyEvaluats[i].starLevel);
          }
          this.setState({
            goodsScore: Math.floor((allStart / thinkCount) * 100) / 100,
          });
        } else {
          this.setState({
            goodsScore: 5,
          });
        }
        if (result.member.memberVerifs !== '' && result.member.memberVerifs !== null && result.member.memberVerifs.length > 0) {
          for (let i = 0; i < result.member.memberVerifs.length; i += 1) {
            if (result.member.memberVerifs[i].verifFieldId === '6') {
              this.setState({
                memo: result.member.memberVerifs[i].memo,
              });
            }
          }
        }
        const distance = (parseFloat(result.distance) / 1000).toFixed(2);
        this.setState({
          detail: result,
          skuCount: result.wholesaleCount || 1,
          thinkCount,
          distance,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });

    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        if (result.personVerifStatus === '1' && result.personVerifs !== '' && result.personVerifs !== null && result.personVerifs.length > 0) {
          this.setState({
            realName: result.personVerifs[0].realName,
          });
        }
        this.setState({
          DTgoodsScore: result.score.goodsScore || '--',
          DTlogisticsScore: result.score.logisticsScore || '--',
          DTsellScore: result.score.sellScore || '--',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  emitGoodsDetailData = () => {
    this.getInit();
  }
  initData = () => {
    this.emitGoodsDetail = DeviceEventEmitter.addListener('emitGoodsDetailData', () => {
      this.emitGoodsDetailData();
    });
  }
  keepGoods = () => {
    const { haveCollect } = this.state;
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (haveCollect) {
      this.DeleteCollectService();
    } else {
      this.CreateCollectService();
    }
  }
  CreateCollectService = () => {
    const { supplyId } = this.state;
    this.sleek.toggle();
    CreateCollectService({
      memberId: global.memberId,
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        this.getInit();
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  DeleteCollectService = () => {
    const { supplyId } = this.state;
    this.sleek.toggle();
    DeleteCollectService({
      memberId: global.memberId,
      supplyId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          haveCollect: false,
        }, this.getInit);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  _onGetSupplyInfoService = () => {
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
  changeItem = (index) => {
    const { items } = this.state;
    items[index].cur = !items[index].cur;
    this.setState({
      items,
    });
  }
  tabChange = (isTabOne) => {
    this.setState({
      isTabOne,
      nomore: false,
    });
  }
  InputNumberChange(skuCount) {
    this.setState({
      skuCount,
    });
  }
  tellPhone = () => {
    const { detail } = this.state;
    Communications.phonecall(detail.phone, false);
  }
  openBuyMasker = () => {
    const { detail } = this.state;
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (global.memberId === detail.memberId) {
      Toast.show('不能购买自己的商品！');
      return;
    }
    this.ModalView.showModal();
  }
  saveBuyMasker = () => {
    this.ModalView.showModal();
  }
  enterOrderDetail = () => {
    const { skuCount, detail } = this.state;
    if ((detail.wholesaleCount) && (skuCount < parseFloat(detail.wholesaleCount))) {
      Toast.show('请注意最低起批量！');
      return;
    }
    this.props.push({ key: 'OrderDetail', params: { count: skuCount, supplyInfo: detail } });
    this.ModalView.closeModal();
  }
  goChat = () => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    const { detail: { memberId, nickName, imgUrl } } = this.state;
    if (memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId,
          userName: nickName,
          imgUrl,
        },
      },
    });
  }
  goCall = () => {
    if (!global.memberId) {
      Toast.show('请先登录');
      return;
    }
    if (!global.userData.phone) {
      Toast.show('请先绑定手机号');
      return;
    }
    this.ModalCall.show();
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default Base;
