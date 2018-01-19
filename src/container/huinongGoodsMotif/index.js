import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { Header, ScrollableTab, Loading } from '../../components';
import base from './base';
import styles from './styles';

import Child from './child';

class HuinongGoodsMotif extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderBody() {
    const { brands } = this.state;
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <Image style={styles.image} source={{ uri: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=9316bf1010d5ad6eaaf964e2b1f038db/0b55b319ebc4b74502a433c2c4fc1e178a821535.jpg' }} />
        {
          brands &&
          <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
            {
              brands.map((item, index) => (
                <Child tabLabel={item.brandName} name={name} brandId={item.brandId} key={index} />
              ))
            }
          </ScrollableTabView>
        }
      </View>
    );
  }
  _renderAll() {
    return (
      <View>
        {this._renderNewsList()}
      </View>
    );
  }
  _renderSwiper() {
    const { imgList } = this.state;
    return (
      <View style={{ height: 200 }}>
        <Swiper
          style={styles.wrapper}
          height={200}
          autoplay
          paginationStyle={{ justifyContent: 'flex-end', paddingRight: 10, bottom: 18 }}
        >
          {
            imgList.map((item, i) => (
              <View key={i} style={styles.slide}>
                <Image style={styles.image} source={{ uri: item.img }} />
                <View style={styles.newsInfoBox}>
                  <Text style={styles.newsInfoText} numberOfLines={1}>{item.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.newsInfoSmallText, styles.newsInfoTime]}>12-25</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon style={{ marginRight: 10 }} name="arrow-back" />
                      <Text style={styles.newsInfoSmallText}>555</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </Swiper>
      </View>
    );
  }
  _renderNewsList() {
    const { push } = this.props;
    return (
      <View style={styles.newsList}>
        <TouchableOpacity style={styles.newsItem} onPress={() => { push({ key: 'HuinongConsultDetail' }); }}>
          <View style={styles.NewsTextBox}>
            <Text style={styles.newsTitle} numberOfLines={2} >12月25日全国辣椒生产区价格行情【全国】</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.normalText, styles.newsTime]}>12-25</Text>
              <Text style={styles.normalText}>水果蔬菜</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                <Icon style={{ marginRight: 4, fontSize: 14 }} name="arrow-back" />
                <Text style={styles.normalText}>88</Text>
              </View>
            </View>
          </View>
          <Image style={styles.newsImg} source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }} />
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="惠农好货专场" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {/* {this._renderSwiper()} */}
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

HuinongGoodsMotif.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongGoodsMotif);
