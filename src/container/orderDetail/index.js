import React from 'react';
import { View, Image } from 'react-native';
import { Container, Content, Icon, Text, Input, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, InputNumber, Header, TFeedback } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import base from './base';
import styles from './styles';

class OrderDetail extends base {
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
    const {
      skuCount,
      name,
      label,
      labelLength,
      adress,
      peopleInfo,
      supplyInfo,
      tu,
      renderServicesItems,
      logisticsModeItems,
      supplyModeItems,
      phone } = this.state;
    return (
      <View style={styles.pagebody}>
        <TFeedback
          content={
            <View style={styles.firstBox}>
              <View>
                <Icon name="pin" style={styles.leftIcn} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, color: '#333', marginBottom: 20 }}>收货人: {name} { phone || peopleInfo.phone}</Text>
                <Text style={styles.sixText}>{adress}</Text>
              </View>
              <View>
                <Icon name="play" style={styles.rightIcn} />
              </View>
            </View>}
          onPress={() => { push({ key: 'ShippingAddress', params: { type: 'getOrderDetail' } }); }}
        />
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
          <TFeedback
            content={
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
              </View>}
            onPress={() => { push({ key: 'GoodDetail', params: { supplyId: supplyInfo.supplyId } }); }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.flexRowInfo}>
            <Text style={styles.titleText}>数量</Text>
            <InputNumber
              onChange={count => this.setState({ skuCount: count })}
              value={skuCount}
              min={1}
            />
          </View>
          <View style={styles.flexRowInfo}>
            <View style={[styles.flexRow, { flex: 1 }]}>
              <Text style={{ fontSize: 16, color: '#333', marginRight: 2 }}>服务方式</Text>
              <Text style={{ fontSize: 16, color: '#666' }}>(非必填)</Text>
            </View>
          </View>
          <View style={styles.typeChoose}>
            <View style={styles.typeChooseBox}>
              {
                supplyInfo.renderServices &&
                <View>
                  <Text style={styles.typeText}>提供服务</Text>
                  {
                    renderServicesItems.map((item, index) => (
                      <View style={[styles.flexRow, { marginTop: 6 }]} key={index}>
                        <CheckBox
                          style={styles.check}
                          onPress={() => this.chooseType1(index)}
                          checked={item.isChoose === 1}
                        />
                        <Text style={styles.labelText}>{item.title}</Text>
                      </View>
                    ))
                  }
                </View>
              }
            </View>
            <View style={styles.typeChooseBox}>
              {
                supplyInfo.logisticsMode &&
                <View>
                  <Text style={styles.typeText}>物流方式</Text>
                  {
                    logisticsModeItems.map((item, index) => (
                      <View style={[styles.flexRow, { marginTop: 6 }]} key={index}>
                        <CheckBox
                          style={styles.check}
                          onPress={() => this.chooseType2(index)}
                          checked={item.isChoose === 1}
                        />
                        <Text style={styles.labelText}>{item.title}</Text>
                      </View>
                    ))
                  }
                </View>
              }
            </View>
            <View style={styles.typeChooseBox}>
              {
                supplyInfo.supplyMode &&
                <View>
                  <Text style={styles.typeText}>供货模式</Text>
                  {
                    supplyModeItems.map((item, index) => (
                      <View style={[styles.flexRow, { marginTop: 6 }]} key={index}>
                        <CheckBox
                          style={styles.check}
                          onPress={() => this.chooseType3(index)}
                          checked={item.isChoose === 1}
                        />
                        <Text style={styles.labelText}>{item.title}</Text>
                      </View>
                    ))
                  }
                </View>
              }
            </View>
          </View>
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.flexRowInfo}>
            <Text style={{ fontSize: 16, color: '#333', marginRight: 2 }}>留言</Text>
            <Text style={{ fontSize: 16, color: '#666' }}>(非必填)</Text>
          </View>
          <View style={styles.inputBox}>
            <Input
              style={styles.inputLabel}
              value={label}
              onChangeText={text => this.saveLabel(text)}
              multiline
              placeholder="详细说明您对货品的要求等"
              placeholderTextColor="#999"
            />
            <Text style={{ textAlign: 'right', color: '#666', fontSize: 14, marginTop: 4 }}>还可输入{labelLength || 50}字</Text>
          </View>
        </View>
      </View>
    );
  }
  renderFooter() {
    const { supplyInfo, skuCount } = this.state;
    return (
      <View style={styles.flexRow}>
        <View style={styles.footerLeft}>
          <Text style={{ fontSize: 12, color: '#333' }}>总金额</Text>
          <Text style={{ fontSize: 14, color: '#F0B464' }}>￥{ skuCount * supplyInfo.wholesalePrice }</Text>
        </View>
        <TFeedback
          content={
            <View style={styles.footerRight}>
              <Text style={{ fontSize: 14, color: '#fff' }}>确认</Text>
            </View>}
          onPress={() => { this.buildOrder(); }}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { supplyInfo } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="确认订单"
        />
        <Content>
          {
            supplyInfo &&
            this._renderBody()
          }
        </Content>
        {
          supplyInfo &&
          this.renderFooter()
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderDetail);
