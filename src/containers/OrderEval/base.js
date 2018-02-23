import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { CreateOrderEvaluateService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      upImages: [],
      orderId: this.props.navigation.state.params.orderId,
      typeId: [],
      content: '',
      types: [{
        label: '差评',
        value: '1',
      }, {
        label: '中评',
        value: '2',
      }, {
        label: '好评',
        value: '3',
      }],
      attitudeScore: 0,
      qualityScore: 0,
    };
  }
  getImages = (upImages) => {
    console.log(upImages);
    this.setState({
      upImages,
    });
  }
  CreateOrderEvaluateService = () => {
    const { orderId, typeId, content, upImages, attitudeScore, qualityScore } = this.state;
    if (typeId.length === 0) {
      Toast.show('请选择整体评价');
      return;
    }
    this.sleek.toggle();
    CreateOrderEvaluateService({
      orderId,
      typeId: typeId[0],
      content,
      imgUrl: upImages.join(','),
      memberId: global.memberId,
      attitudeScore: attitudeScore || '5',
      qualityScore: qualityScore || '5',
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        Toast.show('评价成功');
        this.props.pop();
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  backCheck = (typeId) => {
    console.log(typeId);
    this.setState({
      typeId,
    });
  }
}
Base.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default Base;
