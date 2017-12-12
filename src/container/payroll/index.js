import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Content, Header } from 'native-base';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import { popRoute, pushRoute } from '../../actions';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _randerBody() {
    const { pop } = this.props;
    return (
      <View style={styles.Body}>
        <View style={styles.bodyHeader}>
          <Image style={styles.Headerleft} source={require('../app/resource/imgs/avatar.jpg')} />
        </View>
        <View style={styles.productType}>
          <View style={styles.flexOne}>
            <Text style={styles.textCenter}>ss</Text>
            <Text style={[styles.textCenter, styles.textInfo]}>实地品控</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.textCenter}>ss</Text>
            <Text style={[styles.textCenter, styles.textInfo]}>应季水果</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.textCenter}>ss</Text>
            <Text style={[styles.textCenter, styles.textInfo]}>地域专区</Text>
          </View>
          <View style={styles.flexOne}>
            <Text style={styles.textCenter}>ss</Text>
            <Text style={[styles.textCenter, styles.textInfo]}>全部</Text>
          </View>
        </View>
        <View style={styles.productTypeChoose}>
          <View style={[styles.productTypeChooseTitle, styles.isChoose]}>
            <Text style={styles.productTypeChooseLogo}>ss</Text>
            <Text style={[styles.productTypeChooseName, styles.isText]}>好货推荐</Text>
          </View>
          <View style={styles.productTypeChooseTitle}>
            <Text style={styles.productTypeChooseLogo}>ss</Text>
            <Text style={styles.productTypeChooseName}>最新上架</Text>
          </View>
          <View style={styles.productTypeChooseTitle}>
            <Text style={styles.productTypeChooseLogo}>ss</Text>
            <Text style={styles.productTypeChooseName}>本季热门</Text>
          </View>
        </View>
        <View style={styles.goodsType}>
          <Text style={styles.goodsTypeName}>本月主推</Text>
          <Text style={styles.goodsTypeName}>橘橙类</Text>
          <Text style={styles.goodsTypeName}>苹果</Text>
          <Text style={styles.goodsTypeName}>柚子</Text>
          <Text style={styles.goodsTypeName}>石榴</Text>
        </View>
      </View>
    )
  }
  _randerGoodsList() {
    const { pop } = this.props;
    return (
      <View style={styles.goodsList}>
        <View style={styles.goodsItem}>
          <Image style={styles.goodsImg} source={require('../app/resource/imgs/avatar.jpg')} />
          <View style={styles.goodsInfo}>
            <Text style={styles.goodsName} numberOfLines={1}>新疆 红旗坡阿克苏苹果 10斤装果径80-90</Text>
            <Text style={styles.buyCounts}>已发20件</Text>
            <View style={styles.company}>
              <Text style={{ marginRight: 6, color: '#666' }}>dd</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>广州弄菜大科技数据</Text>
            </View>
            <View style={styles.productSell}>
              <View style={styles.productPrice}>
                <Text style={{ color: '#FA5B20', fontSize: 14 }}>￥</Text>
                <Text style={{ color: '#FA5B20', fontSize: 24 }}>324</Text>
              </View>
              <View style={styles.productEarnMoney}>
                <Text style={{ color: '#666', fontSize: 14 }}>能赚￥</Text>
                <Text style={{ color: '#666', fontSize: 20 }}>17</Text>
              </View>
              <View style={styles.ButtonStyle}>
                <Text style={styles.Button}>抢批</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.goodsItem}>
          <Image style={styles.goodsImg} source={require('../app/resource/imgs/avatar.jpg')} />
          <View style={styles.goodsInfo}>
            <Text style={styles.goodsName} numberOfLines={1}>新疆 红旗坡阿克苏苹果 10斤装果径80-90</Text>
            <Text style={styles.buyCounts}>已发20件</Text>
            <View style={styles.company}>
              <Text style={{ marginRight: 6, color: '#666' }}>dd</Text>
              <Text style={{ color: '#666', fontSize: 14 }}>广州弄菜大科技数据</Text>
            </View>
            <View style={styles.productSell}>
              <View style={styles.productPrice}>
                <Text style={{ color: '#FA5B20', fontSize: 14 }}>￥</Text>
                <Text style={{ color: '#FA5B20', fontSize: 24 }}>324</Text>
              </View>
              <View style={styles.productEarnMoney}>
                <Text style={{ color: '#666', fontSize: 14 }}>能赚￥</Text>
                <Text style={{ color: '#666', fontSize: 20 }}>17</Text>
              </View>
              <View style={styles.ButtonStyle}>
                <Text style={styles.Button}>抢批</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        {/* {this._randerHeader()} */}
        {this._randerBody()}
        {this._randerGoodsList()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
