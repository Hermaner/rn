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
    };
  }
  getInit = () => {
    const { orderId } = this.props.navigation.state.params;
    this.setState({
      orderId,
    }, this.getData);
  }
  getData = () => {
    const { orderId, list } = this.state;
    GetDeliverOrderService({
      orderId,
    }).then((res) => {
      console.log(res);
      if (res.isSuccess) {
        const result = res.data;
        const myImg = [];
        for (let i = 0; i < list.length; i += 1) {
          list[1].label = result.logisticsName;
          list[2].label = result.deliverOrderNumber;
        }
        if (result.imgUrls) {
          const img = result.imgUrls.split(',');
          for (let i = 0; i < img.length; i += 1) {
            myImg.push({
              imgUrl: img[i],
            });
          }
          this.setState({
            imgList: myImg,
          });
        }
        this.setState({
          LOGInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
}
Base.propTypes = {
  navigation: PropTypes.object,
};
export default Base;
