import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import { UserSocket } from '../../components';
import {
  GetHomeCategoryService,
  GetRecomSupplyService,
  AmapGeocode,
  GetPlatformInfoService,
  GetBackgroundImgService,
} from '../../api';

@observer
class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainIcons: [{
        icon: 'icon-fasong',
        label: '发采购',
        color: '#f4bc22',
      }, {
        icon: 'icon-supplier',
        label: '供应大厅',
        color: '#51cd73',
      }, {
        icon: 'icon--nav-hangqing',
        label: '行情大厅',
        color: '#6098f9',
      }, {
        icon: 'icon-qunfengyijianfankui',
        label: '行情咨询',
        color: '#f85554',
      }],
      colorArray: ['#ff6a54', '#f96b57', '#eeba57', '#febf27', '#f2a050', '#9191d4', '#b1c26a', '#FD6300'],
      imgList: [],
      SampleCenterList: [{
        icn: 'ios-archive',
        text: '样品中心',
        push: 'SampleMainList',
        name: '全部分类',
      }, {
        icn: 'ios-checkmark-circle',
        text: '保障货源',
        push: 'EnsureMainList',
        name: '全部分类',
      }, {
        icn: 'logo-buffer',
        text: '推荐商家',
        push: 'RecommendBusiness',
      }],
      loadQueue: [0, 0, 0, 0],
      isRefreshing: false,
      loadMore: false,
      scurrentPage: 1,
      bcurrentPage: 1,
      refresh: false, // 是否是刷新
      loading: false, // 是否加载中
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      pageSize: '15',
      items: [],
      supplys: [],
      categorys: [], // 应季好货
      seasonals: [],
      backGround1: require('../../assets/img/bn1.png'),
      backgroundImg: '',
      swiperImgInfo: [],
    };
  }
  getInit = () => {
    this.getData();
    this.emitPushHome = DeviceEventEmitter.addListener('pushHome', (data) => {
      this.props.push(data);
    });
  }
  getData = () => {
    const { colorArray } = this.state;
    GetHomeCategoryService({
    }).then((res) => {
      // console.log('yyyyyyyyyyy', res)
      if (res.isSuccess) {
        const { categorys, seasonals } = res.data;
        let categorysArray = [];
        categorys.forEach((item, index) => {
          item.text = item.name.substr(0, 1);
          item.color = colorArray[index + 1];
        });
        categorys.unshift({
          text: '全',
          name: '全部',
          color: colorArray[0],
        });
        if (categorys.length > 8) {
          categorysArray = categorys.slice(0, 8);
        } else {
          categorysArray = categorys;
        }
        this.setState({
          categorys: categorysArray,
          seasonals,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
    this.GetBackgroundImgService();
    this._onRefreshSupply();
    this.GetPlatformInfoService();
  }
  deleteInit = () => {
    this.emitPushHome.remove();
  }
  GetBackgroundImgService = () => {
    GetBackgroundImgService({
      type: '1',
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
    });
  }
  GetPlatformInfoService = () => {
    GetPlatformInfoService({
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        global.phone = result[0].phone;
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
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
  GetRecomSupplyService = () => {
    const { scurrentPage, pageSize, supplys, refresh } = this.state;
    GetRecomSupplyService({
      pageSize,
      currentPage: scurrentPage,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              nomore: true,
              loading: false,
              refresh: false,
            });
            return;
          }
          this.setState({
            nomore: true,
            loading: false,
          });
          return;
        }
        if (refresh) {
          this.setState({
            supplys: result,
            scurrentPage: scurrentPage + 1,
            refresh: false,
            noData: false,
            loading: false,
            nomore: false,
          });
        } else {
          const newItems = supplys.concat(result);
          this.setState({
            supplys: newItems,
            scurrentPage: scurrentPage + 1,
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
        this.setState({
          refresh: false,
          nomore: true,
          loading: false,
        });
        Toast.show(res.msg);
      }
    }).catch(() => {
    });
  }
  GetLocation = (location) => {
    const { longitude, latitude } = location;
    this.AmapGeocode(longitude, latitude);
  }
  AmapGeocode = (longitude, latitude) => {
    AmapGeocode(`${longitude},${latitude}`).then((res) => {
      if (res.info === 'OK') {
        const {
          adcode,
          province,
          district,
          city,
        } = res.regeocode.addressComponent;
        const cityCode = `${adcode.substr(0, 4)}00`;
        const provinceCode = `${adcode.substr(0, 2)}0000`;
        const cityName = city.length === 0 ? province : city;
        global.districtCode = adcode;
        global.cityCode = cityCode;
        global.provinceCode = provinceCode;
        global.cityName = cityName;
        global.provinceName = province;
        global.districtName = district;
        global.latitude = latitude;
        global.longitude = longitude;
        UserSocket.changeLocal({
          longitude,
          latitude,
          districtCode: adcode,
          cityCode,
          provinceCode,
          cityName,
          provinceName: province,
          districtName: district,
        });
        this.setState({
          districtCode: adcode,
          districtName: district,
        });
      }
    }).catch(() => {
    });
  }
  goPage = (index) => {
    const { push } = this.props;
    switch (index) {
      case 0:
        push({ key: UserSocket.userData.memberId ? 'MainSearch' : 'User', params: { type: '2' } });
        break;
      case 1:
        push({ key: 'MainList' });
        break;
      case 2:
        push({ key: 'MarketHall' });
        break;
      case 3:
        push({ key: 'HuinongConsult' });
        break;
      default:
    }
  }
  _onRefreshSupply = () => {
    this.setState({
      refresh: true,
      scurrentPage: 1,
    }, () => this.GetRecomSupplyService());
  }
  _onScroll = (event) => {
    const { loading, nomore } = this.state;
    if (loading || nomore) {
      return;
    }
    const y = event.nativeEvent.contentOffset.y;
    const height = event.nativeEvent.layoutMeasurement.height;
    const contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 20) {
      this.setState({
        loading: true,
      }, this.GetRecomSupplyService);
    }
  }
}
Base.propTypes = {
  push: PropTypes.func,
};
export default Base;
