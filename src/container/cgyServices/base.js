import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { GetServiceModeService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      supplyMode: [],
      logisticsMode: [],
      renderServices: [],
    };
  }
  getInit = () => {
    const { supplyMode, logisticsMode, renderServices } = this.props.navigation.state.params;
    this.setState({
      supplyMode: supplyMode.split(','),
      logisticsMode: logisticsMode.split(','),
      renderServices: renderServices.split(','),
    }, this.getData);
  }
  getData = () => {
    const { data, supplyMode, logisticsMode, renderServices } = this.state;
    const items1 = [];
    const items2 = [];
    const items3 = [];
    GetServiceModeService({
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        if (result && result.length > 0) {
          for (let i = 0; i < result.length; i += 1) {
            if (result[i].type === '1') {
              items1.push({
                label: result[i].name,
              });
            }
            if (result[i].type === '2') {
              items2.push({
                label: result[i].name,
              });
            }
            if (result[i].type === '3') {
              items3.push({
                label: result[i].name,
              });
            }
          }
          if (items1.length > 0) {
            for (let i = 0; i < items1.length; i += 1) {
              for (let j = 0; j < supplyMode.length; j += 1) {
                if (items1[i].label === supplyMode[j]) {
                  items1[i].cur = true;
                }
              }
            }
            data.push({
              title: '供货模式',
              items: items1,
            });
          }
          if (items2.length > 0) {
            for (let i = 0; i < items2.length; i += 1) {
              for (let j = 0; j < logisticsMode.length; j += 1) {
                if (items2[i].label === logisticsMode[j]) {
                  items2[i].cur = true;
                }
              }
            }
            data.push({
              title: '物流方式',
              items: items2,
            });
          }
          if (items3.length > 0) {
            for (let i = 0; i < items3.length; i += 1) {
              for (let j = 0; j < renderServices.length; j += 1) {
                if (items3[i].label === renderServices[j]) {
                  items3[i].cur = true;
                }
              }
            }
            data.push({
              title: '提供服务',
              items: items3,
            });
          }
        }
        this.setState({
          userInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch(() => {
      // this.sleek.toggle();
    });
  }
  tabList = (index, i) => {
    const { data } = this.state;
    data[index].items[i].cur = !data[index].items[i].cur;
    this.setState({
      data,
    });
  }
  saveData = () => {
    const { data } = this.state;
    const obj = [[], [], []];
    data.forEach((items, index) => {
      items.items.forEach((item) => {
        if (item.cur) {
          obj[index].push(item.label);
        }
      });
    });
    const supplyMode = obj[0].join(',');
    const logisticsMode = obj[1].join(',');
    const renderServices = obj[2].join(',');
    const sendData = {
      supplyMode,
      logisticsMode,
      renderServices,
    };
    DeviceEventEmitter.emit('sendCfyService', sendData);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
