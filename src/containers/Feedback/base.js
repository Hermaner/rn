import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateFeedbackService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  CreateFeedbackService = () => {
    const { content } = this.state;
    if (!content) {
      Toast.show('信息不全');
      return;
    }
    this.sleek.toggle();
    CreateFeedbackService({
      content,
      title: '',
    }).then((res) => {
      this.sleek.toggle();
      console.log(res);
      if (res.isSuccess) {
        Toast.show('提交成功');
        this.props.pop();
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
};
export default Base;
