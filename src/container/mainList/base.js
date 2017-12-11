import React from 'react';
import { ListView, View } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GoodList } from '../../components';
import { GetHistoryOrderList } from '../../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      leftLists: [{
        id: '1',
        label: '水果',
        cur: true,
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }, {
        id: '1',
        label: '水果',
      }],
      leftIndex: 0,
      isSkuShow: false,
      ds,
      dataSource: ds.cloneWithRows([1, 2, 3, 4]),
      rowdata: [],
      id: null,
      pageSize: 8,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
    };
  }
  getData = () => {
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
        Toast.show('温馨提示');
      }
    });
  }
  showVarieties = () => {
    this.setState({
      isVarietiesShow: true,
    });
  }
  showSku = () => {
    this.setState({
      isSkuShow: true,
    });
  }
  changeLeftTab = (index) => {
    const { leftLists, leftIndex } = this.state;
    if (leftIndex === index) {
      return;
    }
    leftLists[index].cur = true;
    leftLists[leftIndex].cur = false;
    this.setState({
      leftLists,
      leftIndex: index,
    });
  }
  _renderRow = (rowData, sectionID, rowID) => (
    <View>
      <GoodList
        data={rowData}
        rowID={rowID}
        key={rowID}
        pressEvent={() => { this._goModelDetail(rowData); }}
      />
    </View>
  )
  _onRefresh = () => {
    this.setState({
      refresh: true,
      id: null,
    });
  }
  _reachEnd = () => {
    if (canEnd && !this.state.nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}

export default Base;
