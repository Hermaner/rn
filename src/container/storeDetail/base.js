import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { DeepClone, GetMemberInfoService, GetSupplyService } from '../../api';

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
    };
  }
  getInit = () => {
    const { memberId } = this.props.navigation.state.params;
    this.setState({
      memberId,
    }, this._onRefresh);
  }
  getData = () => {
    const { memberId, currentPage, pageSize, goodsItems, refresh, ds, dataSource } = this.state;
    const { member } = this.props;
    const m = memberId || member;
    const type = '0';
    this.sleek.toggle();
    GetMemberInfoService({
      memberId: m,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
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
        console.log('IIIIIIIIIII', this.state.userInfo);
      } else {
        Toast.show('温馨提示55');
      }
    }).catch((err) => {
      Toast.show(err);
    });

    GetSupplyService({
      currentPage,
      pageSize,
      type,
      memberId: m,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (goodsItems.length === 0) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            goodsItems: result,
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = goodsItems.concat(result);
          this.setState({
            goodsItems: newItems,
            dataSource: dataSource.cloneWithRows(newItems),
            currentPage: currentPage + 1,
            loading: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      Toast.show(err);
    });
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
  changeItem = (index) => {
    const { items } = this.state;
    items[index].cur = !items[index].cur;
    this.setState({
      items,
    });
  }
  save = (callback) => {
    callback();
  }
  toggleSleek = () => {
    this.setState({
      isSleekShow: !this.state.isSleekShow,
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
