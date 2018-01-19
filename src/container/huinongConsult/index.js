import React from 'react';
import { TouchableOpacity, View, Image, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { Header } from '../../components';
import huinongConsultBase from './base';
import styles from './styles';
import Child from './child';

const ScreenWidth = Dimensions.get('window').width;

class HuinongConsult extends huinongConsultBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView
          style={{ flex: 1 }}
          tabBarInactiveTextColor="#666"
          tabBarActiveTextColor="#8bce21"
          tabBarBackgroundColor="#f5f5f5"
          tabBarTextStyle={{ fontSize: 15 }}
          tabBarUnderlineStyle={{ width: ScreenWidth / 4, height: 2, backgroundColor: '#8bce21' }}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Child tabLabel="全部" type="" />
          <Child tabLabel="水果蔬菜" type="" />
          <Child tabLabel="畜牧水产" type="" />
          <Child tabLabel="农副加工" type="" />
          <Child tabLabel="苗木花草" type="" />
          <Child tabLabel="农资农机" type="" />
          <Child tabLabel="粮油米面" type="" />
        </ScrollableTabView>
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
        <Header back={pop} title="农产品市场行情新闻资讯" />
        <Content contentContainerStyle={{ flex: 1 }}>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

HuinongConsult.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongConsult);
