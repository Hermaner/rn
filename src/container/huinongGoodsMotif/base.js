import React from 'react';
import Toast from 'react-native-simple-toast';
import { Platform } from 'react-native';
import PropTypes from 'prop-types';
import { GetChildSeasonCategoryService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      isRefreshing: false, // 是否是刷新
      loading: false, // 是否加载中
      loadMore: false,
      refresh: false,
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      title: '',
      brands: null,
      name: '',
      isTabOne: 0,
      categoryId: '',
      goodsItems: [],
      seasonCategoryId: '',
      backGround1: require('../../assets/img/haohuo.jpg'),
      haveData: false,
    };
    this.scrollY = 0;
  }
  getInit = () => {
    const { seasonCategoryId } = this.props.navigation.state.params;
    this.setState({
      seasonCategoryId,
    }, this.getData);
  }
  getData = () => {
    const { seasonCategoryId } = this.state;
    this.sleek.toggle();
    GetChildSeasonCategoryService({
      seasonCategoryId,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].supplys !== null && result[i].supplys !== '' && result[i].supplys.length > 0) {
            this.setState({
              haveData: true,
              loading: true,
            });
          }
        }
        this.setState({
          goodsItems: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  goChat = (item) => {
    if (!global.memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    if (item.memberId.toString() === global.memberId.toString()) {
      Toast.show('无法跟自己聊天');
      return;
    }
    this.props.push({ key: 'ChatRoom',
      params: {
        item: {
          memberId: item.memberId,
          userName: item.nickName,
          imgUrl: item.imgUrl,
        },
      },
    });
  }
  _onGetGotSupplyService = () => {
    this.setState({
      refresh: true,
    }, () => this.getData());
  }
  changeTab = (index) => {
    this[`view${index}`].measure((fx, fy, width, height, px, py) => {
      this.ScrollView.scrollTo({ y: py - (Platform.OS === 'android' ? 110 : 130) + this.scrollY, animated: true }, 1);
    });
  }
  _onScroll = (event) => {
    this.scrollY = event.nativeEvent.contentOffset.y;
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
  push: PropTypes.func,
};
export default Base;
