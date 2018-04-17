import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { FilterMarketInfoService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.navigation.state.params.item,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
      currentPage: 1,
      items: [],
      catLeftIndex: 0,
      catRightIndex: null,
      goods: [],
      cityCode: '',
      childgoods: [],
    };
  }
  getInit = () => {
    this.emitCitys = DeviceEventEmitter.addListener('emitCitys', (data) => {
      this.selectCity(data);
    });
    this._onRefresh();
  }
  getDelete = () => {
    this.emitCitys.remove();
  }
  FilterMarketInfoService = () => {
    const {
      currentPage,
      pageSize,
      refresh,
      item,
      items,
      cityCode,
    } = this.state;
    FilterMarketInfoService({
      currentPage,
      pageSize,
      cityCode,
      name: item.name,
    }).then((res) => {
      if (res.isSuccess) {
        // console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              refresh: false,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: false,
            isFlushDistance: '0',
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
            noData: false,
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
    }).catch(() => {
    });
  }
  showAction = () => {
    this.props.push({ key: 'CgCitys', params: { type: 'emitCitys' } });
  }
  selectCity = (data) => {
    this.setState({
      provinceCode: data.ProvinceCode,
      cityCode: data.CityCode,
      cityName: data.CityName,
    }, this._onRefresh);
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.FilterMarketInfoService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.FilterMarketInfoService());
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
