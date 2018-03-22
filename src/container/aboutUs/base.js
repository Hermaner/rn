import React from 'react';
import Toast from 'react-native-simple-toast';
import { CreateOpinionBackService } from '../../api';

class AboutUsBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  saveThinkText = (content) => {
    this.setState({
      content,
    });
  }
  submit = () => {
    const { content } = this.state;
    if (!content) {
      Toast.show('请填写您的宝贵建议！');
      return;
    }
    this.sleek.toggle();
    CreateOpinionBackService({
      content,
      memberId: global.memberId,
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('谢谢您的宝贵建议！');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
export default AboutUsBase;
