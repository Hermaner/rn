import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDecorationCaseService } from '../../api';

let canEnd = false;
class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      items: [],
      ds,
      decorationId: props.navigation.state.params.decorationId,
      dataSource: ds.cloneWithRows([]),
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
  GetDecorationCaseService = () => {
    const {
      pageSize,
      currentPage,
      refresh,
      decorationId,
      ds,
      items,
      dataSource,
    } = this.state;
    GetDecorationCaseService({
      pageSize,
      decorationId,
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
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
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
      console.log(err);
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.GetDecorationCaseService());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.GetDecorationCaseService());
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
