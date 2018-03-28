import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetSupplyService, GetPurchaseService, GetMemberInfoService } from '../../api';

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
      items: [{
        id: '1',
        title: '所在地',
        last: false,
        label: '',
        isIcn: false,
      }, {
        id: '1',
        title: '注册时间',
        last: false,
        label: '2017-12-3',
        isIcn: false,
      }],
      list: [{
        id: '1',
        title: '买家保障',
        label: '缴纳诚信保证金并承诺提供买家保障服务',
        labelTitle: '',
        isHave: true,
      }, {
        id: '1',
        title: '个人实名认证',
        label: '个人实名认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '企业认证',
        label: '企业认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '实地认证',
        label: '实地考察认证',
        labelTitle: '申请认证',
        isHave: true,
      }],
      isHidden: false,
      supplyGoodsList: [],
      releaseGoodsList: [],
      type: 0, // 0采购中，1已停止，2已驳回
      refresh: false, // 是否是刷新
      scurrentPage: 1,
      pcurrentPage: 1,
      pageSize: '5',
      loading: false, // 是否加载中
      nomore: false, // 是否没有更多
      supplys: [],
      purchase: [],
      realName: '', // 完成个人认证后的真实姓名
    };
  }
  getInit = () => {
    if (this.props.navigation.state.params) {
      const { memberId } = this.props.navigation.state.params;
      this.setState({ memberId }, this._onRefresh);
    } else {
      this.setState({ memberId: global.memberId }, this._onRefresh);
    }
  }
  getData = () => {
    const { memberId, items } = this.state;
    GetMemberInfoService({
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < items.length; i += 1) {
          items[0].label = result.provinceName + result.cityName + result.districtName === 0 ? '' : result.provinceName + result.cityName + result.districtName;
          items[1].label = result.postDate;
        }
        if (result.personVerifStatus === '1' && result.personVerifs !== '' && result.personVerifs !== null && result.personVerifs.length > 0) {
          this.setState({
            realName: result.personVerifs[0].realName,
          });
        }
        this.setState({
          info: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
    this._onRefreshSupply();
    this._onRefreshPurchase();
  }
  GetSupplyService = () => {
    const {
      scurrentPage,
      pageSize,
      type,
      supplys,
      memberId,
      refresh } = this.state;
    GetSupplyService({
      currentPage: scurrentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            supplys: result,
            scurrentPage: scurrentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = supplys.concat(result);
          this.setState({
            supplys: newItems,
            scurrentPage: scurrentPage + 1,
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
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  GetPurchaseService = () => {
    const {
      pcurrentPage,
      pageSize,
      type,
      memberId,
      purchase,
      refresh } = this.state;
    GetPurchaseService({
      currentPage: pcurrentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              nomore: true,
              loading: false,
              refresh: false,
            });
            return;
          }
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            purchase: result,
            pcurrentPage: pcurrentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = purchase.concat(result);
          this.setState({
            purchase: newItems,
            pcurrentPage: pcurrentPage + 1,
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
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  _onRefreshSupply = () => {
    this.setState({
      refresh: true,
      scurrentPage: 1,
    }, () => this.GetSupplyService());
  }
  _onRefreshPurchase = () => {
    this.setState({
      refresh: true,
      pcurrentPage: 1,
    }, () => this.GetPurchaseService());
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
  }
  listPush = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push();
        break;
      case 1:
        push({ key: 'IndividualAuthentication' });
        break;
      case 2:
        push({ key: 'CollectiveAuthentication' });
        break;
      case 3:
        push({ key: 'EnlistBusiness' });
        break;
      default:
    }
    this.ModalView.closeModal();
  }
  tabChangeOne = () => {
    this.setState({
      isTabOne: 1,
    });
  }
  tabChangeTwo = () => {
    this.setState({
      isTabOne: -1,
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
  _onScroll = (event) => {
    const { isTabOne, loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.setState({
        loading: true,
      }, isTabOne === 1 ? this.GetVerifSupplyService : this.GetGoodBusinesService);
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
