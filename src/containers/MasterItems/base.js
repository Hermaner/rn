import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMasterServicesService, DeleteMasterServicesService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      masterId: props.navigation.state.params.masterId,
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      orderByName: '',
      orderByType: '',
      pageSize: '15',
      currentPage: '1',
    };
  }
  getInit = () => {
    this._onRefresh();
    this.emitRefresh = DeviceEventEmitter.addListener('emitRefresh', () => {
      this._onRefresh();
    });
  }
  deleteInit = () => {
    this.emitRefresh.remove();
  }
  GetMasterServicesService = () => {
    const {
      pageSize,
      currentPage,
      refresh,
      orderByName,
      orderByType,
      items,
      masterId,
    } = this.state;
    GetMasterServicesService({
      masterId,
      orderByName,
      orderByType,
      pageSize,
      currentPage,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
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
            items: result,
            noData: false,
            currentPage: currentPage + 1,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
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
      console.log(err);
    });
  }
  del = (index) => {
    this.sleek.toggle();
    const { items } = this.state;
    DeleteMasterServicesService({
      masterServicesId: items[index].id,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        this._onRefresh();
        Toast.show('删除成功');
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
      items: [],
      currentPage: 1,
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
  navigation: PropTypes.object,
};
export default Base;
