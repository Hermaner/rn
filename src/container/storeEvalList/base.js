import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetMemberAllEvaluatService } from '../../api';

let canEnd = false;
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
      isImageDateShow: false,
    };
  }
  getInit = () => {
    this._onRefresh();
  }
  getData = () => {
    const { currentPage, pageSize, items, refresh } = this.state;
    const { type, isimgUrl, memberId } = this.props;
    GetMemberAllEvaluatService({
      type,
      isimgUrl,
      currentPage,
      pageSize,
      memberId,
    }).then((res) => {
      if (res.isSuccess) {
        console.log(res);
        const result = res.data.pageData;
        if (result.length === 0) {
          if (refresh) {
            this.setState({
              noData: true,
            });
          } else {
            this.setState({
              nomore: true,
              loading: false,
            });
          }
          return;
        }
        if (refresh) {
          console.log('@@@@@@@@@@@@', result);
          this.setState({
            items: result,
            currentPage: currentPage + 1,
            noData: false,
            refresh: false,
            nomore: false,
          });
        } else {
          const newItems = items.concat(result);
          this.setState({
            items: newItems,
            currentPage: currentPage + 1,
            loading: false,
          });
        }
        setTimeout(() => { canEnd = true; }, 0);
        if (result.length < pageSize) {
          this.setState({
            loading: false,
            nomore: true,
          });
        }
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  showImageDate = (imageDateIndex, imageData) => {
    const imageViewData = [];
    imageData.forEach(item => imageViewData.push({ url: item }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
  _onRefresh = () => {
    console.log('AAAAAAAAAAAAAAAAAAAa')
    this.setState({
      refresh: true,
      currentPage: 1,
    }, () => this.getData());
  }
  _reachEnd = () => {
    const { nomore } = this.state;
    if (canEnd && !nomore) {
      canEnd = false;
      this.setState({ loading: true }, () => this.getData());
    }
  }
}
Base.propTypes = {
  type: PropTypes.string,
  isimgUrl: PropTypes.string,
  memberId: PropTypes.string,
};
export default Base;
