import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import Toast from 'react-native-simple-toast';
import { GetMasterCaseService, AmapGeocode } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cases: [],
      refresh: false,
      districtName: '',
      banners: [{
        img: require('../../assets/img/choujiang.png'),
      }, {
        img: require('../../assets/img/nianhui.png'),
      }, {
        img: require('../../assets/img/xinnian.png'),
      }],
      bigTypes: [
        {
          icon: 'icon-kefu',
          text: '估价需求',
          color: '#ff892f',
          page: 'FixedList',
        },
        {
          icon: 'icon-kefu',
          text: '安装维修',
          color: '#ff892f',
          page: 'ServiceList',
        },
        {
          icon: 'icon-kefu',
          text: '找师傅',
          color: '#f86d5e',
          page: 'MasterCategory',
        },
      ],
      types: [
        {
          icon: 'icon-kefu',
          text: '装修公司',
          color: '#eeba57',
          page: 'DecorateList',
        },
        {
          icon: 'icon-kefu',
          text: '周边建材',
          color: '#9191d4',
          page: 'BmMarketList',
        },
        {
          icon: 'icon-kefu',
          text: '平台入驻',
          color: '#9ed35a',
          page: 'ApplyWant',
        },
        {
          icon: 'icon-kefu',
          text: '其他需求',
          color: '#00CD66',
          page: 'DemandCategory',
        },
        {
          icon: 'icon-kefu',
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
    this.AmapGeocode(`${longitude},${latitude}`);
    global.longitude = longitude;
    global.latitude = latitude;
  }
  AmapGeocode = (location) => {
    AmapGeocode(location).then((res) => {
      console.log(res);
      if (res.info === 'OK') {
        const {
          adcode,
          province,
          district,
        } = res.regeocode.addressComponent;
        global.districtId = adcode;
        global.provinceName = province;
        global.districtName = district;
        this.setState({
          districtId: adcode,
          districtName: district,
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
