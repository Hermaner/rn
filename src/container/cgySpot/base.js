import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import Dateformat from 'dateformat';
import PropTypes from 'prop-types';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [{
        cur: true,
        title: '现货',
        label: '手头有货',
      }, {
        cur: false,
        title: '预售',
        label: '暂时无货',
      }],
      tabIndex: 0,
      isDateShow: false,
      dateIndex: 0,
      startDate: '',
      endDate: '',
    };
  }
  getDelete = () => {
    this.state = null;
  }
  tabBtn = (index) => {
    const { items, tabIndex } = this.state;
    if (index === tabIndex) {
      return;
    }
    items[tabIndex].cur = false;
    items[index].cur = true;
    this.setState({
      items,
      tabIndex: index,
    });
  }
  toggleDate = () => {
    this.setState({
      isDateShow: !this.state.isDateShow,
    });
  }
  dateConfirm = (c) => {
    const { dateIndex, startDate, endDate } = this.state;
    const date = Dateformat(c, 'yyyy-mm-dd');
    if (dateIndex === 0) {
      if (endDate) {
        const startDateTime = new Date(date);
        const endDateTime = new Date(endDate);
        if (startDateTime > endDateTime) {
          Toast.show('供货时间不能大于下架时间');
          return;
        }
      }
      this.setState({
        startDate: date,
      });
    } else {
      if (startDate) {
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(date);
        if (startDateTime > endDateTime) {
          Toast.show('供货时间不能大于下架时间');
          return;
        }
      }
      this.setState({
        endDate: date,
      });
    }
    this.toggleDate();
  }
  dateCancel = () => {
    this.toggleDate();
  }
  pickDate = (dateIndex) => {
    const { startDate, tabIndex } = this.state;
    if (dateIndex === 1 && !startDate && tabIndex === 1) {
      Toast.show('请先选择供货时间');
      return;
    }
    this.setState({
      dateIndex,
    });
    this.toggleDate();
  }
  saveData = () => {
    const {
      tabIndex,
      startDate,
      endDate,
    } = this.state;
    if (tabIndex === 1 && !startDate) {
      Toast.show('请先选择供货时间');
      return;
    }
    if (!endDate) {
      Toast.show('请先选择下架时间');
      return;
    }
    const data = {
      isSpotGoods: tabIndex === 0 ? '1' : '0',
      startDate,
      endDate,
    };
    DeviceEventEmitter.emit('getSpot', data);
    this.props.pop();
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
