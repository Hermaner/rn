import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetOrderEvaluateService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderByName: '',
      orderByType: 'desc',
      currentPage: '',
      servicesTypeId: '',
      typeId: props.typeId,
      masterId: props.masterId,
      items: [],
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
  GetOrderEvaluateService = () => {
    const {
      orderByName,
      orderByType,
      pageSize,
      currentPage,
      refresh,
      servicesTypeId,
      typeId,
      items,
    } = this.state;
    GetOrderEvaluateService({
      orderByName,
      orderByType,
      pageSize,
      servicesTypeId,
      typeId,
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
            currentPage: currentPage + 1,
            refresh: false,
            noData: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
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
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetOrderEvaluateService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetOrderEvaluateService());
    }
  }
}
Base.propTypes = {
  masterId: PropTypes.string,
  typeId: PropTypes.string,
};
export default Base;
