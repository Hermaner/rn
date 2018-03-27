import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetFootPrint } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: true, // 是否没有更多
      noData: false, // 是否没有数据
      tu: require('../../assets/img/no.png'),
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this.getData);
  }
  getData = () => {
    const { memberId } = this.state;
    const { type } = this.props;
    this.sleek.toggle();
    GetFootPrint({
      type,
      memberId,
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        const timeList = [];
        const newTimeList = [];
        let n = 0;
        const myDate = (new Date()).getTime();
        result.sort((a, b) => b.postDate.substring(0, 11).replace(/-/g, '') - a.postDate.substring(0, 11).replace(/-/g, ''));
        for (let i = 0; i < result.length; i += 1) {
          timeList.push(result[i].postDate.substring(0, 11));
          const allTime =
          ((result[i].purchaseTime) * 86400000) + (new Date(result[i].postDate)).getTime();
          if (allTime > myDate) {
            result[i].surplusTime = JSON.stringify(Math.floor((allTime - myDate) / 1000 / 60 / 60 / 24));
          } else {
            result[i].surplusTime = '0';
          }
          if (type === '3') {
            for (let r = 0; r < result[i].memberVerifs.length; r += 1) {
              if (result[i].memberVerifs[r].verifFieldName === '实地认证') {
                result[i].isNot = 1;
                break;
              }
              result[i].isNot = 0;
            }
          }
        }
        for (let j = 0; j < timeList.length; j += 1) {
          if (timeList[j] !== timeList[j + 1]) {
            newTimeList.push(result.slice(n, j + 1));
            n = j + 1;
          }
        }
        if (result.length > 0) {
          this.setState({
            items: newTimeList,
            noData: false,
          });
        } else {
          this.setState({
            items: newTimeList,
            noData: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  type: PropTypes.string,
};
export default Base;
