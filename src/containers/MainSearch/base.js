import React from 'react';
import { ListView, AsyncStorage } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterServicesService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      orderByName: '',
      orderByType: '',
      currentPage: '',
      searchValue: '',
      items: [],
      ds,
      dataSource: ds.cloneWithRows([]),
      refresh: false,
      loading: true,
      nomore: false,
      isSearch: false,
      noData: false,
      pageSize: '15',
      hots: [],
      // hots: [{
      //   label: '安装',
      // }, {
      //   label: '保洁',
      // }, {
      //   label: '量西甲',
      // }, {
      //   label: '空调维修',
      // }, {
      //   label: '晾衣架',
      // }, {
      //   label: '电脑维修',
      // }, {
      //   label: '空调',
      // }, {
      //   label: '安装',
      // }],
      historys: global.searchHistorys || [],
    };
  }
  getInit = () => {
  }
  search = (val) => {
    console.log(val);
  }
  GetMasterServicesService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      searchValue,
      refresh,
      ds,
      items,
      dataSource,
    } = this.state;
    GetMasterServicesService({
      orderByName,
      orderByType,
      pageSize,
      name: searchValue,
      currentPage,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
              isSearch: true,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
              dataSource: ds.cloneWithRows(result),
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            dataSource: ds.cloneWithRows(result),
            currentPage: currentPage + 1,
            refresh: false,
            isSearch: true,
            noData: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            dataSource: dataSource.cloneWithRows(newItems),
            currentPage: currentPage + 1,
            loading: false,
            isSearch: true,
            isFlushDistance: '0',
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
  searchChange = (searchValue) => {
    this.setState({
      searchValue,
    });
  }
  _onRefresh = (searchValue) => {
    const historys = global.searchHistorys || [];
    let status = 1;
    historys.forEach((item) => {
      if (item.label === searchValue) {
        status = 0;
      }
    });
    console.log(historys, searchValue);
    if (searchValue && status) {
      historys.push({
        label: searchValue,
      });
      global.searchHistorys = historys;
      AsyncStorage.setItem('searchHistorys', JSON.stringify(historys));
    }
    this.setState({
      refresh: true,
      currentPage: 1,
      historys,
      isFlushDistance: '1',
      searchValue: searchValue || '',
    }, () => this.GetMasterServicesService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMasterServicesService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
