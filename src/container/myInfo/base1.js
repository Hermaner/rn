import React from 'react';
import PropTypes from 'prop-types';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetSupplyService } from '../../api';

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
      isHidden: false,
      supplyGoodsList: [],
      releaseGoodsList: [],
      type: 0, // 0采购中，1已停止，2已驳回
      refresh: false, // 是否是刷新
      currentPage: 1,
      pageSize: '5',
      memberId: '',
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
  memberId: PropTypes.string,
};
export default Base;
