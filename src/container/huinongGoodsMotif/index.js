import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
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
    console.log(brands)
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <Image style={styles.image} source={{ uri: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=9316bf1010d5ad6eaaf964e2b1f038db/0b55b319ebc4b74502a433c2c4fc1e178a821535.jpg' }} />
        <ScrollableTabView
          style={{ flex: 1 }}
          tabBarInactiveTextColor="#666"
          tabBarActiveTextColor="#8bce21"
          tabBarBackgroundColor="#f5f5f5"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarUnderlineStyle={{ height: 2, backgroundColor: '#8bce21' }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          {
            brands.map((item, index) => (
              <Child tabLabel={item.brandName} name={name} brandId={item.brandId} key={index} />
            ))
          }
        </ScrollableTabView>
      </View>
    );
  }
  _renderSwiper() {
    const { imgLists } = this.state;
    return (
      <View style={{ height: 200 }}>
        <Swiper
          style={styles.wrapper}
          height={200}
          paginationStyle={{ justifyContent: 'flex-end', paddingRight: 10, bottom: 18 }}
        >
          {
            imgLists.map((item, i) => (
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
  render() {
    const { pop } = this.props;
    const { brands } = this.state;
    return (
      <View>
        <Header back={pop} title="惠农好货专场" />
        <View>
          {this._renderSwiper()}
          {brands !== null && this._renderBody()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}

HuinongGoodsMotif.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongGoodsMotif);
