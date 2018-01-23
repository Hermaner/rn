import React from 'react';
import { Image, View, NativeAppEventEmitter, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AMapLocation from 'react-native-smart-amap-location';
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance';
import { pushRoute } from '../../actions';
import { Header, Iconfont, GoodList, TOpacity, TFeedback, LoadMore, LoadNoMore } from '../../components';
import base from './base';
import styles from './styles';

import Child1 from './child1';
import Child2 from './child2';

class HomeScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.addAppEventListener(
        NativeAppEventEmitter.addListener('amap.location.onLocationResult', this._onLocationResult),
    );
    AMapLocation.init(null);
    AMapLocation.setOptions({
      pausesLocationUpdatesAutomatically: false,
      allowsBackgroundLocationUpdates: true,
    });
    // AMapLocation.startUpdatingLocation();
    AMapLocation.getReGeocode();
    this.getInit();
  }
  _onLocationResult = (result) => {
    if (result.coordinate) {
      global.longitude = result.coordinate.longitude;
      global.latitude = result.coordinate.latitude;
    }
  }
  renderHeaderNavigation() {
    const { push } = this.props;
    return (
      <View style={[styles.flexRow, styles.headerNavigation]}>
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
              <Text style={[styles.headerNavigationText, styles.textCenter]}>供应大厅</Text>
            </View>
          }
          onPress={() => push({ key: 'MainList' })}
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
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={[styles.fristBox, { backgroundColor: '#9ED63C' }]}>
                  <View style={{ width: 60, flexDirection: 'row', justifyContent: 'center' }}>
                    <Iconfont style={styles.hui} name="icon-zixun" />
                  </View>
                </View>
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>惠农咨询</Text>
            </View>}
          onPress={() => { push({ key: 'HuinongConsult' }); }}
        />
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
              <Text style={[styles.headerNavigationText, styles.textCenter]}>发采购</Text>
            </View>}
          onPress={() => this.props.push({ key: global.memberId ? 'MainSearch' : 'User', params: { type: '2' } })}
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
                    {
                      item.isIcn ?
                        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 6, color: item.color }}>{item.text}</Text>
                      :
                        <Iconfont
                          style={[styles.goodsTypeIcn, { color: item.color }]}
                          name={item.icn}
                        />
                    }
                    <Text style={[styles.goodsTypeText, styles.textCenter]}>{item.name}</Text>
                  </View>}
                onPress={() => { push({ key: index === 3 ? 'MainList' : 'HomeMainList', params: { categoryId: item.categoryId, name: item.name } }); }} // MainSearch MainSearcher MainList
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderSampleCenter() {
    const { push } = this.props;
    return (
      <View style={styles.SampleCenter}>
        <View style={styles.flexRow}>
          <TFeedback
            content={
              <View style={styles.flexTwo}>
                <Text style={styles.headerNavigationText}>一件代发</Text>
                <Text style={styles.normalNineText}>微商首选 平台保障</Text>
                <View style={styles.flexRow}>
                  <View style={{ flex: 1, paddingLeft: 5, paddingRight: 10 }}>
                    <Image style={styles.myImage} source={{ uri: 'https://img.dev.sunhousm.cn/Fu70sJb09411LY3gmJ4_TkuQX--G' }} />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 5, paddingRight: 10 }}>
                    <Image style={styles.myImage} source={{ uri: 'https://img.dev.sunhousm.cn/Fu70sJb09411LY3gmJ4_TkuQX--G' }} />
                  </View>
                  {/* <Icon style={[styles.SampleCenterIcn, styles.flexOne]} name="analytics" />
                  <Icon style={[styles.SampleCenterIcn, styles.flexOne]} name="analytics" /> */}
                </View>
              </View>}
            onPress={() => { push({ key: 'ReleaseSuccess' }); }}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, styles.SampleCenterBorder]}>
                <Text style={styles.SampleCenterTitle}>样品中心</Text>
                <Text style={styles.SampleCenterLabel}>进货先拿样</Text>
                {/* <Icon style={styles.SampleCenterIcn} name="analytics" /> */}
                <View style={{ flex: 1, paddingLeft: 5, paddingRight: 10 }}>
                  <Image style={styles.myImage} source={{ uri: 'https://img.dev.sunhousm.cn/Fu70sJb09411LY3gmJ4_TkuQX--G' }} />
                </View>
              </View>}
            onPress={() => { push({ key: 'ReviseSuccess' }); }}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, styles.SampleCenterBorder]}>
                <Text style={styles.SampleCenterTitle}>认证货源</Text>
                <Text style={styles.SampleCenterLabel}>服务有保障</Text>
                <View style={{ flex: 1, paddingLeft: 5, paddingRight: 10 }}>
                  <Image style={styles.myImage} source={{ uri: 'https://img.dev.sunhousm.cn/Fu70sJb09411LY3gmJ4_TkuQX--G' }} />
                </View>
              </View>}
            onPress={() => { push({ key: 'PriceInfo' }); }}
          />
        </View>
      </View>
    );
  }
  renderSeasonalGoods() {
    const { goodGoodsList } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.seasonalGoods}>
        <Text style={styles.goodsTypeTitle}>应季好货</Text>
        <View style={styles.seasonalGoodsBox}>
          {
            goodGoodsList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.goodsTypeOne, styles.seasonalGoodsItem]}>
                    <Text style={styles.headerNavigationText}>{item.name}</Text>
                    <View style={styles.imageBox}>
                      <Image style={styles.image} source={{ uri: item.imgUrl }} />
                    </View>
                  </View>}
                onPress={() => { push({ key: 'HuinongGoodsMotif', params: { categoryId: item.categoryId, brands: item.brands, name: item.name } }); }}
              />
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
      </View>
    );
  }
  renderForYou() {
    const { isTabOne, supplys, business } = this.state;
    return (
      <View style={styles.forYou}>
        <Text style={styles.forYouTitle}>为你推荐</Text>
        <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne === 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
                <Text style={[styles.tabText, isTabOne === 1 ? styles.tabTextChoose : '']}>推荐货品</Text>
              </View>}
            onPress={() => this.tabChange(1)}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne !== 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
                <Text style={[styles.tabText, isTabOne !== 1 ? styles.tabTextChoose : '']}>优质商家</Text>
              </View>}
            onPress={() => this.tabChange(2)}
          />
        </View>
        <View>
          {
            isTabOne === 1 ?
              <Child1 type="1" data={supplys} />
            :
              <Child2 type="2" data={business} />
          }
        </View>
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
    const {
      goodGoodsList,
      goodsTypeList,
      memberId,
      refresh,
      isTabOne,
      loading,
      nomore,
    } = this.state;
    return (
      <Container>
        <Header back={this.props.push} />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={isTabOne === 1 ? this._onRefreshSupply : this._onRefreshBusines}
              tintColor="#ff0000"
              title="加载中..."
              titleColor="#00ff00"
              colors={['#ff0000', '#00ff00', '#0000ff']}
              progressBackgroundColor="#ffffff"
            />
          }
          onScroll={this._onScroll}
          scrollEventThrottle={50}
        >
          {this.renderHeaderNavigation()}
          {
            goodsTypeList &&
            this.renderGoodsType()
          }
          {this.renderSampleCenter()}
          {
            goodGoodsList &&
            this.renderSeasonalGoods()
          }
          {/* {this.renderSwiper()} */}
          {this.renderForYou()}
          {loading && <LoadMore />}
          {nomore && <LoadNoMore />}
        </ScrollView>
      </Container>
    );
  }
}

HomeScreen.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(AppEventListenerEnhance(HomeScreen));
