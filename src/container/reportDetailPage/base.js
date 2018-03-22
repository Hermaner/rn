import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateReportService } from '../../api';


class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImgUrl: [],
      reason: '',
      beMemberId: '',
      supplyId: '',
    };
  }
  getInit = () => {
    const { beMemberId, supplyId, type } = this.props.navigation.state.params;
    this.setState({
      beMemberId,
      supplyId,
      type,
    });
  }
  getImages = (upImages) => {
    this.setState({
      frontImgUrl: upImages,
    });
  }
  saveLabel = (label) => {
    this.setState({
      reason: label,
      labelLength: label.length,
    });
    if (label.length >= 200) {
      this.setState({
        label: label.substring(0, 199),
      });
      Toast.show('字数请控制在200字以内');
    }
  }
  submit = () => {
    this.sleek.toggle();
    const { beMemberId, supplyId, type, reason, frontImgUrl } = this.state;
    const reports = [];
    const imgUrls = [];
    if (!reason) {
      Toast.show('请填写举报理由！');
      return;
    }
    if (frontImgUrl.length <= 0) {
      Toast.show('请上传相关图片！');
      return;
    }
    for (let i = 0; i < frontImgUrl.length; i += 1) {
      imgUrls.push(frontImgUrl[i].key);
    }
    reports.push({
      type,
      reason,
      imgUrls: imgUrls.toString(),
    });
    CreateReportService({
      memberId: global.memberId,
      beMemberId,
      supplyId,
      reports: JSON.stringify(reports),
    }).then((res) => {
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('您的举报信息已成功提交！');
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
