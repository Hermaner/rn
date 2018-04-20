import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetPurchaseByOneLevelCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getInit = () => {
    this.getData();
  }
  getDelete = () => {
    this.state = null;
  }
  getData = () => {
    const { categoryId } = this.props;
    GetPurchaseByOneLevelCategoryService({
      categoryId,
    }).then((res) => {
      // console.log(res);
      if (res.isSuccess) {
        const items = res.data;
        if (items.length > 0) {
          this.setState({
            items,
            noData: false,
          });
        } else {
          this.setState({
            noData: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
}
Base.propTypes = {
  categoryId: PropTypes.string,
};
export default Base;
