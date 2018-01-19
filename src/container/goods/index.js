import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, TOpacity, Iconfont } from '../../components';
import { DeepClone } from '../../api';
import base from './base';
import styles from './styles';
import Child from './child';

const ScreenWidth = Dimensions.get('window').width;

class Goods extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
    };
  }
  componentDidMount() {
    this.getInit();
  }
  renderHeaderNavigation() {
    const { push } = this.props;
    return (
      <View style={[styles.flexRow, styles.headerNavigation]}>
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.fristBox, { backgroundColor: '#82B4FD' }]}>
                  <View style={{ width: 60, flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconfont style={styles.my} name="icon-caigou-xianxing" />
                  </View>
                </View>
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>采购大厅</Text>
            </View>}
          onPress={() => { push({ key: 'ReleaseMainList' }); }}
        />
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.flexOne}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.fristBox, { backgroundColor: '#FAC342' }]}>
                  <View style={{ width: 60, flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconfont style={styles.hang} name="icon-1" />
                  </View>
                </View>
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>行情大厅</Text>
            </View>
          }
          onPress={() => push({ key: 'MainSearch', params: { type: '3' } })}
        />
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={[styles.flexOne, { justifyContent: 'center' }]}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.fristBox, { backgroundColor: '#53E0B5' }]}>
                  <View style={{ width: 60, flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconfont style={styles.gong} name="icon-dating" />
                  </View>
                </View>
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>我的供应</Text>
            </View>
          }
          onPress={() => { push({ key: 'MySupply' }); }}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.fristBox, { backgroundColor: '#F99851' }]}>
                  <View style={{ width: 60, flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconfont style={styles.hui} name="icon-zixun" />
                  </View>
                </View>
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>我的订单</Text>
            </View>}
          onPress={() => { push({ key: 'MySoldGoods' }); }}
        />
      </View>
    );
  }
  renderSeller() {
    return (
      <View style={styles.seller}>
        <View style={styles.flexfive}>
          <Text style={styles.bigTitle}>实力商家</Text>
          <Text style={[styles.normalSixText, { textAlign: 'center' }]}>入住立享特权</Text>
          <View style={styles.imgBox}>
            <Image
              style={styles.BigIcnImg}
              source={{ uri: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x' }}
            />
          </View>
        </View>
        <View style={styles.flexfour}>
          <View style={styles.bottomBorder}>
            <Text style={styles.bigThreeText}>优质采购商</Text>
            <Text style={styles.normalSixText}>邀你来报价</Text>
            <View style={styles.imgBox}>
              <Image style={styles.icnImg} source={{ uri: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x' }} />
            </View>
          </View>
          <View style={styles.bottomBorder}>
            <Text style={styles.bigThreeText}>优质采购商</Text>
            <Text style={styles.normalSixText}>邀你来报价</Text>
            <View style={styles.imgBox}>
              <Image style={styles.icnImg} source={{ uri: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x' }} />
            </View>
          </View>
        </View>
        <View style={styles.flexfour}>
          <View style={styles.bottomBorder}>
            <Text style={styles.bigThreeText}>优质采购商</Text>
            <Text style={styles.normalSixText}>邀你来报价</Text>
            <View style={styles.imgBox}>
              <Image style={styles.icnImg} source={{ uri: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x' }} />
            </View>
          </View>
          <View style={styles.bottomBorder}>
            <Text style={styles.bigThreeText}>优质采购商</Text>
            <Text style={styles.normalSixText}>邀你来报价</Text>
            <View style={styles.imgBox}>
              <Image style={styles.icnImg} source={{ uri: 'https://img.dev.sunhousm.cn/201813105030862.jpg?imageMogr2/thumbnail/600x' }} />
            </View>
          </View>
        </View>
      </View>
    );
  }
  renderNews() {
    const { items } = this.state;
    return (
      <View style={styles.news}>
        {
          items.map((item, index) => (
            <View key={index} style={[styles.flexRow, styles.rowBox]}>
              <Image style={styles.goodsImg} source={{ uri: item.imgUrl }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.goodsTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.normalSixText} numberOfLines={1}>{item.label}</Text>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  renderHuiNongStudy() {
    return (
      <View style={styles.studyBox}>
        <View style={[styles.studyRow, { marginBottom: 6 }]}>
          <Text style={styles.leftText}>惠农</Text>
          <Text style={styles.centerText}>图文</Text>
          <Text
            style={[styles.normalThreeText, styles.flexOne]}
            numberOfLines={1}
          >
            大学毕业回家卖脐橙，凭什么他能一天卖10亿</Text>
        </View>
        <View style={styles.studyRow}>
          <Text style={styles.leftText}>学堂</Text>
          <Text style={styles.centerText}>直播</Text>
          <Text
            style={[styles.normalThreeText, styles.flexOne]}
            numberOfLines={1}
          >火龙果种植技术，果园杂草防治技术</Text>
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { imgList } = this.state;
    return (
      <View style={{ height: 120 }}>
        <Swiper
          style={styles.wrapper}
          height={200}
          autoplay
          paginationStyle={{ justifyContent: 'center', bottom: 10 }}
        >
          {
            imgList.map((item, i) => (
              <View key={i} style={styles.slide}>
                <Image style={styles.swiperImage} source={{ uri: item.img }} />
              </View>
            ))
          }
        </Swiper>
        <View style={styles.howMuchPeople}>
          <Text style={styles.people}>53651</Text>
          <Text style={styles.normalSixText}>位买家正在惠农网采购</Text>
        </View>
      </View>
    );
  }
  renderAllGoods() {
    const { goodGoodsList } = this.state;
    return (
      <View style={styles.allGoods}>
        <ScrollableTabView
          style={{ flex: 1 }}
          tabBarInactiveTextColor="#666"
          tabBarActiveTextColor="#8bce21"
          tabBarBackgroundColor="#f5f5f5"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarUnderlineStyle={{ width: ScreenWidth / 4, height: 2, backgroundColor: '#8bce21' }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {
            goodGoodsList.map((item, index) => (
              <Child tabLabel={item.name} key={index} categoryId={item.categoryId} />
            ))
          }
        </ScrollableTabView>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { memberId } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="我要卖"
          showRight
          rightText="更多"
          // rightPress={this.resetState}
        />
        <Content>
          {this.renderHeaderNavigation()}
          {this.renderSeller()}
          {this.renderNews()}
          {this.renderHuiNongStudy()}
          {this.renderSwiper()}
          {this.state.goodGoodsList.length > 0 && this.renderAllGoods()}
        </Content>
        <TOpacity
          style={styles.bomFixedView}
          content={
            <View style={styles.bomFixedBtn}>
              <Text style={styles.bomFixedText}>发供应</Text>
            </View>
          }
          onPress={() => this.props.push({ key: memberId ? 'ReleaseMainList' : 'User', params: { type: '3' } })}
        />
      </Container>
    );
  }
}

Goods.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Goods);
