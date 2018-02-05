import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { DeepClone, GetMemberInfoService, CreateMemberFollowService, GetMemberFollowService, DeleteMemberFollowService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      goodsItems: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: true, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
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
      otherItems: [
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
        { name: '石榴真好吃啊真好吃啊真好使' },
      ],
      certifIndex: 0,
      isCertifShow: false,
      imageViewData: [],
      goodsImg: require('../../assets/img/no.png'),
      bao: require('../../assets/img/bb.png'),
      infos: '',
      memoText: '',
      isHidden: false,
      supplyInfo: '',
      userInfo: '',
      isFollow: '', // 关注列表
      clickFollow: -1, // 点击关注，再点击取消
    };
  }
  getInit = () => {
    const { memberId } = this.props.navigation.state.params;
    console.log('bbbbbbbbbbbbbb', memberId)
    this.setState({
      memberId,
    }, this._onRefresh);
  }
  getData = () => {
    const { memberId } = this.state;
    const { member } = this.props;
    const m = memberId || member;
    // this.sleek.toggle();
    GetMemberInfoService({
      memberId: m,
    }).then((res) => {
      // this.sleek.toggle();
      if (res.isSuccess) {
        console.log('jjjjjjjjjj', res);
        const result = res.data;
        if (result.memberVerifs) {
          for (let i = 0; i < result.memberVerifs.length; i += 1) {
            if (result.memberVerifs[i].verifFieldName === '买家保障') {
              result.memoText = result.memberVerifs[i].memo;
              break;
            }
            result.memoText = '未缴纳买家保证金';
          }
        } else {
          result.memoText = '未缴纳买家保证金';
        }
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show('温馨提示55');
      }
    }).catch((err) => {
      Toast.show(err);
    });

    GetMemberFollowService({
      memberId: global.memberId,
    }).then((res) => {
      // this.sleek.toggle();
      console.log('aaaaaaaaaaaa', res)
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          console.log('111111111111')
          if (result[i].byFollowMemberId === memberId) {
            console.log('fffffs')
            this.setState({
              isFollow: true,
              clickFollow: 1,
            });
          } else {
            console.log('ccccccc')
            this.setState({
              isFollow: false,
              clickFollow: -1,
            });
          }
        }
        console.log('2222222222', this.state.isFollow)
        console.log('3333333333', this.state.clickFollow)
      } else {
        Toast.show('温馨提示11');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  CreateMemberFollowService = () => {
    // const { memberId } = this.state;
    this.setState({
      clickFollow: this.state.clickFollow * -1,
    }, this.aa);
    console.log('777777777777', this.state.clickFollow)
  }
  aa = () => {
    const { clickFollow, memberId } = this.state;
    const otherMemeber = parseFloat(memberId);
    this.sleek.toggle();
    if (clickFollow === 1) {
      CreateMemberFollowService({
        memberId: global.memberId,
        byFollowMemberId: otherMemeber,
      }).then((res) => {
        this.sleek.toggle();
        if (res.isSuccess) {
          this.setState({
            isFollow: true,
            clickFollow: 1,
          });
        } else {
          Toast.show('温馨提示222');
        }
      }).catch((err) => {
        Toast.show(err);
      });
      this.getData();
    } else {
      DeleteMemberFollowService({
        memberId: global.memberId,
        byFollowMemberId: otherMemeber,
      }).then((res) => {
        this.sleek.toggle();
        if (res.isSuccess) {
          this.setState({
            isFollow: false,
            clickFollow: -1,
          });
        } else {
          Toast.show('温馨提示333');
        }
      }).catch((err) => {
        Toast.show(err);
      });
      this.getData();
    }
  }
  listPush = () => {
    this.ModalView.closeModal();
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
    console.log(this.ModalView);
  }
  resetState = () => {
    this.setState({
      ...DeepClone(this.resetData),
    });
  }
  showCertifImage = (certifIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item.imgUrl }));
    this.setState({
      certifIndex,
      isCertifShow: true,
      imageViewData,
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  member: PropTypes.string,
};
export default Base;
