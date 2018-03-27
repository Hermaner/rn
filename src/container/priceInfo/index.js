import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Input, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { TFeedback, Header, ModalCall } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class PriceDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { items } = this.props.navigation.state.params;
    console.log('TTTTTTTTTTTT', items)
    const timestamp = new Date().getTime();
    const endTimeTimestamp = (parseFloat(items.purchase.purchaseTime) * 86400000)
    + parseFloat(new Date(items.purchase.postDate).getTime());
    const endTime = new Date(endTimeTimestamp).toLocaleString().replace(/:\d{1,2}$/, ' ');
    return (
      <View style={styles.pagebody}>
        <View style={styles.border}>
          <View style={styles.flexRow}>
            <Text style={[styles.normalText, { color: 'green' }]}>{timestamp < endTimeTimestamp ? '[采购中]' : '[已截止]'}</Text>
            <Text style={[styles.normalText, { color: Mcolor }]}>
              {items.purchase.brandName}/{items.purchase.categoryName}</Text>
          </View>
          <Text style={styles.normalText}>采购人：{items.purchase.nickName}</Text>
          <Text style={styles.normalText}>
            采购地：{items.purchase.receiveProvinceName}{items.purchase.receiveCityName}</Text>
          <Text style={styles.normalText}>采购截止日期：{endTime}</Text>
        </View>
        <Text style={styles.normalText}>价格：{items.price}元/{items.unit}</Text>
        <Text style={styles.normalText}>供应量：{items.supplCount}{items.unit}</Text>
        <Text style={styles.normalText}>供货地：{items.supplyProvinceName}{items.supplyCityName}</Text>
        <Text style={styles.normalText}>报价时间：{items.postDate}</Text>
        <Text style={styles.normalText}>补充说明</Text>
        <Input value={items.memo} style={styles.inputs} multiline />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { items } = this.props.navigation.state.params;
    return (
      <Container>
        <Header back={pop} title="报价详情" />
        <Content style={{ backgroundColor: '#fff' }}>
          {
            this._renderBody()
          }
        </Content>
        <View style={styles.flexRow}>
          <TFeedback
            content={
              <View style={styles.leftBtn}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>聊生意</Text>
              </View>}
            onPress={() => this.chatPeople(items)}
          />
          <TFeedback
            content={
              <View style={styles.rightBtn}>
                <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}>打电话</Text>
              </View>}
            onPress={() => this.ModalCall.show(items.purchase.phone, items.purchase.memberId)}
          />
        </View>
        <ModalCall ref={(o) => { this.ModalCall = o; }} />
      </Container>
    );
  }
}

PriceDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PriceDetail);
