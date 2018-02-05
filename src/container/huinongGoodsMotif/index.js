import React from 'react';
import { TouchableOpacity, View, Image, ScrollView, RefreshControl } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading, LoadMore, LoadNoMore } from '../../components';
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
    const { isTabOne, brands, goodsItems } = this.state;
    console.log('uuuuuuuuuuuuuu', brands);
    const { name } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        <Image style={styles.image} source={{ uri: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=9316bf1010d5ad6eaaf964e2b1f038db/0b55b319ebc4b74502a433c2c4fc1e178a821535.jpg' }} />
        {/* <ScrollableTabView
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
              <Child
                tabLabel={item.brandName}
                name={name}
                brandId={item.brandId}
                key={index}
                categoryId={categoryId}
              />
            ))
          }
        </ScrollableTabView> */}
        <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
          {
            brands.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.flexOne, isTabOne === index ? styles.textBorder : '', { paddingBottom: 10, paddingTop: 10 }]}>
                    <Text style={[styles.tabText, isTabOne === index ? styles.tabTextChoose : '']}>{item.brandName}</Text>
                  </View>}
                onPress={() => this.tabChange(index)}
              />
            ))
          }
        </View>
        <View>
          <Child
            name={name}
            brandId={brands[isTabOne].brandId}
            data={goodsItems}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { brands, refresh, loading, nomore } = this.state;
    return (
      <Container>
        <Header back={pop} title="慧包好货专场" />
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={this._onGetGotSupplyService}
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
          {brands !== null && this._renderBody()}
          {loading && <LoadMore />}
          {nomore && <LoadNoMore />}
        </ScrollView>
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
