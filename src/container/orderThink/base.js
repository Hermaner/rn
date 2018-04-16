import React from 'react';
import Toast from 'react-native-simple-toast';
import { DeviceEventEmitter } from 'react-native';
import PropTypes from 'prop-types';
import { CreateSupplyEvaluatService, GetEvaluatFiledService } from '../../api';

class Base extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      frontImgUrl: '',
      backGround1: require('../../assets/img/no.png'),
      array: [{
        isClick: -1,
        title: '好',
        id: '1',
        icn: 'icon-xiaolianwawa',
      }, {
        isClick: -1,
        title: '中',
        id: '2',
        icn: 'icon-xiaolian1',
      }, {
        isClick: -1,
        title: '差',
        id: '3',
        icn: 'icon-shengqi',
      }],
      clickIndex: 0,
      starCount: 0,
      index: '',
      content: '',
      typeInfo: [],
    };
  }
  onStarRatingPress = (rating) => {
    this.setState({
      starCount: rating,
    }, this.GetEvaluatFiledService);
  }
  getInit = () => {
    const { orderInfo } = this.props.navigation.state.params;
    this.setState({
      orderInfo,
    });
  }
  getImages = (upImages) => {
    this.setState({
      frontImgUrl: upImages,
    });
  }
  chooseOne = (evaluatFiledId) => {
    const { typeInfo } = this.state;
    for (let i = 0; i < typeInfo.length; i += 1) {
      if (typeInfo[i].evaluatFiledId === evaluatFiledId) {
        if (typeInfo[i].cur) {
          typeInfo[i].cur = false;
          this.setState({
            typeInfo,
          });
        } else {
          typeInfo[i].cur = true;
          this.setState({
            typeInfo,
          });
        }
      }
    }
  }
  GetEvaluatFiledService = () => {
    const { starCount } = this.state;
    this.sleek.toggle();
    GetEvaluatFiledService({
      starLevel: starCount,
    }).then((res) => {
      console.log(res);
      this.sleek.toggle();
      if (res.isSuccess) {
        const result = res.data;
        this.setState({
          typeInfo: result,
        });
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      this.sleek.toggle();
      console.log(err);
    });
  }
  saveThinkText = (content) => {
    this.setState({
      content,
    });
  }
  chooseGoodsThink = (index) => {
    const { array } = this.state;
    for (let i = 0; i < array.length; i += 1) {
      if (i === index) {
        array[i].isClick *= -1;
        if (array[i].isClick === 1) {
          for (let j = 0; j < array.length; j += 1) {
            array[j].isClick = -1;
          }
          array[i].isClick = 1;
        }
        this.setState({
          array,
          index,
        });
      }
    }
  }
  CreateSupplyEvaluatService = () => {
    const { content, starCount, frontImgUrl, array, index, orderInfo, typeInfo } = this.state;
    const { type } = this.props.navigation.state.params;
    const imgList = [];
    const evaluatFiledIds = [];
    for (let i = 0; i < typeInfo.length; i += 1) {
      if (typeInfo[i].cur) {
        evaluatFiledIds.push(typeInfo[i].evaluatFiledId);
      }
    }
    if (!starCount) {
      Toast.show('请选择卖家评价星级！');
      return;
    }
    if (array[index].isClick !== 1) {
      Toast.show('请对商品评价！');
      return;
    }
    if (frontImgUrl.length > 0) {
      for (let i = 0; i < frontImgUrl.length; i += 1) {
        imgList.push(frontImgUrl[i].key);
      }
    }
    CreateSupplyEvaluatService({
      orderId: orderInfo.orderId,
      memberId: orderInfo.memberId,
      starLevel: starCount,
      type: array[index].id,
      content,
      imgUrls: imgList.toString(),
      evaluatFiledIds: evaluatFiledIds.toString(),
    }).then((res) => {
      if (res.isSuccess) {
        let emit;
        switch (type) {
          case 'getMainListBuyGoods':
            emit = 'getMainListBuyGoods';
            break;
          default:
        }
        Toast.show('评价成功！');
        DeviceEventEmitter.emit(emit);
        this.props.pop();
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
  pop: PropTypes.func,
};
export default Base;
