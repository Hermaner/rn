import React from 'react';
import { View, BackHandler } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header, TFeedback, Iconfont, TOpacity, ModalCall, CountDownTimer, TitleItem, ImageLook } from '../../components';
import { pushRoute, popRoute, resetHome } from '../../actions';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class OrderInfo extends base {
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
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const { orderInfo, supplyInfo, tu, myStatus, removeInfo,
      LOGInfo, statusInfo, getTime } = this.state;
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
                  代发货
                </Text>
                <Text style={styles.labelText2} >
                  待收货
                </Text>
              </View>
            </View>
          </View>
        }
        {
          orderInfo.status === '6' &&
          <View style={styles.removeBox2}>
            <View>
              <Text style={{ fontSize: 22, color: '#fff' }}>退款中</Text>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>请等待卖家同意</Text>
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
              <Text style={{ fontSize: 22, color: '#fff' }}>订单已完成</Text>
              <Text style={{ fontSize: 14, color: '#fff', marginTop: 10 }}>感谢您的购买</Text>
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
                    <Text style={{ fontSize: 14, color: '#333', marginBottom: 10 }}>物流公司：{LOGInfo.logisticsName}</Text>
                    <Text style={{ fontSize: 14, color: '#666' }}>物流单号：{LOGInfo.deliverOrderNumber}</Text>
                  </View>
                </View>
                <Icon style={{ fontSize: 14, color: '#666', marginLeft: 5 }} name="md-arrow-dropright" />
              </View>
            }
            onPress={() => { push({ key: 'OrderLOG', params: { orderId: orderInfo.orderId } }); }}
          />
        }
        <View style={styles.firstBox}>
          <View>
            <Icon name="pin" style={styles.leftIcn} />
          </View>
          <View style={{ flex: 1 }}>
            <View style={styles.addNameLine}>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>{orderInfo.receiveName}</Text>
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
                  <Text style={styles.sellerText}>卖家: {decodeURI(supplyInfo.nickName)}</Text>
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
                    onPress={() => this.ModalCall.show(supplyInfo.phone, supplyInfo.memberId)}
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
              <Text style={{ flex: 1, fontSize: 15, color: '#333' }}>{supplyInfo.brandName}{supplyInfo.categoryName}</Text>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: 15, color: Mcolor }}>{supplyInfo.wholesalePrice}</Text>
                <Text style={{ fontSize: 15, color: Mcolor }}>元/{supplyInfo.unit}</Text>
              </View>
            </View>
          </View>
          <View style={styles.infoBox}>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>购买数量</Text>
              <Text style={styles.sixText}>x{orderInfo.buyCount}</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>运费</Text>
              <Text style={styles.sixText}>￥{orderInfo.freight || '0.0'}</Text>
            </View>
            <View style={[styles.flexRow, { marginBottom: 10 }]}>
              <Text style={[styles.sixText, { flex: 1 }]}>优惠</Text>
              <Text style={[styles.sixText, { color: 'green' }]}>
                -￥{orderInfo.discount || '0.0'}
              </Text>
            </View>
            <View style={[styles.flexRow, { borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 }]}>
              <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>合计</Text>
              <Text style={{ fontSize: 16, color: Mcolor }}>￥{orderInfo.amount}</Text>
            </View>
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
          <Text style={[styles.sixText, { marginBottom: 6 }]}>订单创建：{orderInfo.postDate}</Text>
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
            myStatus === '8' &&
            <Text style={styles.sixText}>取消订单：{removeInfo.postDate}</Text>
          }
        </View>
      </View>
    );
  }
  renderCustomerervice() {
    const { refundItems } = this.state;
    return (
      <View style={[styles.flexOne, styles.boxStyle]}>
        <TitleItem
          text="售后信息"
        />
        {
          refundItems.map((list, index) => (
            <View key={index}>
              <View style={[styles.rowBox, styles.flexOne, { marginTop: 10 }]}>
                <Text style={styles.myText}>申请售后时间：</Text>
                <Text style={[styles.myText, styles.flexOne]}>{list.postDate}</Text>
              </View>
              <View style={[styles.rowBox, styles.flexOne]}>
                <Text style={styles.myText}>申请售后原因：</Text>
                <Text style={[styles.myText, styles.flexOne]}>{list.message}</Text>
              </View>
              {
                list.status === '2' &&
                <View style={[styles.rowBox, styles.flexOne]}>
                  <Text style={styles.myText}>订单退款时间：</Text>
                  <Text style={[styles.myText, styles.flexOne]}>{list.modiDate}</Text>
                </View>
              }
              {
                list.status === '3' &&
                <View style={[styles.rowBox, styles.flexOne]}>
                  <Text style={styles.myText}>拒绝退款时间：</Text>
                  <Text style={[styles.myText, styles.flexOne]}>{list.modiDate}</Text>
                </View>
              }
              {
                list.status === '3' &&
                <View style={[styles.rowBox, styles.flexOne]}>
                  <Text style={styles.myText}>拒绝退款原因：</Text>
                  <Text style={[styles.myText, styles.flexOne]}>{list.checkMemo}</Text>
                </View>
              }
              {
                list.status === '4' &&
                <View style={[styles.rowBox, styles.flexOne]} v-if="orderInfo==2">
                  <Text style={styles.myText}>取消退款时间：</Text>
                  <Text style={[styles.myText, styles.flexOne]}>{list.modiDate}</Text>
                </View>
              }
              {
                list.status === '5' &&
                <View style={[styles.rowBox, styles.flexOne]} v-if="orderInfo==2">
                  <Text style={styles.myText}>同意退货时间：</Text>
                  <Text style={[styles.myText, styles.flexOne]}>{list.modiDate}</Text>
                </View>
              }
            </View>
          ))
        }
      </View>
    );
  }
  renderReturnCert() {
    const { orderInfo: { refundOrder: { refundInfo } } } = this.state;
    const images = [];
    refundInfo.imgUrls.split(',').forEach((item) => {
      images.push({
        imgUrl: item,
      });
    });
    return (
      <View style={[styles.flexOne, styles.boxStyle]}>
        <TitleItem
          text="退货凭证"
        />
        <View>
          <View style={[styles.rowBox, styles.flexOne, { marginTop: 10 }]}>
            <Text style={styles.myText}>物流名称：</Text>
            <Text style={[styles.myText, styles.flexOne]}>{refundInfo.logisticsName}</Text>
          </View>
          <View style={[styles.rowBox, styles.flexOne]}>
            <Text style={styles.myText}>快递单号：</Text>
            <Text style={[styles.myText, styles.flexOne]}>{refundInfo.deliverNumber}</Text>
          </View>
          <ImageLook
            images={images}
          />
        </View>
      </View>
    );
  }
  renderFooter() {
    const { orderInfo } = this.state;
    const { push } = this.props;
    return (
      <View>
        {
          orderInfo.status < 4 &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 14 }}>取消订单</Text>
                </View>}
              onPress={() => { this.removeOrder(); }}
            />
          </View>
        }
        {
          (orderInfo.status === '2') &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 14 }}>确认订单</Text>
                </View>}
              onPress={() => { this.reviseOrder(); }}
            />
            <View style={[styles.btnBox1, { backgroundColor: '#bababa', borderColor: '#bababa' }]}>
              <Text style={{ color: '#fff', fontSize: 14 }}>去支付</Text>
            </View>
          </View>
        }
        {
          orderInfo.status === '3' &&
          <View style={styles.footerBox}>
            <View style={[styles.btnBox, { backgroundColor: '#bababa' }]}>
              <Text style={{ color: '#fff', fontSize: 14 }}>确认订单</Text>
            </View>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>去支付</Text>
                </View>}
              onPress={() => { push({ key: 'OrderPay', params: { orderInfo } }); }}
            />
          </View>
        }
        {
          orderInfo.status === '4' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>申请售后</Text>
                </View>}
              onPress={() => { push({ key: 'ReturnPage', params: { orderInfo } }); }}
            />
          </View>
        }
        {
          orderInfo.status === '5' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>确认收货</Text>
                </View>}
              onPress={() => { this.orderOk(); }}
            />
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 14 }}>申请售后</Text>
                </View>}
              onPress={() => { push({ key: 'ReturnPage', params: { orderInfo } }); }}
            />
          </View>
        }
        {
          orderInfo.status === '6' && orderInfo.refundOrder.refundInfo === null &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>取消退款</Text>
                </View>}
              onPress={() => { this.CancelRefundOrder(); }}
            />
            {
              orderInfo.refundOrder.status === '5' &&
              <TFeedback
                content={
                  <View style={styles.btnBox1}>
                    <Text style={{ color: '#fff', fontSize: 14 }}>退货凭证</Text>
                  </View>}
                onPress={() => { push({ key: 'ReturnGoods', params: { orderInfo } }); }}
              />
            }
          </View>
        }
        {
          orderInfo.status === '7' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox1}>
                  <Text style={{ color: '#fff', fontSize: 14 }}>申请售后</Text>
                </View>}
              onPress={() => { push({ key: 'ReturnPage', params: { orderInfo } }); }}
            />
          </View>
        }
        {
          orderInfo.status === '8' &&
          <View style={styles.footerBox}>
            <TFeedback
              content={
                <View style={styles.btnBox}>
                  <Text style={{ color: '#444', fontSize: 14 }}>删除订单</Text>
                </View>}
              onPress={() => { this.deleteOrder(orderInfo.orderId); }}
            />
          </View>
        }
      </View>
    );
  }
  render() {
    const { refundItems, orderInfo } = this.state;
    return (
      <Container>
        <Header
          back={this.back}
          title="订单详情"
        />
        <Content>
          {this._renderBody()}
          {refundItems && refundItems.length > 0 && this.renderCustomerervice()}
          {orderInfo.refundOrder && orderInfo.refundOrder.refundInfo && this.renderReturnCert()}
        </Content>
        {this.renderFooter()}
        <ModalCall ref={(o) => { this.ModalCall = o; }} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

OrderInfo.propTypes = {
  pop: PropTypes.func,
  resetHome: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute, resetHome })(OrderInfo);
