import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Location } from 'react-native-baidumap-sdk';
import { observer } from 'mobx-react/native';
import { CachedImage } from 'react-native-img-cache';
import { pushRoute } from '../../actions';
import { TOpacity, TFeedback, LoadMore, LoadNoMore, UserSocket, HomeSearch } from '../../components';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';
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
    this.deleteInit();
    // Location.stop();
    // console.log()
    // this.listener.remove();
  }
  renderHeader() {
    const { backGround1 } = this.state;
    return (
      <View>
        <View style={styles.headerImgBox}>
          <CachedImage resizeMode="stretch" style={styles.headerImg} source={backGround1} />
        </View>
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
                  <CachedImage style={styles.navImg} source={item.image} />
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
        <View style={styles.flexRow}>
          {
            categorys.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.goodsTypeOne}>
                    <View
                      style={styles.icnBoxTwo}
                    >
                      <CachedImage style={styles.icnBoxImg} source={{ uri: item.imgUrl || 'https://avatars0.githubusercontent.com/u/12965639?s=40&v=4' }} />
                    </View>
                    <Text numberOfLines={1} style={[styles.goodsTypeText, styles.textCenter]}>
                      {item.name}</Text>
                  </View>}
                onPress={() => { push({ key: index === categorys.length - 1 ? 'MainList' : 'HomeMainList', params: { categoryId: item.categoryId, name: index === categorys.length - 1 ? '' : item.name } }); }} // MainSearch MainSearcher MainList
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
        {
          SampleCenterList.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.SampleCenterList}>
                  <CachedImage style={styles.sampleImg} source={item.image} />
                  <Text style={styles.SampleCenterText}>{item.text}</Text>
                </View>}
              onPress={() => { push({ key: item.push }); }}
            />
          ))
        }
      </View>
    );
  }
  renderSeasonalGoods() {
    const { seasonals, seasonalsMain } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.seasonalGoodsBox}>
        <View style={[styles.sgView, styles.sgViewRight]}>
          <CachedImage style={styles.sgBigImg} source={require('../../assets/img/x8.png')} />
          <View style={styles.sgViewText}>
            <Text style={styles.sgViewText1}>好货直达</Text>
            <Text style={styles.sgViewText2}>百里挑一，总有一样您喜欢</Text>
          </View>
        </View>
        <View style={styles.sgView}>
          {
            seasonalsMain.map((item, index) => (
              <TOpacity
                key={index}
                style={styles.sgItemsBtn}
                content={
                  <View
                    style={styles.sgItems}
                  >
                    <View style={styles.sgItemText}>
                      <Text style={styles.sgItemText1}>{item.name}</Text>
                      <Text style={styles.sgItemText2}>{item.detail || '好货直达'}</Text>
                    </View>
                    <View style={styles.sgImgView}>
                      <CachedImage style={styles.sgImg} source={{ uri: `${item.logoImgUrl}?imageView2/1/w/50` }} />
                    </View>
                  </View>}
                onPress={() => { push({ key: 'HuinongGoodsMotif', params: { seasonCategoryId: item.seasonCategoryId, img: item.backgroundImgUrls } }); }}
              />
            ))
          }
        </View>
        {
          seasonals.map((item, index) => (
            <TOpacity
              key={index}
              style={[styles.sgItemsBtn, index % 2 === 0 && styles.sgViewRight]}
              content={
                <View
                  style={styles.sgItems}
                >
                  <View style={styles.sgItemText}>
                    <Text style={styles.sgItemText1}>{item.name}</Text>
                    <Text style={styles.sgItemText2}>{item.detail || '好货直达'}</Text>
                  </View>
                  <View style={styles.sgImgView}>
                    <CachedImage style={styles.sgImg} source={{ uri: `${item.logoImgUrl}?imageView2/1/w/50` }} />
                  </View>
                </View>}
              onPress={() => { push({ key: 'HuinongGoodsMotif', params: { seasonCategoryId: item.seasonCategoryId, img: item.backgroundImgUrls } }); }}
            />
          ))
        }
      </View>
    );
  }
  renderSwiper() {
    const { imgList } = this.state;
    return (
      <View style={styles.swiperWrapper}>
        <Swiper
          height={(deviceW - 20) * 0.3}
          key={imgList.length}
          loop
          autoplayTimeout={4}
          autoplay
          paginationStyle={{ justifyContent: 'center', bottom: 10 }}
        >
          {
            imgList.map((item, i) => (
              <TFeedback
                key={i}
                content={
                  <View style={styles.slide}>
                    <CachedImage style={styles.swiperImage} source={{ uri: item.imgUrl }} />
                  </View>}
                onPress={() => { this.imgPush(i); }}
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
        <View style={styles.forTitleView}>
          <CachedImage style={styles.forTitleImg} source={require('../../assets/img/x8.png')} /><Text style={styles.forTitle}>推荐货品</Text>
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
      backgroundTopImg,
    } = this.state;
    const { localData: { districtName } } = UserSocket;
    return (
      <Container>
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
          <HomeSearch
            label={districtName}
            image={backgroundTopImg}
            push={() => { this.props.push({ key: 'MainSearcher', params: { type: 'home' } }); }}
          />
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
