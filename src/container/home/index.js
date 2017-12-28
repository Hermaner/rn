import React from 'react';
import { TouchableOpacity, Image, View, ListView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute } from '../../actions';
import { Header, ScrollableTab, GoodList, TOpacity, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

class HomeScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  renderHeaderNavigation() {
    const { push } = this.props;
    return (
      <View style={[styles.flexRow, styles.headerNavigation]}>
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.gong, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>供应大厅</Text>
            </View>
          }
          onPress={() => push({ key: 'WhyChoose', params: { type: '2' } })}
        />
        <TOpacity
          style={styles.flexOne}
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.hang, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>行情大厅</Text>
            </View>
          }
          onPress={() => push({ key: 'MainSearch', params: { type: '3' } })}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.hui, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>惠农咨询</Text>
            </View>}
          onPress={() => { push({ key: 'User' }); }}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <Icon style={[styles.textCenter, styles.my, styles.publicIcn]} name="analytics" />
              <Text style={[styles.headerNavigationText, styles.textCenter]}>我的采购</Text>
            </View>}
          onPress={() => { push({ key: 'CbjConfirm' }); }}
        />
      </View>
    );
  }
  renderGoodsType() {
    const { goodsTypeList } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.goodsType}>
        <Text style={styles.goodsTypeTitle}>货品分类</Text>
        <View style={styles.flexRow}>
          {
            goodsTypeList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.goodsTypeOne}>
                    <Icon style={[styles.goodsTypeIcn, { color: item.color }]} name={item.icn} />
                    <Text style={[styles.goodsTypeText, styles.textCenter]}>{item.title}</Text>
                  </View>}
                onPress={() => { push({ key: item.page }); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderSampleCenter() {
    return (
      <View style={styles.SampleCenter}>
        <View style={styles.flexRow}>
          <View style={styles.flexTwo}>
            <Text style={styles.headerNavigationText}>一件代发</Text>
            <Text style={styles.normalNineText}>微商首选 平台保障</Text>
            <View style={styles.flexRow}>
              <Icon style={[styles.SampleCenterIcn, styles.flexOne]} name="analytics" />
              <Icon style={[styles.SampleCenterIcn, styles.flexOne]} name="analytics" />
            </View>
          </View>
          <View style={[styles.flexOne, styles.SampleCenterBorder]}>
            <Text style={styles.SampleCenterTitle}>样品中心</Text>
            <Text style={styles.SampleCenterLabel}>进货先拿样</Text>
            <Icon style={styles.SampleCenterIcn} name="analytics" />
          </View>
          <View style={[styles.flexOne, styles.SampleCenterBorder]}>
            <Text style={styles.SampleCenterTitle}>认证货源</Text>
            <Text style={styles.SampleCenterLabel}>服务有保障</Text>
            <Icon style={styles.SampleCenterIcn} name="analytics" />
          </View>
        </View>
      </View>
    );
  }
  renderSeasonalGoods() {
    const { seasonalGoodsList } = this.state;
    return (
      <View style={styles.seasonalGoods}>
        <Text style={styles.goodsTypeTitle}>应季好货</Text>
        <View style={styles.seasonalGoodsBox}>
          {
            seasonalGoodsList.map((item, index) => (
              <View style={[styles.goodsTypeOne, styles.seasonalGoodsItem]} key={index}>
                <Text style={styles.headerNavigationText}>{item.title}</Text>
                <Text style={styles.seasonalGoodsLabel}>{item.label}</Text>
                <View style={styles.imageBox}>
                  <Image style={styles.image} source={{ uri: item.img }} />
                </View>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { imgList } = this.state;
    return (
      <View style={{ height: 120, marginTop: 10 }}>
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
      </View>
    );
  }
  renderForYou() {
    const Tab1 = () => this._renderGoods();
    const Tab2 = () => this._renderGoods();
    return (
      <View style={styles.forYou}>
        <Text style={styles.forYouTitle}>为你推荐</Text>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="推荐货品" />
          <Tab2 tabLabel="优质商家" />
        </ScrollableTabView>
      </View>
    );
  }
  _renderGoods() {
    const { dataSource } = this.state;
    return (
      <View>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          onEndReached={this._reachEnd}
          enableEmptySections
          onEndReachedThreshold={10}
          contentContainerStyle={styles.listViewStyle}
        />
      </View>
    );
  }
  _renderRow = (rowData, sectionID, rowID) => (
    <View>
      <GoodList
        data={rowData}
        rowID={rowID}
        key={rowID}
        onPress={() => { this.props.push({ key: 'GoodDetail' }); }}
      />
    </View>
  )
  render() {
    return (
      <Container>
        <Header back={this.props.push} />
        <Content>
          {this.renderHeaderNavigation()}
          {this.renderGoodsType()}
          {this.renderSampleCenter()}
          {this.renderSeasonalGoods()}
          {this.renderSwiper()}
          {this.renderForYou()}
        </Content>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(HomeScreen);
