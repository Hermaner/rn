import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetNoviceDealGuideService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      isRefreshing: false, // 是否是刷新
      loading: true, // 是否加载中
      loadMore: false,
      refresh: false,
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      title: '',
      brands: null,
      name: '',
      isTabOne: 0,
      categoryId: '',
      seasonCategoryId: '',
      backGround1: require('../../assets/img/haohuo.jpg'),
      haveData: false,
      backImg: '',
    };
  }
  getData = () => {
    this.sleek.toggle();
    GetNoviceDealGuideService({
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data.news;
        this.setState({
          backImg: res.data.background.imgUrl || '',
          goodsItems: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  _onGetGotSupplyService = () => {
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
  tabChange = (isTabOne, seasonCategoryId) => {
    this.setState({
      isTabOne,
      seasonCategoryId,
      nomore: false,
    }, this.getData);
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  categoryId: PropTypes.string,
};
export default Base;
