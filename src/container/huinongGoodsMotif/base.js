import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetGotSupplyService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
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
      imgLists: [{
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
        goodsName: '四川脐橙 4-8两',
        price: '3.2',
        tj: '10.0斤起批',
        name: '刘德华',
        place: '湖北省武汉市',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        goodsName: '四川脐橙 4-8两',
        price: '3.2',
        tj: '10.0斤起批',
        name: '刘德华',
        place: '湖北省武汉市',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        goodsName: '四川脐橙 4-8两',
        price: '3.2',
        tj: '10.0斤起批',
        name: '刘德华',
        place: '湖北省武汉市',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg',
        goodsName: '四川脐橙 4-8两',
        price: '3.2',
        tj: '10.0斤起批',
        name: '刘德华',
        place: '湖北省武汉市',
      }, {
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
        goodsName: '四川脐橙 4-8两',
        price: '3.2',
        tj: '10.0斤起批',
        name: '刘德华',
        place: '湖北省武汉市',
      }],
      brands: null,
      name: '',
      isTabOne: 0,
      categoryId: '',
    };
  }
  getInit = () => {
    const { brands, categoryId } = this.props.navigation.state.params;
    this.setState({
      brands,
      categoryId,
    }, this.getData);
  }
  getData = () => {
    const { ds, categoryId } = this.state;
    let { brandId } = this.props;
    brandId = brandId || '';
    GetGotSupplyService({
      categoryId,
      brandId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          goodsItems: result,
          dataSource: ds.cloneWithRows(result),
        });
      } else {
        Toast.show('温馨提示ww');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _onGetGotSupplyService = () => {
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
  tabChange = (isTabOne) => {
    this.setState({
      isTabOne,
      nomore: false,
    });
  }
  _onScroll = (event) => {
    const { isTabOne, loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.setState({
        loading: true,
      }, isTabOne === 1 ? this.GetVerifSupplyService : this.GetGoodBusinesService);
    }
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
  categoryId: PropTypes.string,
  brandId: PropTypes.string,
};
export default Base;
