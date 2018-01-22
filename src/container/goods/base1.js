import React from 'react';
import Toast from 'react-native-simple-toast';
import { ListView } from 'react-native';
import PropTypes from 'prop-types';
import { GetPurchaseByCategoryService } from '../../api';

class Base1 extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.resetData = {
      ds,
      dataSource: ds.cloneWithRows([]),
      currentPage: 1,
      pageSize: '15',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      goodGoodsList: [],
      allGoods: [],
      memberId: '',
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    let { categoryId } = this.props;
    categoryId = categoryId || '';
    GetPurchaseByCategoryService({
      categoryId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          allGoods: result,
        });
      } else {
        Toast.show('温馨提示33');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}
Base1.propTypes = {
  categoryId: PropTypes.string,
};
export default Base1;
