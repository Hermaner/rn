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
        icon: 'icon-follow',
        title: '我的关注',
        count: 0,
        push: '',
      }, {
        id: '1',
        icon: 'icon-wodezuji',
        title: '我的足迹',
        count: 0,
        push: 'MyFootprint',
      }, {
        id: '1',
        icon: 'icon-fangwenliuliang',
        title: '我的访客',
        count: 0,
        push: 'MyVisitor',
      }],
      soldInfoList: [{
        title: '全部',
        icon: 'icon-baobei',
        type: '',
      }, {
        title: '待修改',
        icon: 'icon-daifahuo',
        type: '1',
      }, {
        title: '待发货',
        icon: 'icon-daishouhuo',
        type: '4',
      }, {
        title: '待退款',
        icon: 'icon-daifukuan',
        type: '6',
      }],
      roles: [
        [{
          title: '发布的采购',
          imgUrl: require('../../assets/img/m1.png'),
          push: 'MyRelease',
        }, {
          title: '买到的货品',
          imgUrl: require('../../assets/img/m2.png'),
          cur: false,
          push: 'MyBuyGoods',
        }],
        [{
          title: '我的供应单',
          imgUrl: require('../../assets/img/m3.png'),
          push: 'MySupply',
        }, {
          title: '发出的报价',
          imgUrl: require('../../assets/img/m4.png'),
          push: 'MySendOffer',
        }],
      ],
      list: [
        {
          title: '账户中心',
          push: 'MyAccount',
          icn: 'icon-zhanghuzhongxinbangqiachenggongicon',
        }, {
          title: '我要认证',
          push: 'Certification',
          icn: 'icon-authentication',
        }, {
          title: '个人信息',
          push: 'MemberInfo',
          icn: 'icon-gerenxinxi',
        }, {
          title: '收货地址',
          push: 'MyAddress',
          icn: 'icon-shouhuodizhi',
        }, {
          title: '我的主页',
          push: 'MyInfo',
          icn: 'icon-wodezhuye-gongzuotai',
        }, {
          title: '我的收藏',
          push: 'MyCollect',
          icn: 'icon-wodeshoucang',
        }, {
          title: '我的身份',
          push: 'AdjectiveInfo',
          icn: 'icon-identity',
        }, {
          title: '意见反馈',
          push: 'AboutUs',
          icn: 'icon-fankuijianyi',
        }, {
          title: '联系客服',
          push: 'tel',
          icn: 'icon-lianxikefu',
        }, {
          title: '邀请好友',
          push: 'share',
          icn: 'icon-yaoqinghaoyou',
        }],
      shares: [{
        label: '微信',
        icon: 'icon-weixin',
        color: '#00d22a',
      }, {
        label: '朋友圈',
        icon: 'icon-pengyouquan',
        color: '#00d22a',
      }, {
        label: 'QQ',
        icon: 'icon-QQ',
        color: '#00addc',
      }, {
        label: 'QQ空间',
        icon: 'icon-qunfengqqkongjian',
        color: '#00addc',
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
    this.getData();
  }
  getData = () => {
    const { memberId, firstList, roles } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      // console.log(res);
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
    });
    GetMemberSellOrderCountService({
      memberId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        UserSocket.changeCount(res.data);
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });

    GetMemberBuyOrderCountService({
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        if (result.confirm !== '0' || result.pay !== '0' || result.receive !== '0') {
          roles[0][1].cur = true;
          this.setState({
            roles,
          });
        } else {
          roles[0][1].cur = false;
          this.setState({
            roles,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
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
      this.setState({
        memberId: global.memberId,
      }, this.getInit);
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
            Communications.phonecall('18916882065', false);
          } },
      ],
    );
  }
  goPage = (page) => {
    this.props.push({ key: global.memberId ? page : 'User' });
  }
  goListPage = (page) => {
    if (page === 'tel') {
      this.tellPhone();
      return;
    }
    if (page === 'share') {
      this.showModal();
      return;
    }
    this.props.push({
      key: global.memberId ? page : 'User',
      params: {
        info: UserSocket.userData,
        name: decodeURI(UserSocket.userData.nickName),
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
          title: '手机慧包',
          description: '手机慧包',
          thumbImage: 'http://www.hbw128.com/static/img/100.5af1c76.png',
          type: 'news',
          webpageUrl: 'http://www.hbw128.com/#/DownLoad',
        })
        .catch(() => {
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
          title: '手机慧包',
          description: '手机慧包',
          thumbImage: 'http://www.hbw128.com/static/img/100.5af1c76.png',
          type: 'news',
          webpageUrl: 'http://www.hbw128.com/#/DownLoad',
        })
        .catch(() => {
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
        title: '手机慧包',
        description: '手机慧包',
        webpageUrl: 'http://www.hbw128.com/#/DownLoad',
        imageUrl: 'http://www.hbw128.com/static/img/100.5af1c76.png',
      })
      .then(() => {
      }).catch(() => {});
    }).catch(() => {
      Toast.show('没有安装QQ软件，请您安装QQ之后再试');
    });
  }
  shareToQzone = () => {
    QQAPI.isQQInstalled().then(() => {
      QQAPI.shareToQzone({
        type: 'news',
        title: '手机慧包',
        description: '手机慧包',
        webpageUrl: 'http://www.hbw128.com/#/DownLoad',
        imageUrl: 'http://www.hbw128.com/static/img/100.5af1c76.png',
      })
      .then(() => {
      }).catch(() => {});
    }).catch(() => {
      Toast.show('没有安装QQ软件，请您安装QQ之后再试');
    });
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
}
MyBase.propTypes = {
  push: PropTypes.func,
};
export default MyBase;
