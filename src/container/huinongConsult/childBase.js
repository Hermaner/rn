import React from 'react';
import { ListView } from 'react-native';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetNewsService } from '../../api';

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
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      title: '',
      imgLists: [{
        img: 'https://imgsa.baidu.com/forum/w%3D580/sign=85648f46875494ee87220f111df4e0e1/bd19970a304e251fe370ea01ac86c9177e3e5375.jpg',
        title: '2017年12月25日鸡蛋价格行情',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        title: '今日朝鲜人名军正式跟美军宣布开战',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        title: '好吃不如饺子，好玩不如筛子',
      }, {
        img: 'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg',
        title: '噫吁嚱，金戈铁马，气吞万里如虎',
      }],
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { ds, title } = this.state;
    const { type } = this.props;
    GetNewsService({
      type,
      title,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data;
        const imgList = [];
        const swiperLength = result.length > 3 ? 3 : result.length;
        for (let i = 0; i < swiperLength; i += 1) {
          imgList.push({
            img: result[i].newsImages[0].imgUrl,
            title: result[i].title,
            time: result[i].postDate.substring(0, 10),
            lookCount: result[i].lookCount,
            newsId: result[i].newsId,
          });
        }
        this.setState({
          dataSource: ds.cloneWithRows(result),
          imgLists: imgList,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _onRefresh = () => {
    this.getData();
  }
}
Base.propTypes = {
  type: PropTypes.string,
};
export default Base;
