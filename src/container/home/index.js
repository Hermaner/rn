import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from 'react-native-baidumap-sdk';
import { observer } from 'mobx-react/native';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { TOpacity, TFeedback, LoadMore, LoadNoMore, UserSocket, HomeSearch, Iconfont } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';
import Child1 from './child1';

@observer
class HomeScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  async componentDidMount() {
    this.getInit();
    await Location.init();
    await Location.setOptions({ gps: true });
    this.listener = Location.addLocationListener(location => this.GetLocation(location));
    Location.start();
  }
  componentWillUnmount() {
    // Location.stop();
    // console.log()
    // this.listener.remove();
  }
  renderHeader() {
    const { backGround1, backgroundImg } = this.state;
    return (
      <View>
        {
          backgroundImg !== '' ?
            <View style={styles.headerImgBox}>
              <CachedImage resizeMode="contain" style={styles.headerImg} source={{ uri: backgroundImg }} />
            </View>
          :
            <View style={styles.headerImgBox}>
              <CachedImage resizeMode="stretch" style={styles.headerImg} source={backGround1} />
            </View>
        }
      </View>
    );
  }
  renderHeaderNavigation() {
    const { mainIcons } = this.state;
    return (
      <View style={[styles.flexRow, styles.headerNavigation]}>
        {
          mainIcons.map((item, index) => (
            <TOpacity
              style={styles.flexOne}
              key={index}
              content={
                <View style={[styles.flexOne, styles.jacenter]}>
                  <View style={[styles.mainIcon, { backgroundColor: item.color }]}>
                    <Iconfont style={styles.mainIconFont} name={item.icon} />
                  </View>
                  <Text style={[styles.headerNavigationText, styles.textCenter]}>{item.label}</Text>
                </View>
              }
              onPress={() => { this.goPage(index); }}
            />
          ))
        }
      </View>
    );
  }
  renderGoodsType() {
    const { categorys } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.goodsType}>
        <Text style={styles.goodsTypeTitle}>- 货品分类 -</Text>
        <View style={styles.flexRow}>
          {
            categorys.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.goodsTypeOne}>
                    <View
                      style={[styles.icnBoxTwo, { backgroundColor: item.color }]}
                    >
                      <Text numberOfLines={1} style={{ flex: 1, fontSize: 16, textAlign: 'center', color: '#fff' }}>{item.text}</Text>
                    </View>
                    <Text numberOfLines={1} style={[styles.goodsTypeText, styles.textCenter]}>{item.name}</Text>
                  </View>}
                onPress={() => { push({ key: index === 0 ? 'MainList' : 'HomeMainList', params: { categoryId: item.categoryId, name: index === 0 ? '' : item.name } }); }} // MainSearch MainSearcher MainList
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
                  <View style={[styles.flexOne, styles.jacenter]}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 25, backgroundColor: Mcolor, marginBottom: 5 }}>
                      <Icon style={{ color: '#fff', fontSize: 30 }} name={item.icn} />
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
    const { seasonals } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.seasonalGoods}>
        <Text style={styles.goodsTypeTitle}>- 好货直达 -</Text>
        <View style={styles.seasonalGoodsBox}>
          {
            seasonals.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View
                    style={[
                      seasonals.length > 3 ? styles.goodsTypeOneWidth : styles.goodsTypeOneWidthFlexOne, styles.goodsTypeOne2, styles.seasonalGoodsItem
                    ]}
                  >
                    <View style={styles.imageBox}>
                      <CachedImage style={styles.image} source={{ uri: `${item.logoImgUrl}?imageView2/1/w/50` }} />
                    </View>
                    <Text numberOfLines={1} style={[styles.headerNavigationText, { textAlign: 'center' }]}>{item.name}</Text>
                  </View>}
                onPress={() => { push({ key: 'HuinongGoodsMotif', params: { seasonCategoryId: item.seasonCategoryId, img: item.backgroundImgUrls } }); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { push } = this.props;
    const { imgList, swiperImgInfo } = this.state;
    return (
      <View style={{ height: 150, marginTop: 10 }}>
        <Swiper
          style={styles.wrapper}
          height={150}
          loop
          autoplay
          autoplayTimeout={2}
          paginationStyle={{ justifyContent: 'center', bottom: 10 }}
        >
          {
            imgList !== [] &&
            imgList.map((item, i) => (
              <TFeedback
                key={i}
                content={
                  <View style={styles.slide}>
                    <CachedImage resizeMode="stretch" style={styles.swiperImage} source={{ uri: item.img }} />
                  </View>}
                onPress={() => { push({ key: 'ImgInfo', params: { imgDetail: swiperImgInfo[item.imgKey].imgUrls } }); }}
              />
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
  render() {
    const {
      refresh,
      loading,
      nomore,
      seasonals,
    } = this.state;
    const { localData: { districtName } } = UserSocket;
    return (
      <Container>
        <HomeSearch
          label={districtName}
          push={() => { this.props.push({ key: 'MainSearcher', params: { type: 'home' } }); }}
        />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefreshSupply}
              tintColor="#666"
              title="加载中..."
              titleColor="#333"
              colors={['#666', '#666', '#666']}
              progressBackgroundColor="#ffffff"
            />
          }
          onScroll={this._onScroll}
          scrollEventThrottle={50}
        >
          {/* {this.renderHeader()} */}
          {this.renderHeaderNavigation()}
          {this.renderGoodsType()}
          {this.renderSampleCenter()}
          {
            seasonals.length > 0 &&
            this.renderSeasonalGoods()
          }
          {this.renderSwiper()}
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
export default connect(null, { push: pushRoute })(HomeScreen);
