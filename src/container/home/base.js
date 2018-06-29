import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter, NetInfo } from 'react-native';
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
        label: '发采购',
        image: require('../../assets/img/x1.png'),
      }, {
        label: '供应大厅',
        image: require('../../assets/img/x2.png'),
      }, {
        label: '行情大厅',
        image: require('../../assets/img/x3.png'),
      }, {
        label: '行情咨询',
        image: require('../../assets/img/x4.png'),
      }],
      imgList: [],
      SampleCenterList: [{
        text: '样品中心',
        push: 'SampleMainList',
        image: require('../../assets/img/x5.png'),
      }, {
        text: '保障货源',
        push: 'EnsureMainList',
        image: require('../../assets/img/x6.png'),
      }, {
        text: '推荐商家',
        push: 'RecommendBusiness',
        image: require('../../assets/img/x7.png'),
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
      seasonalsMain: [],
      seasonals: [],
      backgroundTopImg: '',
      backGround1: require('../../assets/img/bn1.png'),
      backgroundImg: '',
    };
  }
  getInit = () => {
    NetInfo.addEventListener(
       'connectionChange',
       this._handleConnectionInfoChange,
   );
    this.emitPushHome = DeviceEventEmitter.addListener('pushHome', (data) => {
      this.props.push(data);
    });
  }
  getData = () => {
    GetHomeCategoryService({
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const { categorys, seasonals } = res.data;
        categorys.push({
          name: '全部分类',
          imgUrl: '',
        });
        if (categorys.length > 8) {
          categorys.length = 8;
        }
        const seasonalsMain = seasonals.splice(0, 2);
        this.setState({
          seasonalsMain,
          categorys,
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
    NetInfo.removeEventListener(
        'connectionChange',
        this._handleConnectionInfoChange,
    );
  }
  _handleConnectionInfoChange = (status) => {
    const { type } = status;
    if (type === 'wifi' || type === 'cell') {
      this.getData();
    }
  }
  GetBackgroundImgService = () => {
    GetBackgroundImgService({
      type: '1',
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const imgList = res.data;
        const backgroundTopImg = res.map.backgroundTopImg.imgUrl;
        this.setState({
          imgList,
          backgroundTopImg,
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
      // console.log(res)
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
    const { imgList } = this.state;
    const { push } = this.props;
    switch (imgList[index].sourceTypeId) {
      case '1':
        push({ key: 'ImgInfo', params: { imgDetail: imgList[index].imgUrls } });
        break;
      case '2':
        push({ key: 'HuinongConsultDetail', params: { newsId: imgList[index].sourceId } });
        break;
      case '3':
        push({ key: 'GoodDetail', params: { supplyId: imgList[index].sourceId, memberId: imgList[index].supplyMemberId } });
        break;
      default:
    }
  }
  GetRecomSupplyService = () => {
    const { scurrentPage, pageSize, supplys, refresh } = this.state;
    GetRecomSupplyService({
      pageSize,
      currentPage: scurrentPage,
    }).then((res) => {
      // console.log(res)
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
