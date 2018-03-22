import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import { observer } from 'mobx-react/native';
import Toast from 'react-native-simple-toast';
import { UserSocket } from '../../components';
import { GetPurchaseService } from '../../api';

let canEnd = false;
@observer
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
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
    const { memberId } = this.props;
    this.setState({ memberId }, this._onRefresh);
  }
  getData = () => {
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
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
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
  pushPage = (index) => {
    const { data, push } = this.props;
    if (UserSocket.userData.memberId === data[index].memberId) {
      Toast.show('请不要对自己的商品报价！');
      return;
    }
    push({ key: 'PurchaseDetail', params: { item: data[index], purchaseId: data[index].purchaseId } });
  }
}
Base.propTypes = {
  memberId: PropTypes.string,
  push: PropTypes.func,
  data: PropTypes.array,
};
export default Base;
