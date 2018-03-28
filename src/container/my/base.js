import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';
import { DeviceEventEmitter, Alert } from 'react-native';
import Communications from 'react-native-communications';
import { observer } from 'mobx-react/native';
import { UserSocket } from '../../components';
import { GetMemberInfoService, GetMemberSellOrderCountService, GetMemberBuyOrderCountService, GetMemberFootCountsService } from '../../api';

@observer
class MyBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstList: [{
        id: '1',
        title: '我的关注',
        count: 0,
        push: '',
      }, {
        id: '1',
        title: '我的足迹',
        count: 0,
        push: 'MyFootprint',
      }, {
        id: '1',
        title: '我的访客',
        count: 0,
        push: 'MyVisitor',
      }],
      soldInfoList: [{
        title: '全部',
        type: '',
      }, {
        title: '待修改',
        type: '1',
      }, {
        title: '待发货',
        type: '4',
      }, {
        title: '待退款',
        type: '6',
      }],
      list: [
        ['', [{
          id: '1',
          title: '发布的采购',
          last: false,
          isBorder: true,
          isLast: false,
          icnColor: '#64BD46',
          push: 'MyRelease',
          isHaveBuy: false,
          icn: 'icon-caigoudingdan',
        }, {
          id: '1',
          title: '买到的货品',
          last: true,
          isBorder: false,
          isLast: false,
          icnColor: '#64BD46',
          push: 'MyBuyGoods',
          isHaveBuy: false,
          icn: 'icon-shangpin-tianchong',
        }]], ['', [{
          id: '1',
          title: '我的供应单',
          last: false,
          isBorder: true,
          isLast: false,
          icnColor: '#10B1F1',
          push: 'MySupply',
          icn: 'icon-homepage',
        }, {
          id: '1',
          title: '发出的报价',
          last: false,
          isBorder: false,
          isLast: false,
          icnColor: '#FC8521',
          push: 'MySendOffer',
          icn: 'icon-zixun',
        }]], ['其他', [{
          id: '1',
          title: '账户中心',
          last: true,
          isLast: true,
          icnColor: '#64BD46',
          push: 'MyAccount',
          icn: 'icon-zhanghu',
        }, {
          id: '1',
          title: '我要认证',
          last: true,
          isLast: true,
          icnColor: '#10B1F1',
          push: 'Certification',
          icn: 'icon-renzheng-tianchong',
        }, {
          id: '1',
          title: '个人信息',
          last: true,
          icnColor: '#FC8521',
          isLast: true,
          push: 'MemberInfo',
          icn: 'icon-homepage',
        }, {
          id: '1',
          title: '收货地址',
          last: true,
          icnColor: '#FC8521',
          isLast: true,
          push: 'MyAddress',
          icn: 'icon-4',
        }, {
          id: '1',
          title: '我的主页',
          last: true,
          icnColor: '#64BD46',
          isLast: true,
          push: 'MyInfo',
          icn: 'icon-4',
        }, {
          id: '1',
          title: '我的收藏',
          last: true,
          icnColor: '#FC8521',
          isLast: true,
          push: 'MyCollect',
          icn: 'icon-shangpin-tianchong',
        }, {
          id: '1',
          title: '我的身份',
          last: true,
          icnColor: '#FC8521',
          isLast: true,
          push: 'AdjectiveInfo',
          icn: 'icon-wode',
        }, {
          id: '1',
          title: '意见反馈',
          last: true,
          isLast: true,
          icnColor: '#64BD46',
          push: 'AboutUs',
          icn: 'icon-qunfengyijianfankui',
        }, {
          id: '1',
          title: '联系客服',
          last: true,
          icnColor: '#FC8521',
          isLast: true,
          push: 'tel',
          icn: 'icon-kefu',
        }, {
          id: '1',
          title: '邀请好友',
          last: true,
          icnColor: '#64BD46',
          isLast: true,
          push: '',
          icn: 'icon-renyuanxiaozu',
        }, {
          id: '1',
          title: '我的好友',
          last: true,
          icnColor: '#64BD46',
          isLast: true,
          push: 'MyFriend',
          icn: 'icon-renyuanxiaozu',
        }, {
          id: '1',
          title: '通话记录',
          last: true,
          icnColor: '#64BD46',
          isLast: true,
          push: 'CallLog',
          icn: 'icon-renyuanxiaozu',
        }]]],
      shares: [{
        label: '微信',
        icon: 'md-alarm',
        color: '#62b900',
      }, {
        label: '朋友圈',
        icon: 'md-alarm',
        color: '#556876',
      }, {
        label: 'QQ',
        icon: 'md-alarm',
        color: '#fc5e6a',
      }, {
        label: 'QQ空间',
        icon: 'md-alarm',
        color: '#68a5e1',
      }],
      backGround1: require('../../assets/img/444.png'),
      userInfo: '',
      pageSize: 15,
      currentPage: 1,
      memberId: '',
      isModalShow: false,
      realName: '',
      myFootCounts: '0',
      refresh: false, // 是否是刷新
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { memberId, firstList, list } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        UserSocket.changeData(res.data);
        this.setState({
          userInfo: result,
          firstList,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    GetMemberSellOrderCountService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        UserSocket.changeCount(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    GetMemberBuyOrderCountService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        if (result.confirm !== '0' || result.pay !== '0' || result.receive !== '0') {
          list[0][1][1].isHaveBuy = true;
          this.setState({
            list,
          });
        } else {
          list[0][1][1].isHaveBuy = false;
          this.setState({
            list,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });

    GetMemberFootCountsService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          myFootCounts: result || '0',
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
    this.setState({
      refresh: false,
    });
  }
  getDelete = () => {
    this.emitMineUser.remove();
  }
  initData = () => {
    if (global.memberId) {
      this.getInit();
    }
    this.emitMineUser = DeviceEventEmitter.addListener('emitUser', () => {
      this.emitUser();
    });
  }
  tellPhone = () => {
    Alert.alert(
      '温馨提示', '是否拨打客服电话？',
      [
        { text: '取消', onPress: () => {} },
        { text: '确认',
          onPress: () => {
            Communications.phonecall(global.phone, false);
          } },
      ],
    );
  }
  choseOne = (index, index2) => {
    const { push } = this.props;
    const { list } = this.state;
    if (index === 2 && index2 === 8) {
      this.tellPhone();
      return;
    }
    if (index === 2 && index2 === 9) {
      this.showModal();
      return;
    }
    push({
      key: UserSocket.userData.memberId ? list[index][1][index2].push : 'User',
      params: {
        info: UserSocket.userData,
        name: UserSocket.userData.nickName,
        memberId: UserSocket.userData.memberId,
        userType: UserSocket.userData.role,
        identityName: UserSocket.userData.identityName,
      } });
  }
  emitUser = () => {
    if (!global.memberId) {
      return;
    }
    this.setState({ memberId: global.memberId || '' }, this.getInit);
  }
  otherShare = (index) => {
    switch (index) {
      case 0:
        this.wxShareFriend();
        break;
      case 1:
        this.wxShareTimeLine();
        break;
      case 2:
        this.shareToQQ();
        break;
      case 3:
        this.shareToQzone();
        break;
      default:
    }
  }
  wxShareFriend = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToSession({
          title: '分享朋友',
          description: '分享来领券',
          thumbImage: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
          type: 'news',
          webpageUrl: 'http://www.baidu.com',
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }
  wxShareTimeLine = () => {
    WeChat.isWXAppInstalled()
    .then((isInstalled) => {
      if (isInstalled) {
        WeChat.shareToTimeline({
          title: '分享朋友圈',
          description: '分享来领券',
          thumbImage: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
          type: 'news',
          webpageUrl: 'http://www.baidu.com',
        })
        .catch((error) => {
          console.log(error);
        });
      } else {
        Toast.show('没有安装微信软件，请您安装微信之后再试');
      }
    });
  }
  shareToQQ = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.shareToQQ({
        type: 'news',
        title: '分享好友',
        description: '分享来领券',
        webpageUrl: 'http://www.baidu.com',
        imageUrl: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  shareToQzone = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.shareToQzone({
        type: 'news',
        title: '分享好友',
        description: '分享来领券',
        webpageUrl: 'http://www.baidu.com',
        imageUrl: 'https://img.hbw128.com/Fi5qw22CEBs3Wzg9yztZP0QQD0kt',
      })
      .then((res) => {
        console.log(res);
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }

  showModal = () => {
    this.setState({
      isModalShow: true,
    });
  }
  closeModal = () => {
    this.setState({
      isModalShow: false,
    });
  }
  _onRefresh= () => {
    if (!global.memberId) {
      return;
    }
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
  _onScroll = (event) => {
    const { loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.initData();
    }
  }
}
MyBase.propTypes = {
  push: PropTypes.func,
};
export default MyBase;
