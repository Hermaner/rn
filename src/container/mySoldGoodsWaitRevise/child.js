import React from 'react';
import { View, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderRow = () => {
    const { push } = this.props;
    const { tu, orderInfo } = this.state;
    return (
      <View>
        {
          orderInfo.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => { push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
            >
              <View style={{ marginBottom: 10 }}>
                <View style={styles.flexRowBox}>
                  <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>卖家: {item.sellNickName}</Text>
                  <Text style={{ color: 'green', fontSize: 14 }}>
                    {item.statusName}
                  </Text>
                </View>
                <View style={styles.goodsInfo}>
                  {
                    item.supply.supplyImages.length > 0 && item.supply.supplyImages[0].imgUrl ?
                      <CachedImage
                        source={{ uri: `${item.supply.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
                        style={styles.goodsImg}
                      />
                    :
                      <CachedImage style={styles.goodsImg} source={tu} />
                  }
                  <View style={styles.goodsNameBox}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40 }}>
                      <Text style={{ fontSize: 15, color: '#333', flex: 1 }}>{item.supply.brandName}{item.supply.categoryName}</Text>
                      <Text style={{ fontSize: 14, color: '#666' }}>￥{item.unitPrice}</Text>
                    </View>
                    <Text style={{ flex: 1, fontSize: 12, color: '#333', textAlign: 'right' }}>x{item.buyCount}</Text>
                  </View>
                </View>
                <View style={styles.totalBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 30 }}>
                    <Text style={{ fontSize: 14, color: '#666' }}>
                      优惠￥{(item.unitPrice * item.buyCount) - item.amount}
                    </Text>
                    <Text style={{ marginLeft: 5, fontSize: 16, color: '#333' }}>合计：</Text>
                    <Text style={{ fontSize: 16, color: '#FF8711' }}>￥{item.amount}</Text>
                  </View>
                </View>
                {
                  (item.status === '1' || item.status === '2') &&
                  <View style={styles.footerBox}>
                    {/* <TFeedback
                      content={
                        <View style={styles.btnBox}>
                          <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                        </View>}
                      onPress={() => { this.removeOrder(item.supply); }}
                    /> */}
                    <TFeedback
                      content={
                        <View style={styles.btnBox1}>
                          <Text style={{ color: '#fff', fontSize: 14 }}>修改</Text>
                        </View>}
                      onPress={() => { push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
                    />
                  </View>
                }
                {/* {
                  item.status === '3' &&
                  <View style={styles.footerBox}>
                    <TFeedback
                      content={
                        <View style={styles.btnBox}>
                          <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                        </View>}
                      onPress={() => { this.removeOrder(item.supply); }}
                    />
                  </View>
                } */}
                {
                  (item.status === '4') &&
                  <View style={styles.footerBox}>
                    <TFeedback
                      content={
                        <View style={styles.btnBox1}>
                          <Text style={{ color: '#fff', fontSize: 14 }}>去发货</Text>
                        </View>}
                      onPress={() => { push({ key: 'OrderInfoSeller', params: { orderInfo: item, supplyInfo: item.supply, type: 'getMainListSoldGoods' } }); }}
                    />
                  </View>
                }
                {
                  (item.status === '8') &&
                  <View style={styles.footerBox}>
                    <TFeedback
                      content={
                        <View style={styles.btnBox}>
                          <Text style={{ color: '#444', fontSize: 14 }}>删除订单</Text>
                        </View>}
                      onPress={() => { this.deleteOrder(item.orderId); }}
                    />
                  </View>
                }
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </View>
    );
  }
  render() {
    const { orderInfo } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          orderInfo && orderInfo.length > 0 ?
            <ScrollView style={{ flex: 1 }}>
              {this._renderRow()}
            </ScrollView>
            :
            <NoData />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
