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
                <View style={[styles.flexOne, { justifyContent: 'center', alignItems: 'center' }]}>
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
  renderSecend() {
    const { secendList } = this.state;
    return (
      <View style={styles.goodsType}>
        <Text style={styles.goodsTypeTitle}>- 优质推选 -</Text>
        <View style={[styles.flexRow, styles.headerNavigationTwo]}>
          {
            secendList.map((item, index) => (
              <TOpacity
                style={styles.flexOne}
                key={index}
                content={
                  <View style={[styles.flexOne, { justifyContent: 'center', alignItems: 'center' }]}>
                    <View style={[styles.mainIconTwo, { backgroundColor: item.color }]}>
                      <Iconfont style={styles.mainIconFontSecend} name={item.icon} />
                    </View>
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
      <View style={styles.news}>
        {
          threeNewsList.length > 0 &&
          threeNewsList.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.flexRow, styles.rowBox]}>
                  <View style={styles.newsImgView}>
                    {
                      item.newsImages.length > 0 &&
                        <CachedImage
                          style={styles.goodsImg}
                          source={{ uri: `${item.newsImages[0].imgUrl}?imageView2/1/w/60` }}
                        />
                    }
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goodsTitle} numberOfLines={1}>{item.title}</Text>
                    <Text style={styles.normalSixText} numberOfLines={1}>{item.introduction}</Text>
                  </View>
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
      <View style={styles.studyBox}>
        <View style={[styles.studyRow]}>
          <Text style={styles.leftText} numberOfLines={2}>每日技能</Text>
          <View style={{ flex: 1 }}>
            {
              twoNewsList.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <Text
                      style={[styles.normalThreeText, styles.flexOne]}
                      numberOfLines={1}
                    >
                      {item.title}
                    </Text>}
                  onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
                />
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  renderSwiper() {
    const { push } = this.props;
    const { imgList, swiperImgInfo } = this.state;
    return (
      <View style={{ height: 150, marginTop: 5, marginBottom: 5 }}>
        <Swiper
          style={styles.wrapper}
          height={150}
          paginationStyle={{ justifyContent: 'center', bottom: 10 }}
        >
          {
            imgList.length > 0 &&
            imgList.map((item, i) => (
              <TFeedback
                key={i}
                content={
                  <View style={styles.slide}>
                    <CachedImage style={styles.swiperImage} source={{ uri: `${item}?imageView2/1/h/150` }} />
                  </View>}
                onPress={() => { push({ key: 'ImgInfo', params: { imgDetail: swiperImgInfo[item.imgKey].imgUrls } }); }}
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
      <View style={styles.allGoods}>
        <Text style={styles.forYouText}>- 为你推荐 -</Text>
        <Child data={items} />
      </View>
    );
  }
  render() {
    const {
      refresh,
      loading,
      nomore,
    } = this.state;
    const { localData: { districtName } } = UserSocket;
    return (
      <Container>
        <HomeSearch
          label={districtName}
          push={() => { this.props.push({ key: 'MainSearcher', params: { type: 'goods' } }); }}
        />
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
          {/* {this.renderHeader()} */}
          {this.renderHeaderNavigation()}
          {this.renderSecend()}
          {this.renderNews()}
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
