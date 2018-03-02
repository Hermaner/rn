import React from 'react';
import { View, Image, BackHandler } from 'react-native';
import { Container, Content, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TOpacity, Loading, Header, CheckBox } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import styles from './styles';
import myBase from './base';

class CreatePay extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  _renderHeader() {
    const { orderNumber, amount } = this.state;
    return (
      <View style={styles.topPrice}>
        <View style={styles.PriceView}>
          <Text style={styles.priceLabel}>￥</Text>
          <Text style={styles.priceValue}>{amount}</Text>
        </View>
        <View style={styles.orderView}>
          <Text style={styles.orderLabel}>订单编号：{orderNumber}</Text>
        </View>
      </View>
    );
  }
  _renderCard() {
    const { cardList, modal, amount } = this.state;
    return (
      <View style={styles.cardBox}>
        {
          cardList.map((item, index) => (
            <View key={index}>
              <CheckBox
                content={
                  <View style={styles.cardView}>
                    <Image style={styles.cardImg} source={item.img} />
                    <Text style={styles.cardLabel}>{item.cardName}</Text>
                  </View>
                }
                value={item.id}
                isRadio
                color="#ff0000"
                onPress={this.backCheck}
                modal={modal}
              />
            </View>
          ))
        }
        <TOpacity
          style={styles.btnView}
          content={
            <Text style={styles.btnViewText}>支付￥{amount}</Text>
          }
          onPress={this.goPay}
        />
      </View>
    );
  }
  _renderTips() {
    return (
      <View style={styles.tips}>
        <Text style={styles.tipsText}>请尽快完成线上交易手机支付</Text>
        <Text style={styles.tipsText}>请在未确认收货之前，货款由平台监管</Text>
        <Text style={styles.tipsText}>请勿相信先确认收货，再申请退款，有问题请联系平台客服</Text>
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
          {this._renderTips()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CreatePay.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CreatePay);
