import React from 'react';
import { Image, View, NativeAppEventEmitter, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AMapLocation from 'react-native-smart-amap-location';
import AppEventListenerEnhance from 'react-native-smart-app-event-listener-enhance';
import { pushRoute } from '../../actions';
import { Iconfont, GoodList, TOpacity, TFeedback, LoadMore, LoadNoMore } from '../../components';
import base from './base';
import styles from './styles';

import Child1 from './child1';

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
  renderHeader() {
    const { backGround1 } = this.state;
    return (
      <View>
        <View style={styles.headerImgBox}>
          <Image style={styles.headerImg} source={backGround1} />
        </View>
        <View style={{ height: 180, paddingLeft: 10, paddingRight: 10 }}>
          <Text style={styles.headerText}>找专业的人  做专业的事</Text>
          <View style={[styles.flexRow, styles.boxStyle]}>
            <Iconfont style={styles.headerIcn} name="icon-caigou-xianxing" />
            <Input
              style={styles.inputText}
              value={this.state.businessName}
              placeholderTextColor={{ color: '#666', fontSize: 14 }}
              // onChangeText={text => this.saveBusinessName(text)}
              placeholder="请输入关键字"
            />
          </View>
        </View>
      </View>
    );
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
                <Iconfont style={styles.gong} name="icon-dating" />
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
                <Iconfont style={styles.hang} name="icon-1" />
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
                <Iconfont style={styles.hui} name="icon-zixun" />
              </View>
              <Text style={[styles.headerNavigationText, styles.textCenter]}>惠农咨询</Text>
            </View>}
          onPress={() => { push({ key: 'HuinongConsult' }); }}
        />
        <TFeedback
          content={
            <View style={styles.flexOne}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Iconfont style={styles.my} name="icon-caigou-xianxing" />
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
        <Text style={styles.goodsTypeTitle}>- 货品分类 -</Text>
        <View style={styles.flexRow}>
          {
            goodsTypeList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.goodsTypeOne}>
                    <View style={styles.icnBoxOne}>
                      <View
                        style={[styles.icnBoxTwo, { backgroundColor: item.color1, paddingTop: 6 }]}
                      >
                        {
                          item.isIcn ?
                            <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 6, color: item.color }}>{item.text}</Text>
                          :
                            <Iconfont
                              style={[styles.goodsTypeIcn, { color: item.color }]}
                              name={item.icn}
                            />
                        }
                      </View>
                    </View>
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
    const { SampleCenterList } = this.state;
    return (
      <View style={styles.SampleCenter}>
        <View style={[styles.flexRow, { paddingTop: 10, paddingBottom: 10 }]}>
          {
            SampleCenterList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.flexOne}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <Iconfont style={styles.my} name={item.icn} />
                    </View>
                    <Text style={[styles.SampleCenterText, styles.textCenter]}>{item.text}</Text>
                  </View>}
                onPress={() => { push({ key: item.push }); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderSeasonalGoods() {
    const { goodGoodsList } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.seasonalGoods}>
        <Text style={styles.goodsTypeTitle}>- 应季好货 -</Text>
        <View style={styles.seasonalGoodsBox}>
          {
            goodGoodsList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.goodsTypeOne, styles.seasonalGoodsItem]}>
                    <View style={styles.imageBox}>
                      <Image style={styles.image} source={{ uri: item.imgUrl }} />
                    </View>
                    <Text style={[styles.headerNavigationText, { textAlign: 'center' }]}>{item.name}</Text>
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
    const { supplys } = this.state;
    return (
      <View style={styles.forYou}>
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#eee' }}>
          <Text style={styles.forYouTitle}>- 推荐货品 -</Text>
        </View>
        <View>
          <Child1 type="1" data={supplys} />
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
      refresh,
      loading,
      nomore,
    } = this.state;
    return (
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefreshSupply}
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
          {this.renderHeader()}
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
