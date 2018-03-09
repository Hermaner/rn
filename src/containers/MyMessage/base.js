import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetMemberMessageService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      orderByName: '',
      orderByType: '',
      refresh: false,
      loading: true,
      nomore: false,
      noData: false,
      pageSize: '15',
    };
  }
  getInit = () => {
    this._onRefresh();
  }
  GetMemberMessageService = () => {
    const {
      pageSize,
      currentPage,
      refresh,
      orderByName,
      orderByType,
      items,
    } = this.state;
    GetMemberMessageService({
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
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetMemberMessageService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetMemberMessageService());
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
