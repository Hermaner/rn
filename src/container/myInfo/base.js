import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetSupplyService, GetPurchaseService } from '../../api';

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
      }, {
        id: '1',
        title: '备注',
        last: false,
        label: '',
        isIcn: true,
      }],
      list: [{
        id: '1',
        title: '买家保障',
        label: '您尚未缴纳诚信保证金并承诺提供买家保障服务',
        labelTitle: '了解详情',
        isHave: true,
      }, {
        id: '1',
        title: '实名认证',
        label: '您尚未通过实名认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '企业认证',
        label: '您尚未通过企业认证',
        labelTitle: '申请认证',
        isHave: true,
      }, {
        id: '1',
        title: '实地认证',
        label: '您尚未通过实地考察认证',
        labelTitle: '申请认证',
        isHave: true,
      }],
      isHidden: false,
      supplyGoodsList: [],
      releaseGoodsList: [],
      type: 0, // 0采购中，1已停止，2已驳回
      refresh: false, // 是否是刷新
      currentPage: 1,
      pageSize: '5',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this._onRefresh);
  }
  getData = () => {
    // const { keyIndex } = this.props;
    this._onRefreshSupply();
    this._onRefreshPurchase();
  }
  GetSupplyService = () => {
    const {
      currentPage,
      pageSize,
      type,
      memberId,
      supplyGoodsList,
      ds,
      dataSource,
      refresh } = this.state;
    this.sleek.toggle();
    GetSupplyService({
      currentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (supplyGoodsList.length === 0) {
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
            supplyGoodsList: result,
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = supplyGoodsList.concat(result);
          this.setState({
            supplyGoodsList: newItems,
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
      console.log(err);
    });
  }
  GetPurchaseService = () => {
    const {
      currentPage,
      pageSize,
      type,
      memberId,
      ds,
      releaseGoodsList,
      dataSource,
      refresh } = this.state;
    this.sleek.toggle();
    GetPurchaseService({
      currentPage,
      pageSize,
      type,
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (releaseGoodsList.length === 0) {
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
            releaseGoodsList: result,
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = releaseGoodsList.concat(result);
          this.setState({
            releaseGoodsList: newItems,
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
      bcurrentPage: 1,
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
        push({ key: 'User' });
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
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
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
};
export default Base;
