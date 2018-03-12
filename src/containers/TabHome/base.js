import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import { Geocode } from 'react-native-baidumap-sdk'
import { GetMasterCaseService, AmapGeocode } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      refresh: false,
      cityName: '',
      banners: [{
        img: require('../../assets/img/choujiang.png'),
      }, {
        img: require('../../assets/img/nianhui.png'),
      }, {
        img: require('../../assets/img/xinnian.png'),
      }],
      bigTypes: [
        {
          icon: 'ios-unlock',
          text: '固价需求',
          color: '#ff892f',
          page: 'FixedList',
        },
        {
          icon: 'ios-construct',
          text: '安装维修',
          color: '#ff892f',
          page: 'ServiceList',
        },
        {
          icon: 'md-search',
          text: '找师傅',
          color: '#f86d5e',
          page: 'MasterCategory',
        },
      ],
      types: [
        {
          icon: 'logo-dropbox',
          text: '装修公司',
          color: '#eeba57',
          page: 'DecorateList',
        },
        {
          icon: 'ios-cube',
          text: '周边建材',
          color: '#9191d4',
          page: 'BmMarketList',
        },
        {
          icon: 'ios-flame',
          text: '平台入驻',
          color: '#9ed35a',
          page: 'ApplyWant',
        },
        {
          icon: 'ios-clipboard',
          text: '其他需求',
          color: '#00CD66',
          page: 'DemandCategory',
        },
        {
          icon: 'md-eye',
          text: '发现',
          color: '#8A2BE2',
          page: 'LuckVote',
        },
      ],
    };
  }
  getInit = () => {
    this.GetMasterCaseService();
    this.emitHomePosition = DeviceEventEmitter.addListener('emitHomePosition', (data) => {
      console.log(data);
      const {
        districtId,
        districtName,
      } = data;
      this.setState({
        districtId,
        districtName,
      });
    });
  }
  deleteInit = () => {
    this.emitHomePosition.remove();
  }
  _onRefresh = () => {
    this.GetMasterCaseService();
  }
  GetLocation = (location) => {
    const { longitude, latitude } = location;
    // this.AmapGeocode(`${longitude},${latitude}`);
    this.reverse({ longitude, latitude });
    global.longitude = longitude;
    global.latitude = latitude;
  }
  reverse = async (coordinate) => {
    const result = await Geocode.reverse(coordinate);
    const { province, city, adCode, address } = result;
    global.districtId = adCode;
    global.provinceName = province;
    global.cityName = city;
    global.address = address;
    this.setState({
      districtId: adCode,
      cityName: city,
    });
  }
  AmapGeocode = (location) => {
    AmapGeocode(location).then((res) => {
      if (res.info === 'OK') {
        const {
          adcode,
          province,
          city,
        } = res.regeocode.addressComponent;
        global.districtId = adcode;
        global.provinceName = province;
        global.cityName = city;
        this.setState({
          districtId: adcode,
          cityName: city,
        });
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  GetMasterCaseService = () => {
    GetMasterCaseService({
      orderByName: '',
      orderByType: '',
      pageSize: '3',
      currentPage: '1',
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.cases = res.data.pageData;
        this.setState({
          cases: res.data.pageData,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default Base;
