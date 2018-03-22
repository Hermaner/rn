import React from 'react';
import { View, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import styles from './styles';
import myBase from './base';

class OrderPay extends myBase {
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
  _renderHeader() {
    const { orderInfo } = this.state;
    return (
      <View style={styles.pagebody}>
        <View style={[styles.flexRow, { marginBottom: 6 }]}>
          <Text style={{ fontSize: 14, color: '#666' }}>订单编号：</Text>
          <Text style={{ fontSize: 14, color: '#333' }}>{orderInfo.orderNumber}</Text>
        </View>
        <View style={styles.flexRow}>
          <Text style={{ fontSize: 14, color: '#666' }}>订单金额：</Text>
          <Text style={{ fontSize: 14, color: '#FF8711' }}>{orderInfo.amount}</Text>
        </View>
      </View>
    );
  }
  _renderCard() {
    const { cardList, orderInfo } = this.state;
    return (
      <View style={styles.card}>
        {
          cardList.map((item, index) => (
            <View style={[styles.cardBox, item.isBorder ? styles.border : '']} key={index}>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <CachedImage style={styles.zhiImg} source={item.img} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, color: '#333', marginBottom: 4 }}>{item.cardName}</Text>
                  <Text style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>{item.money}</Text>
                  <Text style={{ fontSize: 14, color: '#65C12E' }}>{item.label}</Text>
                </View>
              </View>
              <CheckBox
                style={styles.check}
                onPress={() => this.choosePay(index)}
                checked={item.isChoose === 1}
              />
            </View>
          ))
        }
        <View style={styles.btnBigBox}>
          <TFeedback
            content={
              <View style={styles.btnBox}>
                <Text style={{ fontSize: 14, color: '#fff', textAlign: 'center' }}>支付￥{orderInfo.amount}</Text>
              </View>}
            onPress={() => { this.payMoney(); }}
          />
        </View>
      </View>
    );
  }
  _renderFooter() {
    return (
      <View style={styles.footer}>
        <Text style={{ fontSize: 14, color: '#FF8711', marginBottom: 6 }}>请尽快完成线上交易手机支付</Text>
        <Text style={{ fontSize: 14, color: '#FF8711', marginBottom: 6 }}>请在未确认收货之前，货款由平台监管</Text>
        <Text style={{ fontSize: 14, color: '#FF8711' }}>请勿相信先确认收货，再申请退款，有问题请联系平台客服{this.state.tips}</Text>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="支付订单"
        />
        <Content>
          {this._renderHeader()}
          {this._renderCard()}
          {this._renderFooter()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderPay.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderPay);
