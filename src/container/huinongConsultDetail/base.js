import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetNewsInfoService, CreateNewsCommentService, CreateCommentPraiseService, GetNewsService, CreateNewsPraiseService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newsInfo: '',
      animationType: 'none', // none slide fade
      visible: false, // 模态场景是否可见
      transparent: true, // 是否透明显示
      isReadAll: false, // 是否阅读全部
    };
  }
  getInit = () => {
    const { newsId } = this.props.navigation.state.params;
    this.setState({
      memberId: global.memberId,
      newsId,
    }, this.getData);
  }
  getData = () => {
    const { newsId } = this.state;
    const type = '';
    const title = '';
    GetNewsInfoService({
      newsId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        const firstPL = [];
        const aa = result.newsComments.length > 3 ? 3 : result.newsComments.length;
        for (let i = 0; i < aa; i += 1) {
          firstPL.push(result.newsComments[i]);
          result.firstPL = firstPL;
        }
        result.length = result.newsComments.length;
        result.allLength = result.newsComments.length;
        result.startLength = result.newsPraises.length;
        this.setState({
          newsInfo: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });

    GetNewsService({
      type,
      title,
    }).then((res) => {
      if (res.isSuccess) {
        console.log('ZZZZZZZZZZZz', res);
        const result1 = res.data;
        const newsList = [];
        const newsLength = result1.length > 5 ? 5 : result1.length;
        for (let i = 0; i < newsLength; i += 1) {
          newsList.push(result1[i]);
        }
        this.setState({
          newsList,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      Toast.show(err);
    });
  }
  saveLabel = (label) => {
    this.setState({
      label,
      labelLength: label.length,
    });
    if (label.length > 100) {
      Toast.show('字数请控制在100字以内');
      this.setState({
        label: label.substring(0, 99),
      });
    }
  }
  readAll = () => {
    this.setState({
      isReadAll: !this.state.isReadAll,
    });
  }
  CreateNewsCommentService= () => {
    const { label, newsId, memberId } = this.state;
    this.sleek.toggle();
    CreateNewsCommentService({
      newsId,
      memberId,
      label,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        this.getInit();
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
    this.setState({ visible: false });
  }
  CreateCommentPraiseService = (newsCommentId) => {
    const { memberId, newsInfo } = this.state;
    if (newsInfo.newsComments.length > 0) {
      for (let i = 0; i < newsInfo.newsComments.length; i += 1) {
        if (newsCommentId === newsInfo.newsComments[i].newsCommentId) {
          for (let j = 0; j < newsInfo.newsComments[i].commentPraises.length; j += 1) {
            if (memberId === newsInfo.newsComments[i].commentPraises[j].memberId) {
              Toast.show('请不要重复点赞！');
              return;
            }
          }
        }
      }
    }
    this.sleek.toggle();
    CreateCommentPraiseService({
      memberId,
      newsCommentId,
    }).then((res) => {
      this.sleek.toggle();
      this.getData();
      if (res.isSuccess) {
        const result = res.data;
        console.log('JIEJIEJIEJIEJIEJIEJIE', res);
        this.setState({
          newsInfo: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
  CreateNewsPraiseService = (newsId) => {
    const { memberId, newsInfo } = this.state;
    if (newsInfo.newsPraises.length > 0) {
      for (let i = 0; i < newsInfo.newsPraises.length; i += 1) {
        if (newsInfo.newsPraises[i].memberId === memberId) {
          Toast.show('请不要重复点赞！');
          return;
        }
      }
    }
    this.sleek.toggle();
    CreateNewsPraiseService({
      memberId,
      newsId,
    }).then((res) => {
      this.sleek.toggle();
      this.getData();
      if (res.isSuccess) {
        const result = res.data;
        console.log('JIEJIEJIEJIEJIEJIEJIE', res);
        this.setState({
          newsInfo: result,
        });
      } else {
        Toast.show('温馨提示');
      }
    }).catch((err) => {
      this.sleek.toggle();
      Toast.show(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
