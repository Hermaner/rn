import React from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header, TFeedback } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import base from './base';
import styles from './styles';

class OrderInfo extends base {
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
    const { push } = this.props;
    const { orderInfo, supplyInfo, tu, myStatus, removeInfo } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          myStatus === '6' &&
          <View style={styles.removeBox}>
            <Text style={{ fontSize: 16, color: '#fff' }}>订单已经取消</Text>
          </View>
        }
        <View style={styles.firstBox}>
          <View>
            <Icon name="pin" style={styles.leftIcn} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, color: '#333', marginBottom: 20 }}>收货人: {orderInfo.receiveName} {orderInfo.receivePhone}</Text>
            <Text style={styles.sixText}>
              {orderInfo.receiveProvinceName}
              {orderInfo.receiveCityName}
              {orderInfo.receiveDistrictName}
            </Text>
          </View>
        </View>
        <Image source={require('../../assets/img/11.png')} style={styles.storeImg} />
        <View style={{ marginTop: 10 }}>
          <TFeedback
            content={
              <View style={styles.mai}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#666', marginRight: 10 }}>卖家: {supplyInfo.nickName}</Text>
                </View>
                <Icon style={{ color: '#666', fontSize: 20 }} name="play" />
              </View>}
            onPress={() => { push({ key: 'StoreDetail', params: { memberId: supplyInfo.memberId } }); }}
          />
          <View style={styles.goodsInfo}>
            {
              supplyInfo.supplyImages ?
                <Image
                  source={{ uri: supplyInfo.supplyImages[0].imgUrl }}
                  style={styles.goodsImg}
                />
              :
                <Image style={styles.goodsImg} source={tu} />
            }
            <View style={styles.goodsNameBox}>
              <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                <Text style={{ fontSize: 14, color: '#F0B464', marginTop: 10 }}>{supplyInfo.wholesalePrice}</Text>
                <Text style={{ fontSize: 14, color: '#F0B464', marginTop: 10 }}>元/{supplyInfo.unit}</Text>
              </View>
              <Text style={{ fontSize: 14, color: '#666', marginTop: 8 }}>{supplyInfo.brandName}{supplyInfo.categoryName}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>购买数量</Text>
              <Text style={styles.sixText}>{orderInfo.buyCount}</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>运费</Text>
              <Text style={styles.sixText}>1</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>优惠</Text>
              <Text style={styles.sixText}>-￥0.00</Text>
            </View>
            <View style={[styles.flexRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>合计</Text>
              <Text style={{ fontSize: 16, color: '#E39F41' }}>￥{orderInfo.amount}</Text>
            </View>
          </View>
        </View>
        <View style={styles.orderInfoBox}>
          {
            myStatus !== '6' &&
            <Text style={[styles.sixText, { marginBottom: 6 }]}>订单编号：{orderInfo.orderNumber}</Text>
          }
          <Text style={[styles.sixText, { marginBottom: 6 }]}>订单创建：{orderInfo.postDate}</Text>
          {
            myStatus === '6' &&
            <Text style={styles.sixText}>取消订单：{removeInfo.postDate}</Text>
          }
        </View>
      </View>
    );
  }
  renderFooter() {
    return (
      <View style={styles.footerBox}>
        <TFeedback
          content={
            <View style={styles.btnBox}>
              <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
            </View>}
          onPress={() => { this.removeOrder(); }}
        />
        <View style={styles.btnBox1}>
          <Text style={{ color: '#fff', fontSize: 14 }}>去支付</Text>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="订单详情"
        />
        <Content>
          {this._renderBody()}
        </Content>
        {this.renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderInfo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderInfo);
