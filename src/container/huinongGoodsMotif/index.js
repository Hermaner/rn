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
    const { name, categoryId, brands } = this.props.navigation.state.params;
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
              <Child
                tabLabel={item.brandName}
                name={name}
                brandId={item.brandId}
                key={index}
                categoryId={categoryId}
              />
            ))
          }
        </ScrollableTabView>
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
