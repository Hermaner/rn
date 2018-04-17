import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetCallRecordService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isFollow: false,
      currentPage: 1,
      pageSize: '15',
      memberId: '',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      searchVal: '',
    };
  }
  onSearchChange = (searchVal) => {
    this.setState({
      searchVal,
    });
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { type } = this.props;
    this.sleek.toggle();
    GetCallRecordService({
      type,
    }).then((res) => {
      this.sleek.toggle();
      // console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          refresh: false,
          items: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
}
Base.propTypes = {
  type: PropTypes.string,
};

export default Base;
