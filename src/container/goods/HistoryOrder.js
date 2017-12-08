

import React, { Component } from 'react';
import {
  Alert,
  View,
  StyleSheet,
  RefreshControl,
  ListView,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import GoodList from '../../components/goodList';
import HmList from '../../components/hmList';
import { GetHistoryOrderList } from '../../api';

const styles = StyleSheet.create({
  info: {
    paddingRight: 16,
    flex: 1,
  },
});

let canEnd = false;
class HistoryOrder extends Component {
  static propTypes = {
    pushRoute: React.PropTypes.func,
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      rowdata: [],
      id: null,
      pageSize: 8,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
    };
    this._reachEnd = this._reachEnd.bind(this);
    this._renderRow = this._renderRow.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    this._goModelDetail = this._goModelDetail.bind(this);
    this.getData = this.getData.bind(this);
  }
  componentDidMount() {
    this._onRefresh();
  }
  componentWillUnmount() {
    canEnd = null;
  }
  getData() {
    GetHistoryOrderList({
      id: this.state.id,
      pageSize: this.state.pageSize,
    }).then((lists) => {
      if (lists.data.is_success) {
        const result = lists.data.result;
        if (result.length === 0 && this.state.rowdata.length === 0) {
          this.setState({
            noData: true,
          });
          return;
        }
        if (this.state.refresh) {
          this.setState({
            rowdata: result,
            dataSource: this.state.ds.cloneWithRows(result),
            id: result[result.length - 1].orderID,
            refresh: false,
            nomore: false,
          });
        } else {
          if (result.length === 0) {
            this.setState({
              nomore: true,
              loading: false,
            });
            return;
          }
          const newresult = this.state.rowdata.concat(result);
          this.setState({
            rowdata: newresult,
            dataSource: this.state.dataSource.cloneWithRows(newresult),
            id: result[result.length - 1].orderID,
            loading: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
        if (result.length < this.state.pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Alert.alert('温馨提示', lists.msg);
      }
    });
  }
  _renderRow(rowData, sectionID, rowID) {
    return (
      <View style={styles.innerViewStyle}>
        <GoodList
          obj={rowData}
          rowID={rowID}
          key={rowID}
          pressEvent={() => { this._goModelDetail(rowData); }}
        />
      </View>
    );
  }
  _goModelDetail(key) {
    this.props.pushRoute({ key });
  }
  _onRefresh() {
    this.setState({
      refresh: true,
      id: null,
    }, () => this.getData());
  }
  _reachEnd() {
    if (canEnd && !this.state.nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
  render() {
    const { noData, dataSource, loading, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <HmList
          dataSource={dataSource}
          renderRow={this._renderRow}
          isEndReached={this._reachEnd}
          isNoMore={isNoMore}
          isLoading={isLoading}
          isRefresh={isRefresh}
          onRefresh={this.onRefresh}
        />
      </View>
    );
  }
}
export default connect(state => ({
  navigation: state.proReducer,
}), dispatch => ({
  pushRoute: routes => dispatch({ type: 'push', routes }),
  popRoute: () => dispatch({ type: 'pop' }),
}))(HistoryOrder);
