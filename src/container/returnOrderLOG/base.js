import React from 'react';
import Toast from 'react-native-simple-toast';
import PropTypes from 'prop-types';
import { GetDeliverOrderService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImgUrl: '',
      orderId: '',
      LOGInfo: '',
      list: [{
        name: '物流方式',
        label: '物流/快递发货',
        isBlock: false,
        push: '',
        haveIcn: false,
      }, {
        name: '公司名称',
        label: '',
        isBlock: false,
        push: '',
        haveIcn: false,
      }, {
        name: '单  号',
        label: '',
        isBlock: false,
        push: 'LogisticsInfo',
        haveIcn: true,
      }],
      imgList: [],
      info: '',
    };
  }
  getInit = () => {
    const { list } = this.state;
    const { info } = this.props.navigation.state.params;
    list[1].label = info.logisticsName;
    list[2].label = info.deliverNumber; // deliverNumber
    const imgArray = [];
    const img = info.imgUrls.split(',');
    for (let i = 0; i < img.length; i += 1) {
      imgArray.push({
        imgUrl: img[i],
      });
    }
    this.setState({
      info,
      list,
      imgList: imgArray,
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
