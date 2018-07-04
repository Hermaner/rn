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
        label: '发供应',
        image: require('../../assets/img/g1.png'),
      }, {
        label: '采购大厅',
        image: require('../../assets/img/x2.png'),
      }, {
        label: '行情大厅',
        image: require('../../assets/img/g3.png'),
      }, {
        label: '我的供应',
        image: require('../../assets/img/g4.png'),
      }],
      secendList: [{
        image: require('../../assets/img/g5.png'),
        label: '实力商家',
        color: '#f4bc22',
      }, {
        image: require('../../assets/img/g6.png'),
        label: '优质采购商',
        color: '#51cd73',
      }, {
        image: require('../../assets/img/g7.png'),
        label: '享免费推广',
        color: '#f85554',
      }, {
        image: require('../../assets/img/g8.png'),
        label: '产地服务商',
        color: '#6098f9',
        imgList: [],
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
      backgroundTopImg: '',
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
    const { imgList } = this.state;
    if (imgList[index].sourceTypeId === '1') {
      this.props.push({ key: 'ImgInfo', params: { imgDetail: imgList[index].imgUrls } });
      return;
    }
    if (imgList[index].sourceTypeId === '2') {
      this.props.push({ key: 'HuinongConsultDetail', params: { newsId: imgList[index].sourceId } });
      return;
    }
    if (imgList[index].sourceTypeId === '3') {
      this.props.push({ key: 'GoodDetail', params: { supplyId: imgList[index].sourceId, memberId: imgList[index].supplyMemberId } });
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
      currentPage,
      pageSize,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data.pageData;
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
      console.log(res);
      if (res.isSuccess) {
        const imgList = res.data;
        if (res.map.backgroundTopImg) {
          this.setState({
            backgroundTopImg: res.map.backgroundTopImg.imgUrl,
          });
        }
        this.setState({
          imgList,
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
