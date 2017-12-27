import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        title: '供货模式',
        items: [{
          label: '基地直供',
        }, {
          label: '产地代办',
        }],
      }, {
        title: '物流方式',
        items: [{
          label: '协助找车',
        }, {
          label: '支持快递',
        }, {
          label: '支持空运',
        }, {
          label: '送货上门',
        }, {
          label: '零担拼车',
        }],
      }, {
        title: '提供服务',
        items: [{
          label: '清晰净品',
        }, {
          label: '按需分拣',
        }, {
          label: '按需包装',
        }, {
          label: '支持代卖',
        }, {
          label: '提供样品',
        }],
      }],
    };
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
};
export default Base;
