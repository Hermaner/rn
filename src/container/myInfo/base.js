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
    const {
      currentPage,
      pageSize,
      type,
      memberId,
      supplyGoodsList,
      ds,
      releaseGoodsList,
      dataSource,
      refresh } = this.state;
    const { keyIndex } = this.props;
    if (keyIndex === '1') {
      this.sleek.toggle();
      GetSupplyService({
        currentPage,
        pageSize,
        type,
        memberId,
      }).then((res) => {
        this.sleek.toggle();
        if (res.isSuccess) {
          console.log('77777', res);
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
            console.log('##################', this.state.supplyGoodsList);
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
        Toast.show(err);
      });
    }
    if (keyIndex === '2') {
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
            console.log('0000000', this.state.releaseGoodsList);
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
        Toast.show(err);
      });
    }
  }
  rzDetail = () => {
    this.setState({
      isHidden: true,
    });
    this.ModalView.showModal();
    console.log('"""""""""""""', this.ModalView);
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
  push: PropTypes.func,
  keyIndex: PropTypes.string,
};
export default Base;
