import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetFootPrint } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      ds,
      dataSource: ds.cloneWithRows([]),
      items: [],
      currentPage: 1,
      pageSize: '5',
      isSleekShow: false,
      refresh: false, // 是否是刷新
      loading: true, // 是否加载中
      nomore: true, // 是否没有更多
      noData: false, // 是否没有数据
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId }, this.getData);
  }
  getData = () => {
    const { memberId, ds } = this.state;
    const { type } = this.props;
    GetFootPrint({
      type,
      memberId,
    }).then((res) => {
      console.log('@@@@@@@', res);
      if (res.isSuccess) {
        console.log('SSSSSSSSSSSSSSSs');
        const result = res.data;
        console.log('RRRRRRRRRRRR', result);
        const timeList = [];
        const newTimeList = [];
        let n = 0;
        const myDate = (new Date()).getTime();
        result.sort((a, b) => b.postDate.substring(0, 11).replace(/-/g, '') - a.postDate.substring(0, 11).replace(/-/g, ''));
        for (let i = 0; i < result.length; i += 1) {
          timeList.push(result[i].postDate.substring(0, 11));
          console.log('TTTTTTTTT', timeList);
          const allTime =
          ((result[i].purchaseTime) * 86400000) + (new Date(result[i].postDate)).getTime();
          const surplusTime = Math.floor((allTime - myDate) / 1000 / 60 / 60 / 24);
          result[i].surplusTime = surplusTime;
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
        console.log('KKKKKKKKKKK', newTimeList);
        this.setState({
          items: newTimeList,
          dataSource: ds.cloneWithRows(newTimeList),
        });
        console.log('BBBBBBBBBBBB', this.state.items);
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  type: PropTypes.string,
  // push: PropTypes.func,
};
export default Base;
