import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Header, Container, Icon, Tab, Tabs, TabHeading } from 'native-base';
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
      <Container style={styles.Body}>
        <View style={styles.bodyHeader}>
          <Image style={styles.Headerleft} source={require('../app/resource/imgs/avatar.jpg')} />
        </View>
        <View style={styles.productType}>
          <View style={[styles.flexOne, styles.flexAlignItems]}>
            <Icon name="arrow-back" />
            <Text style={[styles.textCenter, styles.textInfo]}>实地品控</Text>
          </View>
          <View style={[styles.flexOne, styles.flexAlignItems]}>
            <Icon name="arrow-back" />
            <Text style={[styles.textCenter, styles.textInfo]}>应季水果</Text>
          </View>
          <View style={[styles.flexOne, styles.flexAlignItems]}>
            <Icon name="arrow-back" />
            <Text style={[styles.textCenter, styles.textInfo]}>地域专区</Text>
          </View>
          <View style={[styles.flexOne, styles.flexAlignItems]}>
            <Icon name="arrow-back" />
            <Text style={[styles.textCenter, styles.textInfo]}>全部</Text>
          </View>
        </View>
        <Tabs>
          <Tab heading={<TabHeading><Icon name="camera" style={{ marginRight: 4 }} /><Text>好货推荐</Text></TabHeading>}>
            <Tabs>
              <Tab heading={<TabHeading><Text>本月主推</Text></TabHeading>}>
                {this._randerGoodsList()}
              </Tab>
              <Tab heading={<TabHeading><Text>橘橙类</Text></TabHeading>}>
                {this._randerGoodsList()}
              </Tab>
              <Tab heading={<TabHeading><Text>苹果</Text></TabHeading>}>
                {this._randerGoodsList()}
              </Tab>
              <Tab heading={<TabHeading><Text>柚子</Text></TabHeading>}>
                {this._randerGoodsList()}
              </Tab>
              <Tab heading={<TabHeading><Text>石榴</Text></TabHeading>}>
                {this._randerGoodsList()}
              </Tab>
            </Tabs>
          </Tab>
          <Tab heading={<TabHeading><Icon name="camera" style={{ marginRight: 4 }} /><Text>最新上架</Text></TabHeading>}>
            {this._randerGoodsList()}
          </Tab>
          <Tab heading={<TabHeading><Icon name="camera" style={{ marginRight: 4 }} /><Text>本季热门</Text></TabHeading>}>
            {this._randerGoodsList()}
          </Tab>
        </Tabs>
      </Container>
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
              <Text style={{ color: '#666', fontSize: 12 }}>广州弄菜大科技数据</Text>
            </View>
            <View style={styles.productSell}>
              <View style={styles.productPrice}>
                <Text style={{ color: '#FA5B20', fontSize: 12 }}>￥</Text>
                <Text style={{ color: '#FA5B20', fontSize: 22 }}>324</Text>
              </View>
              <View style={styles.productEarnMoney}>
                <Text style={{ color: '#666', fontSize: 12 }}>能赚￥</Text>
                <Text style={{ color: '#666', fontSize: 16 }}>17</Text>
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
  _randerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ alignItems: 'center' }, { borderWidth: 1, flexDirection: 'row' }} >
        <TouchableOpacity onPress={pop} style={[styles.Headerleft],{borderWidth:2}}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'MainSearcher' }); }}>
          <View style={[styles.HeaderMain], { borderWidth: 2 }}>
            <Icon name="ios-search-outline" style={styles.HeaderIcon} />
            <Text style={styles.HeaderMainText}>输入货品名称</Text>
          </View>
        </TouchableWithoutFeedback>
      </Header>
    )
  }
  render() {
    const { phone, code, sec } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        {this._randerHeader()}
        {this._randerBody()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
