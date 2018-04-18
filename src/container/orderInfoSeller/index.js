import React from 'react';
import { View, BackHandler, Modal } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Icon, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header, TFeedback, ModalView, Iconfont, TOpacity, ModalCall, CountDownTimer } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class OrderInfoSeller extends base {
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
  _renderBody() {
    const { push } = this.props;
    const { orderInfo, supplyInfo, tu, myStatus, LOGInfo, statusInfo, getTime } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          parseFloat(orderInfo.status) < 6 &&
          <View style={styles.removeBox}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
              <View style={styles.noticeBox}>
                <Text style={styles.noticeTitle}>
                  {statusInfo[parseFloat(orderInfo.status) - 1].title}
                </Text>
                <Text style={styles.noticeLabel}>
                  {statusInfo[parseFloat(orderInfo.status) - 1].lable}
                </Text>
                {
                  getTime && <CountDownTimer
                    date={getTime}
                    days={{ plural: '天 ', singular: 'day ' }}
                    hours=":"
                    mins=":"
                    segs=""
                  />
                }
              </View>
              <View style={styles.nowBox}>
                <Text style={styles.boxText}>当前</Text>
              </View>
            </View>
            <View style={styles.displayBox}>
              <View>
                <View style={styles.distanceLabel}>
                  <View
                    style={parseFloat(orderInfo.status) === 1 ?
                      styles.labelBoxNow : styles.labelBox}
                  />
                  <View
                    style={parseFloat(orderInfo.status) === 2 ?
                      styles.labelBoxNow : styles.labelBox}
                  />
                  <View
                    style={parseFloat(orderInfo.status) === 3 ?
                      styles.labelBoxNow : styles.labelBox}
                  />
                  <View
                    style={parseFloat(orderInfo.status) === 4 ?
                      styles.labelBoxNow : styles.labelBox}
                  />
                  <View
                    style={parseFloat(orderInfo.status) === 5 ?
                      styles.labelBoxNow : styles.labelBox}
                  />
                </View>
                <View style={styles.line} />
              </View>
              <View style={styles.distanceLabel}>
                <Text style={styles.labelText2} >
                  待修改
                </Text>
                <Text style={styles.labelText2} >
                  待确认
                </Text>
                <Text style={styles.labelText2} >
                  待支付
                </Text>
                <Text style={styles.labelText2} >
                  待发货
                </Text>
                <Text style={styles.labelText2} >
                  待收货
                </Text>
              </View>
            </View>
          </View>
        }
        {
          orderInfo.status === '8' &&
          <View style={styles.removeBoxNo}>
            <Text style={{ fontSize: 16, color: '#fff' }}>订单已经取消</Text>
          </View>
        }
        {
          orderInfo.status === '7' &&
          <View style={styles.removeBox2}>
            <View>
              <Text style={{ fontSize: 16, color: '#fff' }}>订单完成</Text>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>买家已确认收货</Text>
            </View>
          </View>
        }
        {
          LOGInfo !== '' && LOGInfo !== null &&
          <TOpacity
            style={styles.flexOne}
            content={
              <View style={styles.wuLiuBox}>
                <View>
                  <Iconfont name="icon-zuixinhuoyuan" style={styles.leftIcn1} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.addNameLine1}>
                    <Text style={{ fontSize: 16, color: '#333', marginBottom: 10 }}>物流公司：{LOGInfo.logisticsName}</Text>
                    <Text style={{ fontSize: 16, color: '#666' }}>物流单号：{LOGInfo.deliverOrderNumber}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 16, color: '#666' }}>物流详情</Text>
                  <Icon style={{ fontSize: 18, color: '#666', marginLeft: 10 }} name="md-arrow-dropright" />
                </View>
              </View>
            }
            onPress={() => { push({ key: 'OrderLOG', params: { orderId: orderInfo.orderId } }); }}
          />
        }
        <View style={styles.firstBox}>
          <View>
            <Icon name="pin" style={styles.leftIcn} />
          </View>
          <View style={{ flex: 1, paddingBottom: 10 }}>
            <View style={{ height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
              <Text style={{ fontSize: 15, color: '#333', flex: 1 }}>{orderInfo.receiveName}</Text>
              <View style={styles.rowBox}>
                <Text style={styles.phoneText}>{orderInfo.receivePhone}</Text>
                <TOpacity
                  style={styles.copyBox}
                  content={
                    <Text style={styles.copyText}>复制</Text>
                  }
                  onPress={() => this.copyInfo()}
                />
              </View>
            </View>
            <Text style={styles.sixText}>
              {orderInfo.receiveProvinceName}
              {orderInfo.receiveCityName}
              {orderInfo.receiveDistrictName}
            </Text>
          </View>
        </View>
        <CachedImage source={require('../../assets/img/11.png')} style={styles.storeImg} />
        <View style={{ marginTop: 10 }}>
          <TFeedback
            content={
              <View style={styles.mai}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ flex: 1, fontSize: 14, color: '#333', marginRight: 10 }}>买家: {orderInfo.receiveName}</Text>
                  <TOpacity
                    style={styles.copyBox}
                    content={
                      <Text style={styles.copyText}>聊生意</Text>
                    }
                    onPress={this.goChat}
                  />
                  <TOpacity
                    style={styles.copyBox}
                    content={
                      <Text style={styles.copyText}>打电话</Text>
                    }
                    onPress={() => this.ModalCall.show(orderInfo.receivePhone, orderInfo.memberId)}
                  />
                </View>
              </View>}
            onPress={() => { push({ key: 'StoreDetail', params: { memberId: supplyInfo.memberId } }); }}
          />
          <View style={styles.goodsInfo}>
            {
              supplyInfo.supplyImages ?
                <CachedImage
                  source={{ uri: `${supplyInfo.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
                  style={styles.goodsImg}
                />
              :
                <CachedImage style={styles.goodsImg} source={tu} />
            }
            <View style={styles.goodsNameBox}>
              <Text style={{ fontSize: 14, color: '#333', flex: 1 }}>{supplyInfo.brandName}{supplyInfo.categoryName}</Text>
              <Text style={{ fontSize: 14, color: Mcolor }}>
                {supplyInfo.wholesalePrice}元/{supplyInfo.unit}</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>购买数量</Text>
              <Text style={styles.norText}>x{orderInfo.buyCount}</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>运费</Text>
              <Text style={styles.norText}>￥{orderInfo.freight || '0.0'}</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>优惠</Text>
              <Text style={styles.norText}>
                ￥{orderInfo.discount || '0.0'}
              </Text>
            </View>
            <View style={[styles.flexRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>合计</Text>
              <Text style={{ fontSize: 16, color: Mcolor }}>
                ￥{Math.round(parseFloat(orderInfo.amount) * 1000) / 1000}</Text>
            </View>
            {
              orderInfo.payTypeId !== '' && orderInfo.payTypeId !== null &&
              <View style={[styles.flexRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
                <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>支付方式</Text>
                <Text style={{ fontSize: 16, color: Mcolor }}>{orderInfo.payTypeId === '1' ? '微信' : '支付宝'}</Text>
              </View>
            }
          </View>
        </View>
        <View style={styles.orderInfoBox}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.sixText, { flex: 1, marginBottom: 6 }]}>
              订单编号：{orderInfo.orderNumber}</Text>
            <TOpacity
              style={styles.copyBox}
              content={
                <Text style={styles.copyText}>复制</Text>
              }
              onPress={() => this.copyOrderNumber()}
            />
          </View>
          <Text style={[styles.sixText, { marginBottom: 6 }]}>下单时间：{orderInfo.postDate}</Text>
          {
            orderInfo.updateAmountTime !== null &&
            <Text style={[styles.sixText, { marginBottom: 6 }]}>
              订单修改：{orderInfo.updateAmountTime}</Text>
          }
          {
            orderInfo.payTime !== null &&
            <Text style={[styles.sixText, { marginBottom: 6 }]}>支 付：{orderInfo.payTime}</Text>
          }
          {
            orderInfo.sendTime !== null &&
            <Text style={[styles.sixText, { marginBottom: 6 }]}>发 货：{orderInfo.sendTime}</Text>
          }
          {
            orderInfo.receiveTime !== null &&
            <Text style={[styles.sixText, { marginBottom: 6 }]}>收 货：{orderInfo.receiveTime}</Text>
          }
          {
            myStatus === '6' &&
            <Text style={styles.norText}>取消时间：{orderInfo.postDate}</Text>
          }
        </View>
      </View>
    );
  }
  _renderModalView() {
    const { orderInfo, freight, favorable } = this.state;
    const myFavorable = favorable || 0;
    const myFreight = freight || 0;
    const newAllMoney = (parseFloat(orderInfo.unitPrice * orderInfo.buyCount)
    - parseFloat(myFavorable)) + parseFloat(myFreight);
    const content = (
      <View>
        <View style={styles.modal}>
          <Text>优惠金额：</Text>
          <Input
            style={styles.inputText}
            value={favorable}
            keyboardType="numeric"
            onChangeText={text => this.saveRevisePrice(text)}
            placeholder="请输入优惠金额"
          />
        </View>
        <View style={styles.modal}>
          <Text>运费金额：</Text>
          <Input
            style={styles.inputText}
            value={freight}
            keyboardType="numeric"
            onChangeText={text => this.saveFreight(text)}
            placeholder="请输入运费金额"
          />
        </View>
        <View style={styles.modalBigBox}>
          <Text style={{ flex: 1, fontSize: 16, color: Mcolor }}>
            合计：{Math.round(parseFloat(newAllMoney) * 1000) / 1000}元</Text>
          <TFeedback
            content={
              <View style={styles.modalBox}>
                <Text style={{ fontSize: 16, color: '#fff' }}>确定</Text>
              </View>}
            onPress={() => { this.reviseOrder(); }}
          />
        </View>
      </View>
    );
    return (
      <ModalView
        ref={(o) => { this.ModalView = o; }}
        title={'订单修改'}
        content={content}
        onConfirm={() => {}}
      />
    );
  }
  renderModal() {
    const { label } = this.state;
    return (
      <View>
        <Modal
          visible={this.state.visible}
          transparent={this.state.transparent}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <TFeedback
            content={
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              >
                <TFeedback
                  content={
                    <View style={styles.modalBox1}>
                      <View style={styles.modalTitleBox}>
                        <Text style={styles.modalTitleText}>拒绝原因</Text>
                        <TFeedback
                          content={
                            <Icon style={{ fontSize: 34, color: '#333', flex: 1, textAlign: 'right' }} name="close" />}
                          onPress={() => { this.setState({ visible: false }); }}
                        />
                      </View>
                      <View style={{ height: 100 }}>
                        <Input
                          style={styles.inputText}
                          value={label}
                          onChangeText={text => this.saveLabel(text)}
                          multiline
                          placeholder="拒绝原因"
                          placeholderTextColor="#777"
                        />
                      </View>
                      <TFeedback
                        content={
                          <View style={styles.submitBox}>
                            <Text style={styles.submitText}>提交</Text>
                          </View>}
                        onPress={() => this.RefuseRefundOrder()}
                      />
                    </View>}
                  onPress={() => { console.log('modal'); }}
                />
              </View>}
            onPress={() => { this.setState({ visible: false }); }}
          />
        </Modal>
      </View>
    );
  }
  renderFooter() {
    const { orderInfo } = this.state;
    const { push } = this.props;
    return (
      <View>
        {
          (orderInfo.status === '1' || orderInfo.status === '2') &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>修改</Text>
                </View>}
              onPress={this.openBuyMasker}
            />
          </View>
        }
        {
          orderInfo.status === '4' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>去发货</Text>
                </View>}
              onPress={() => { push({ key: 'OrderSendGoods', params: { orderInfo } }); }}
            />
          </View>
        }
        {
          orderInfo.refundOrder &&
          !orderInfo.refundOrder.refundInfo &&
          orderInfo.status === '6' && orderInfo.refundOrder.type === '1' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>同意退款</Text>
                </View>}
              onPress={() => { this.returnMoneyOk(); }}
            />
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>拒绝申请</Text>
                </View>}
              // onPress={() => { this.RefuseRefundOrder(); }}
              onPress={() => { this.openModal(); }}
            />
          </View>
        }
        {
          orderInfo.refundOrder &&
          !orderInfo.refundOrder.refundInfo &&
          orderInfo.status === '6' && orderInfo.refundOrder.status === '1' && orderInfo.refundOrder.type === '2' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>同意退货申请</Text>
                </View>}
              onPress={() => { this.ConfirmRefundOrder(); }}
            />
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>拒绝申请</Text>
                </View>}
              onPress={() => { this.openModal(); }}
            />
          </View>
        }
        {
          orderInfo.refundOrder &&
          orderInfo.refundOrder.refundInfo !== null &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 16 }}>查看退货物流</Text>
                </View>}
              onPress={() => { push({ key: 'ReturnOrderLOG', params: { info: orderInfo.refundOrder.refundInfo } }); }}
            />
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 16 }}>确认退款</Text>
                </View>}
              onPress={() => { this.returnMoneyOk(); }}
            />
          </View>
        }
        {
          orderInfo.status === '8' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 16 }}>删除订单</Text>
                </View>}
              onPress={() => { this.deleteOrder(orderInfo.orderId); }}
            />
          </View>
        }
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
        {this.renderModal()}
        {this._renderModalView()}
        <ModalCall ref={(o) => { this.ModalCall = o; }} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderInfoSeller.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(OrderInfoSeller);
