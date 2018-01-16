import React from 'react';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetNewsInfoService, CreateNewsCommentService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      newsInfo: '',
      animationType: 'none', // none slide fade
      visible: false, // 模态场景是否可见
      transparent: true, // 是否透明显示
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
    GetNewsInfoService({
      newsId,
    }).then((res) => {
      if (res.isSuccess) {
        const result = res.data;
        console.log('DDDDDDDDDD', result);
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
  saveLabel = (label) => {
    this.setState({
      label,
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
        const result = res.data;
        console.log('NEWNEWNEWNEWNENWENWNENWEN', result);
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
    this.setState({ visible: false });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
