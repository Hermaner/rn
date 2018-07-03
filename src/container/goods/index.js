import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import Swiper from 'react-native-swiper';
import { Container, Text } from 'native-base';
import { observer } from 'mobx-react/native';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { TFeedback, TOpacity, HomeSearch, LoadMore, UserSocket, LoadNoMore, Iconfont } from '../../components';
import { DeepClone } from '../../api';
import base from './base';
import styles from './styles';
import { deviceW } from '../../utils';
import Child from './child';

@observer
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
  componentWillUnmount() {
    this.getDelete();
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
  renderSecend() {
    const { secendList } = this.state;
    return (
      <View style={[styles.goodsType, styles.marginView]}>
        <View style={styles.titleView}>
          <Iconfont style={styles.titleViewIcon} name="icon-youzhi" />
          <Text style={styles.titleText}>优质推选</Text>
        </View>
        <View style={[styles.flexRow, styles.headerNavigationTwo]}>
          {
            secendList.map((item, index) => (
              <TOpacity
                style={styles.flexOne}
                key={index}
                content={
                  <View style={[styles.flexOne, { justifyContent: 'center', alignItems: 'center' }]}>
                    <CachedImage style={styles.navsImg} source={item.image} />
                    <Text style={[styles.headerNavigationText, styles.textCenter]}>
                      {item.label}
                    </Text>
                  </View>
                }
                onPress={() => { this.goBusinessPage(index); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  renderNews() {
    const { threeNewsList } = this.state;
    const { push } = this.props;
    return (
      <View style={[styles.studyRow, styles.marginView]}>
        <View style={styles.titleView}>
          <Iconfont style={styles.titleViewIcon} name="icon-zixun" />
          <Text style={styles.titleText}>每日新闻</Text>
        </View>
        {
          threeNewsList.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.newsView}>
                  <CachedImage
                    style={styles.newsImg}
                    source={{ uri: `${item.newsImages[0].imgUrl}?imageView2/1/w/60` }}
                  />
                  <Text
                    style={styles.newsText}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                </View>}
              onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
            />
          ))
        }
      </View>
    );
  }
  renderHuiNongStudy() {
    const { twoNewsList } = this.state;
    const { push } = this.props;
    return (
      <View style={[styles.studyRow, styles.marginView]}>
        <View style={styles.titleView}>
          <Iconfont style={styles.titleViewIcon} name="icon-xiaoxi1" />
          <Text style={styles.titleText}>每日技能</Text>
        </View>
        <View>
          {
            twoNewsList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={styles.newsView}>
                    <CachedImage
                      style={styles.newsImg}
                      source={{ uri: `${item.newsImages[0].imgUrl}?imageView2/1/w/60` }}
                    />
                    <Text
                      style={styles.newsText}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>
                  </View>}
                onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
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
      <View style={styles.marginView}>
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
                    <CachedImage style={styles.swiperImage} source={{ uri: item.img }} />
                  </View>}
                onPress={() => { this.imgPush(i); }}
              />
            ))
          }
        </Swiper>
      </View>
    );
  }
  renderAllGoods() {
    const { items } = this.state;
    return (
      <View style={styles.forYou}>
        <View style={styles.forTitleView}>
          <Iconfont style={styles.titleViewIcon} name="icon-peizaizhuangche" /><Text style={styles.forTitle}>为您推荐</Text>
        </View>
        <Child data={items} />
      </View>
    );
  }
  render() {
    const {
      refresh,
      loading,
      nomore,
      backgroundTopImg,
      threeNewsList,
    } = this.state;
    const { localData: { districtName } } = UserSocket;
    return (
      <Container>
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onRefresh}
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
            image={backgroundTopImg}
            label={districtName}
            push={() => { this.props.push({ key: 'MainSearcher', params: { type: 'goods' } }); }}
          />
          {this.renderHeaderNavigation()}
          {this.renderSecend()}
          {threeNewsList.length > 0 && this.renderNews()}
          {this.renderHuiNongStudy()}
          {this.renderSwiper()}
          {this.renderAllGoods()}
          {loading && <LoadMore />}
          {nomore && <LoadNoMore />}
        </ScrollView>
      </Container>
    );
  }
}

Goods.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(Goods);
