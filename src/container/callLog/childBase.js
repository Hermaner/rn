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
    };
  }
  getInit = () => {
    if (!global.memberId) {
      return;
    }
    this.getData();
  }
  getDelete = () => {
    this.state = null;
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
          items: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
}
Base.propTypes = {
  type: PropTypes.string,
};

export default Base;
