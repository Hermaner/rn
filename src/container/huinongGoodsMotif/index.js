import React from 'react';
import { View, BackHandler, ScrollView } from 'react-native';
import { Container, Text } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { BHeader, TFeedback, Loading, TOpacity, NoData } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class HuinongGoodsMotif extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderRow = (data) => {
    const { push } = this.props;
    return (
      <View>
        {
          data !== undefined && data !== null && data !== '' && data.length > 0 &&
          data.map((item, index) => (
            item.supplys !== null && item.supplys !== '' && item.supplys.length > 0 &&
            <View key={index} style={styles.listView}>
              <View style={styles.goodsTypeBox}>
                <View style={styles.goodsTypeCenter} renderToHardwareTextureAndroid ref={(o) => { this[`view${index}`] = o; }}>
                  <Text style={styles.goodsTypeText}>{item.name}</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {
                  item.supplys !== null && item.supplys !== '' && item.supplys.length > 0 &&
                  item.supplys.map((item2, index2) => (
                    <TFeedback
                      key={index2}
                      content={
                        <View style={styles.box}>
                          <View style={styles.goodsItem}>
                            {
                              item2.supplyImages && item2.supplyImages.length > 0 &&
                              <View style={styles.imgBox}>
                                <CachedImage style={styles.goodsImage} source={{ uri: `${item2.supplyImages[0].imgUrl}?imageView2/1/w/200` }} />
                              </View>
                            }
                            <View style={{ flex: 1 }}>
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text numberOfLines={2} style={[styles.goodsName, { flex: 1 }]}>
                                  {item2.brandName}{item2.categoryName}
                                </Text>
                              </View>
                              <View style={styles.priceBox}>
                                <Text style={{ color: Mcolor, fontSize: 20 }}>{item2.wholesalePrice}</Text>
                                <Text style={styles.unit}>元/{item2.unit}</Text>
                                <View style={styles.needCount}>
                                  <Text style={{ color: '#fff', fontSize: 12 }}>{item2.wholesaleCount}{item2.unit}起批</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                              </View>
                              <Text style={styles.name}>{item2.nickName}</Text>
                              <Text style={styles.userName}>
                                {item2.sendProvinceName}{item2.sendCityName}{item2.sendDistrictName}
                              </Text>
                            </View>
                          </View>

                          <TOpacity
                            style={styles.chatBox}
                            content={
                              <Text style={styles.chatText}>聊生意</Text>
                            }
                            onPress={() => this.goChat(item2)}
                          />
                        </View>}
                      onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item2.supplyId, memberId: item2.memberId } }); }}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  renderTab() {
    const { goodsItems } = this.state;
    return (
      <View style={styles.tabs}>
        {
          goodsItems.map((item, index) => (
            <TOpacity
              key={index}
              style={styles.tabView}
              content={
                <Text style={styles.tabText}>{item.name}</Text>
              }
              onPress={() => this.changeTab(index)}
            />
          ))
        }
      </View>
    );
  }
  _renderBody() {
    const { goodsItems, scrollY } = this.state;
    const { img } = this.props.navigation.state.params;
    return (
      <View style={styles.pagebody}>
        {
          img !== null && img !== null && img.split(',').length > 0 &&
          <View style={styles.bigImgBox}>
            <CachedImage style={styles.image} source={{ uri: img.split(',')[0] }} />
          </View>
        }
        {scrollY < 120 && this.renderTab()}
        {this._renderRow(goodsItems)}
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { haveData, loading, scrollY } = this.state;
    return (
      <Container>
        <BHeader back={pop} title="慧包好货专场" />
        {
          haveData ?
            <View style={{ flex: 1 }}>
              {scrollY >= 120 && this.renderTab()}
              <ScrollView
                style={{ flex: 1 }}
                scrollEventThrottle={10}
                onScroll={this._onScroll}
                ref={(o) => { this.ScrollView = o; }}
              >
                {this._renderBody()}
              </ScrollView>
            </View>
            :
            loading &&
            <View style={{ flex: 1 }}>
              <NoData
                label="没有相关数据,请联系客服添加"
              />
            </View>
        }
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
