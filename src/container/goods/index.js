import React from 'react';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, ScrollableTab } from '../../components';
import { DeepClone } from '../../api';
import base from './base';
import styles from './styles';

class Goods extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
    };
  }
  componentDidMount() {
  }
  renderHeaderNavigation() {
    const { push } = this.props;
    return (
      <View style={[styles.flexRow, styles.headerNavigation]}>
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.gong, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>采购大厅</Text>
            </View>
          }
          onPress={() => push({ key: 'MainList' })}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.hang, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>实地认证</Text>
            </View>
          }
          onPress={() => push({ key: 'MainSearch', params: { type: '3' } })}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.hui, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>我的供应</Text>
            </View>}
          onPress={() => { push({ key: 'HuinongConsult' }); }}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.my, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>惠农学堂</Text>
            </View>}
          onPress={() => { push({ key: 'CbjConfirm' }); }}
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
    const Tab1 = () => this._renderGoodsInfo();
    const Tab2 = () => this._renderGoodsInfo();
    const Tab3 = () => this._renderGoodsInfo();
    const Tab4 = () => this._renderGoodsInfo();
    const Tab5 = () => this._renderGoodsInfo();
    const Tab6 = () => this._renderGoodsInfo();
    const Tab7 = () => this._renderGoodsInfo();
    const Tab8 = () => this._renderGoodsInfo();
    const Tab9 = () => this._renderGoodsInfo();
    return (
      <View style={styles.allGoods}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="全部采购" />
          <Tab2 tabLabel="柑橘" />
          <Tab3 tabLabel="鸡" />
          <Tab4 tabLabel="土豆" />
          <Tab5 tabLabel="核桃" />
          <Tab6 tabLabel="国槐" />
          <Tab7 tabLabel="导弹" />
          <Tab8 tabLabel="飞毛腿" />
          <Tab9 tabLabel="改品类" />
        </ScrollableTabView>
      </View>
    );
  }
  _renderGoodsInfo() {
    const { push } = this.props;
    return (
      <View style={styles.buyGoodsItems}>
        <View style={styles.buyGoodsItem}>
          <Text style={styles.buyGoodsName}>八月瓜</Text>
          <View style={styles.flexRow}>
            <Text style={styles.buyGoodsVariety}>品种: 八月瓜</Text>
            <Text style={styles.flexRight}>100斤</Text>
          </View>
          <Text style={styles.buyGoodsPlace}>
            所在地: 河北省邢台市
          </Text>
          <View style={styles.flexRow}>
            <View style={{ flex: 1, marginTop: 6 }}>
              <View style={styles.userDoBigBox}>
                <View style={styles.userDoBox}>
                  <Text style={styles.userDo}>养殖户/养殖企业</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              <View style={[styles.flexRow, { marginTop: 6 }]}>
                <Text style={styles.everyWeek}>每周</Text>
                <View style={styles.flexRow}>
                  <Text style={styles.howLong}>距截止</Text>
                  <Text style={styles.howLongDay}>6</Text>
                  <Text style={styles.howLong}>天</Text>
                </View>
              </View>
            </View>
            <TFeedback
              content={
                <View style={styles.goBuyBtnBox}>
                  <Text style={styles.goBuyBtn}>去报价</Text>
                </View>}
              onPress={() => { push({ key: 'PurchaseDetail' }); }}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="供应详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this.renderHeaderNavigation()}
          {this.renderSeller()}
          {this.renderNews()}
          {this.renderHuiNongStudy()}
          {this.renderSwiper()}
          {this.renderAllGoods()}
        </Content>
      </Container>
    );
  }
}

Goods.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Goods);
