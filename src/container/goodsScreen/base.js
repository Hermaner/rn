import React from 'react';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { DeepClone } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.resetData = {
      items: [{
        title: '完成企业认证',
        id: '2',
        cur: false,
      }, {
        title: '完成个人认证',
        id: '3',
        cur: false,
      }, {
        title: '现货供应',
        id: '4',
        cur: false,
      }],
      distance: 0,
      minPrice: '',
      maxPrice: '',
      count: '',
      EntVerif: '',
      PersonVerif: '',
      SpotGoods: '',
    };
  }
  onChangeText = (txt, index) => {
    switch (index) {
      case 0:
        this.setState({
          minPrice: txt,
        });
        break;
      case 1:
        this.setState({
          maxPrice: txt,
        });
        break;
      case 2:
        this.setState({
          count: txt,
        });
        break;
      default:
    }
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' });
  }
  resetState = () => {
    this.setState({
      ...DeepClone(this.resetData),
    });
  }
  changeItem = (index) => {
    const { items } = this.state;
    items[index].cur = !items[index].cur;
    this.setState({
      items,
    });
    for (let i = 0; i < this.state.items.length; i += 1) {
      if (index === 0) {
        if (this.state.items[0].cur) {
          this.setState({
            EntVerif: '1',
          });
        } else {
          this.setState({
            EntVerif: '0',
          });
        }
      }
      if (i === 1) {
        if (this.state.items[1].cur) {
          this.setState({
            PersonVerif: '1',
          });
        } else {
          this.setState({
            PersonVerif: '0',
          });
        }
      }
      if (i === 2) {
        if (this.state.items[2].cur) {
          this.setState({
            SpotGoods: '1',
          });
        } else {
          this.setState({
            SpotGoods: '0',
          });
        }
      }
    }
  }
  selectDistrict = () => {
    const { EntVerif,
      PersonVerif,
      SpotGoods,
      distance,
      minPrice,
      maxPrice,
      count,
      memberId } = this.state;
    const data = {
      EntVerif,
      PersonVerif,
      SpotGoods,
      distance: distance * 1000,
      minPrice,
      maxPrice,
      count,
      memberId,
    };
    if (!memberId) {
      this.props.push({ key: 'User' });
      return;
    }
    const { type } = this.props.navigation.state.params;
    let emit;
    switch (type) {
      case 'getMainList':
        emit = 'getMainList';
        break;
      default:
    }
    DeviceEventEmitter.emit(emit, data);
    this.props.pop();
  }
}
Base.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
