import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetNewsService } from '../../api';

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
      nomore: false, // 是否没有更多
      noData: false, // 是否没有数据
      title: '',
      imgLists: [],
    };
  }
  getInit = () => {
    this.setState({ memberId: global.memberId || '' }, this._onRefresh);
  }
  getData = () => {
    const { title } = this.state;
    const { type } = this.props;
    GetNewsService({
      newsTypeId: type,
      title,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        const imgList = [];
        const swiperLength = result.length > 3 ? 3 : result.length;
        for (let i = 0; i < swiperLength; i += 1) {
          imgList.push({
            img: (result[i].newsImages !== null) && (result[i].newsImages.length) > 0 ? result[i].newsImages[0].imgUrl : '',
            title: result[i].title || '',
            time: result[i].postDate.substring(0, 10),
            lookCount: result[i].lookCount || 0,
            newsId: result[i].newsId,
          });
        }
        console.log(imgList);
        if (result.length > 0) {
          this.setState({
            items: result,
            noData: false,
            imgLists: imgList,
          });
        } else {
          this.setState({
            items: result,
            noData: true,
            imgLists: imgList,
          });
        }
      } else {
        Toast.show(res.msg);
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
