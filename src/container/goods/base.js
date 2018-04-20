import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { FilterPurchaseService, GetHomeNewsService, GetBackgroundImgService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      currentPage: 1,
      pageSize: '15',
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      items: [],
      mainIcons: [{
        icon: 'icon-fasong',
        label: '发供应',
        color: '#f4bc22',
        page: { key: global.memberId ? 'MainSearch' : 'User', params: { type: '3' } },
      }, {
        icon: 'icon-dingdanwuliaocaigouruku',
        label: '采购大厅',
        color: '#51cd73',
        page: { key: 'ReleaseMainList' },
      }, {
        icon: 'icon--nav-hangqing',
        label: '行情大厅',
        color: '#6098f9',
        page: { key: 'MainSearch', params: { type: '3' } },
      }, {
        icon: 'icon-wode',
        label: '我的供应',
        color: '#f85554',
        page: { key: 'MySupply' },
      }],
      secendList: [{
        icon: 'icon-homepage',
        label: '实力商家',
        color: '#f4bc22',
      }, {
        icon: 'icon-201',
        label: '优质采购商',
        color: '#51cd73',
      }, {
        icon: 'icon-zizhutuiguang',
        label: '享免费推广',
        color: '#f85554',
      }, {
        icon: 'icon-qunfengfuwushang',
        label: '产地服务商',
        color: '#6098f9',
        swiperImgInfo: [],
      }],
      imgList: [],
      goodGoodsList: [],
      backGround1: require('../../assets/img/bn2.png'),
      noImg: require('../../assets/img/no.png'),
      newsList: [],
      threeNewsList: [],
      twoNewsList: [],
      newTwo: [],
      newThree: [],
      img: [],
      backgroundImg: '',
    };
  }
  getInit = () => {
    this.FilterPurchaseService();
    this.GetHomeNewsService();
    this.GetBackgroundImgService();
  }
  getDelete = () => {
    this.state = null;
  }
  imgPush = (index) => {
    const { swiperImgInfo } = this.state;
    if (swiperImgInfo[index].sourceTypeId === '1') {
      this.props.push({ key: 'ImgInfo', params: { imgDetail: swiperImgInfo[index].imgUrls } });
      return;
    }
    if (swiperImgInfo[index].sourceTypeId === '2') {
      this.props.push({ key: 'HuinongConsultDetail', params: { newsId: swiperImgInfo[index].sourceId } });
      return;
    }
    if (swiperImgInfo[index].sourceTypeId === '3') {
      this.props.push({ key: 'GoodDetail', params: { supplyId: swiperImgInfo[index].sourceId, memberId: swiperImgInfo[index].supplyMemberId } });
    }
  }
  GetHomeNewsService = () => {
    const categoryId = '';
    GetHomeNewsService({
      categoryId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        const three = [];
        const newThree = [];
        const two = [];
        const newTwo = [];
        const img = [];
        for (let i = 0; i < result.length; i += 1) {
          if (result[i].newsTypeId === '1') {
            three.push(result[i]);
          }
          if (result[i].newsTypeId === '2') {
            two.push(result[i]);
          }
        }
        for (let i = 0; i < (two.length > 2 ? 2 : two.length); i += 1) {
          newTwo.push(two[i]);
        }
        for (let i = 0; i < (three.length > 3 ? 3 : three.length); i += 1) {
          newThree.push(three[i]);
          if (result[i].newsImages.length > 0) {
            img.push(result[i].newsImages[0].imgUrl);
          }
        }
        this.setState({
          twoNewsList: newTwo,
          threeNewsList: three,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  FilterPurchaseService = () => {
    const {
      items,
      refresh,
      currentPage,
      pageSize } = this.state;
    FilterPurchaseService({
      name: '',
      categoryId: '',
      provinceCode: '',
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              nomore: true,
              loading: false,
              refresh: false,
            });
          } else {
            this.setState({
              nomore: true,
              refresh: false,
              loading: false,
              items: result,
            });
          }
          return;
        }
        if (refresh) {
          this.setState({
            items: result,
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
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  GetBackgroundImgService = () => {
    GetBackgroundImgService({
      type: '2',
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        const newImgArray = [];
        if (result !== '' && result !== null && result.length > 0) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].imgUrl !== '' && result[i].imgUrl !== null) {
              newImgArray.push({
                imgKey: i,
                img: result[i].imgUrl,
              });
            }
          }
        }
        this.setState({
          imgList: newImgArray,
          swiperImgInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      this.sleek.toggle();
    });
  }
  goPage = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push({ key: global.memberId ? 'MainSearch' : 'User', params: { type: '3' } });
        break;
      case 1:
        push({ key: 'ReleaseMainList' });
        break;
      case 2:
        push({ key: 'MarketHall' });
        break;
      case 3:
        push({ key: global.memberId ? 'MySupply' : 'User' });
        break;
      default:
    }
  }
  goBusinessPage = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push({ key: 'StrengthBusiness' });
        break;
      case 1:
        push({ key: 'HighQualityPurchasers' });
        break;
      case 2:
        push({ key: global.memberId ? 'ProductSignedUp' : 'User' });
        break;
      case 3:
        push({ key: 'FacilitatorRecruit' });
        break;
      default:
    }
  }
  _onRefresh = () => {
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getInit());
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
