import React from 'react';
import { View, TouchableWithoutFeedback, Text, ScrollView, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback } from '../../components';
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
          orderInfo &&
          orderInfo.map((item, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => { push({ key: 'OrderInfo', params: { orderInfo: item, supplyInfo: item.supply } }); }}
            >
              <View style={{ marginBottom: 10 }}>
                <View style={styles.flexRowBox}>
                  <Text style={{ flex: 1, color: '#666', fontSize: 14 }}>卖家: {item.sellNickName}</Text>
                  <Text style={{ color: '#FF8711', fontSize: 14 }}>
                    {item.statusName}
                  </Text>
                </View>
                <View style={styles.goodsInfo}>
                  {
                    item.supply.supplyImages.length > 0 && item.supply.supplyImages[0].imgUrl ?
                      <Image
                        source={{ uri: item.supply.supplyImages[0].imgUrl }}
                        style={styles.goodsImg}
                      />
                    :
                      <Image style={styles.goodsImg} source={tu} />
                  }
                  <View style={styles.goodsNameBox}>
                    <Text style={{ fontSize: 14, color: '#333', flex: 1 }}>{item.supply.brandName}{item.supply.categoryName}</Text>
                    <View>
                      <Text style={{ fontSize: 14, color: '#333', textAlign: 'right' }}>￥{item.unitPrice}</Text>
                      <Text style={{ fontSize: 14, color: '#333', textAlign: 'right' }}>x{item.buyCount}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.totalBox}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ fontSize: 16, color: '#333' }}>合计：</Text>
                    <Text style={{ fontSize: 16, color: '#FF8711' }}>￥{item.amount}</Text>
                  </View>
                  <Text style={{ fontSize: 14, color: '#666', marginTop: 6 }}>(运费：￥0.00 优惠：-￥0.00)</Text>
                </View>
                {
                  (item.status === '1' || item.status === '2') &&
                  <View style={styles.footerBox}>
                    <TFeedback
                      content={
                        <View style={styles.btnBox}>
                          <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                        </View>}
                      onPress={() => { this.removeOrder(); }}
                    />
                    <TFeedback
                      content={
                        <View style={styles.btnBox1}>
                          <Text style={{ color: '#fff', fontSize: 14 }}>去支付</Text>
                        </View>}
                      onPress={() => { this.goAlipay(item.orderId); }}
                    />
                  </View>
                }
                {
                  (item.status === '6') &&
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
    // const {  } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <ScrollView>
          {this._renderRow()}
        </ScrollView>
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
