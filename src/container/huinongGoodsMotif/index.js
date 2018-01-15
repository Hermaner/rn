import React from 'react';
import { TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Swiper from 'react-native-swiper';
import { Container, Content, Text, Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { pushRoute, popRoute } from '../../actions';
import { Header, ScrollableTab, TFeedback } from '../../components';
import base from './base';
import styles from './styles';

// import Child from './child';

class HuinongGoodsMotif extends base {
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
    const { imgLists } = this.state;
    const { push } = this.props;
    const Child = () => (
      <View style={styles.goods}>
        <View style={styles.goodsTitle}>
          <Text style={styles.goodsTitleText}>四川脐橙</Text>
        </View>
        <ScrollView style={{ marginBottom: 20 }}>
          {
            imgLists.map((item, index) => (
              <View style={styles.goodsItem} key={index}>
                <Image style={styles.goodsImage} resizeMode="stretch" source={{ uri: item.img }} />
                <View style={{ flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goodsName}>{item.goodsName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                      <Text style={{ color: '#F0B527', fontSize: 20 }}>{item.price}</Text>
                      <Text style={{ color: '#F0B527', fontSize: 14, marginRight: 4 }}>元/斤</Text>
                      <Text style={{ color: '#F0B527', fontSize: 12 }}>{item.tj}</Text>
                    </View>
                    <Text style={styles.userName}>{item.name}</Text>
                    <Text style={styles.userName}>产地: {item.place}</Text>
                  </View>
                  <View style={styles.btnBox}>
                    <View style={{ flex: 1 }} />
                    <TFeedback
                      content={
                        <View style={styles.btnB}>
                          <Text style={styles.btnText}>聊生意</Text>
                        </View>}
                      onPress={() => { push({ key: 'User' }); }}
                    />
                  </View>
                </View>
              </View>
            ))
          }
        </ScrollView>
      </View>
    );
    return (
      <View style={styles.pagebody}>
        <Image style={styles.image} source={{ uri: 'https://imgsa.baidu.com/forum/w%3D580%3B/sign=9316bf1010d5ad6eaaf964e2b1f038db/0b55b319ebc4b74502a433c2c4fc1e178a821535.jpg' }} />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="四川脐橙" type="" />
          <Child tabLabel="浙江脐橙" type="" />
          <Child tabLabel="海南脐橙" type="" />
          <Child tabLabel="哈尔滨脐橙" type="" />
          <Child tabLabel="新疆脐橙" type="" />
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
      </Container>
    );
  }
}

HuinongGoodsMotif.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(HuinongGoodsMotif);
