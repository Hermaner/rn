import React from 'react';
import { View, ScrollView, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import { Container, Content, Text, Icon, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, SpotLine, TOpacity, TitleItem, ImageLook } from '../../components';
import base from './base';
import styles from './styles';
import { Mcolor } from '../../utils';

class OrderDetail extends base {
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
  _renderTop() {
    const { item } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.topText}>
          {
            item.status === 1 ? '尚未支付，尽快付款哦' :
            item.status === 3 ? '已付款，师傅将以最快的速度与您联系' :
            item.status === 4 ? '服务已完成，请对我们的服务做出评价' :
            item.status === 5 ? '订单已完成，欢迎再次光临' :
            item.status === 7 ? '订单已取消' :
            item.status === 6 ? '订单已退款' : ''
          }
        </Text>
      </View>
    );
  }
  _renderAddress() {
    const { item, masterInfo } = this.state;
    return (
      <View>
        <SpotLine />
        {
          item.status !== 1 && item.status !== 7 && masterInfo &&
          <View style={styles.masterInfo}>
            <TOpacity
              style={{ flex: 1 }}
              content={
                <View style={styles.leftName}>
                  <Icon name="md-eye" style={styles.leftIco} />
                  <Text style={styles.leftText}>{masterInfo.realName}</Text>
                </View>
              }
              onPress={this.call}
            />
            <TOpacity
              content={
                <View style={styles.rightTel}>
                  <Icon name="ios-call" style={styles.rightIco} />
                  <Text style={styles.mainText}>联系师傅</Text>
                </View>
              }
              onPress={this.call}
            />
          </View>
        }
        <View style={styles.address}>
          <Icon name="ios-pin-outline" style={styles.leftIco} />
          <View style={styles.addressRight}>
            <View style={styles.addressTop}>
              <Text style={styles.userName}>{item.memberName}</Text>
              <Text style={styles.mainText}>{item.memberPhone}</Text>
            </View>
            <Text style={styles.mainText}>
              {item.addressName}
            </Text>
          </View>
        </View>
        <SpotLine />
      </View>
    );
  }
  _renderProduct() {
    const { item } = this.state;
    return (
      <View>
        <TitleItem
          text="服务项目"
          rightContent={
            item.status === 3 && item.status === 4 &&
            <TOpacity
              style={styles.diffBtn}
              content={
                <Text style={styles.diffText}>补差价</Text>
              }
              onPress={this.diffOrder}
            />
          }
        />
        <View style={styles.mid}>
          {
            item.orderItems.map((list, index) => (
              <View style={styles.product} key={index}>
                <CachedImage source={{ uri: `${list.imgUrl}?imageView2/1/w/80` }} style={styles.img} />
                <Text style={styles.name}>
                  {list.servicesTypeName}
                </Text>
                <Text style={styles.count}>
                  x{list.count}
                </Text>
              </View>
            ))
          }
        </View>
        <View style={styles.memo}>
          <Text style={styles.memoText}>
            用户留言：{item.buyMessage || '无'}
          </Text>
          {
            item.orderImages.length > 0 &&
            <ImageLook images={item.orderImages.map(list => list.imgUrl)} />
          }
        </View>
        <View style={styles.totalView}>
          <View style={styles.totalLine}>
            <Text style={styles.totalLeft}>
              总金额
            </Text>
            <Text style={styles.totalRight}>
              ￥{item.amount}
            </Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={styles.totalLeft}>
              优惠金额
            </Text>
            <Text style={styles.totalRight}>
              ￥0.00
            </Text>
          </View>
          <View style={styles.totalLine}>
            <Text style={styles.totalLeft2}>
              订单金额
            </Text>
            <Text style={styles.totalRight2}>
              ￥{item.amount}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderOrderInfo() {
    const { item, textList } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="订单信息"
        />
        <View style={styles.infoList}>
          <Text style={styles.infoText}>订单编号：{item.orderNumber}</Text>
          <Text style={styles.infoText}>下单时间：{item.modiDate}</Text>
          {
            textList.map((list, index) => (
              <Text style={styles.infoText} key={index}>{list}</Text>
            ))
          }
        </View>
      </View>
    );
  }
  _renderCompleteInfo() {
    const { memo, masterImage } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="师傅完工验证"
        />
        <Text style={styles.cpMemo}>{memo}</Text>
        <ImageLook images={masterImage} />
      </View>
    );
  }
  _renderEval() {
    const { item: { orderEvaluate } } = this.state;
    return (
      <View style={styles.evalView}>
        <TitleItem
          text="我的评价"
        />
        <View>
          <Text style={styles.evalDate}>{orderEvaluate.modiDate}</Text>
          <View style={styles.star}>
            <Text style={styles.starText}>态度</Text>
            <StarRating
              disabled
              starSize={20}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              rating={orderEvaluate.attitudeScore || 5}
            />
            <Text style={styles.starText2}>质量</Text>
            <StarRating
              disabled
              starSize={20}
              emptyStarColor={Mcolor}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              starColor={Mcolor}
              maxStars={5}
              rating={orderEvaluate.attitudeScore || 5}
            />
          </View>
        </View>
        <Text style={styles.evalMemo}>{orderEvaluate.content}</Text>
        {
          orderEvaluate.imgUrl.length > 0 && <ImageLook images={orderEvaluate.imgUrl.split(',')} />
        }
      </View>
    );
  }
  _renderFooter() {
    const { item, orderId } = this.state;
    return (
      <Footer style={styles.footer}>
        {
          item.status === 1 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>立即付款</Text>
            }
            onPress={this.goPay}
          />
        }
        {
          item.status === 1 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>取消订单</Text>
            }
            onPress={this.CancelOrder}
          />
        }
        {
          item.isRefund === 1 && item.status === 3 &&
          <View style={styles.acBtn}>
            <Text style={styles.mainText}>退款处理中</Text>
          </View>
        }
        {
          item.isRefund !== 1 && item.status === 3 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>申请退款</Text>
            }
            onPress={this.showRefund}
          />
        }
        {
          item.status === 3 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>确认服务</Text>
            }
            onPress={this.SuccessOrderStatusService}
          />
        }
        {
          item.status === 4 &&
          <TOpacity
            style={styles.acBtn}
            content={
              <Text style={styles.mainText}>立即评价</Text>
            }
            onPress={() => this.props.push({ key: 'OrderEval', params: { orderId } })}
          />
        }
      </Footer>
    );
  }
  _renderModal() {
    const { modalShow, showDiff, showRefund, refundMessage, diffPrice, diffDetail } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="bottom"
        entry="bottom"
        animationDuration={250}
        onClosed={this.closeModel}
        isOpen={modalShow}
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>{showRefund ? '退款原因' : '补差价'}</Text>
          </View>
          {
            showRefund &&
            <ScrollView style={styles.modalContent}>
              <View style={styles.memoView}>
                <Text style={styles.memoLabel}>退款原因</Text>
                <View style={styles.memoInput}>
                  <Input
                    multiline
                    autoFocus
                    style={styles.listMemo}
                    placeholderTextColor="#999"
                    placeholder="输入退款原因"
                    clearButtonMode="while-editing"
                    value={refundMessage}
                    onChangeText={value => this.setState({ refundMessage: value })}
                  />
                </View>
              </View>
            </ScrollView>
          }
          {
            showDiff &&
            <ScrollView style={styles.modalContent}>
              <View style={styles.listView}>
                <Text style={styles.memoLabel}>金额</Text>
                <View style={styles.listRight}>
                  <Input
                    style={styles.listInput}
                    placeholderTextColor="#999"
                    placeholder="输入差价金额"
                    clearButtonMode="while-editing"
                    value={diffPrice}
                    onChangeText={value => this.setState({ diffPrice: value })}
                  />
                </View>
              </View>
              <View style={styles.listView}>
                <Text style={styles.memoLabel}>补充信息</Text>
                <View style={styles.listRight}>
                  <Input
                    style={styles.listInput}
                    placeholderTextColor="#999"
                    placeholder="输入补充信息"
                    clearButtonMode="while-editing"
                    value={diffDetail}
                    onChangeText={value => this.setState({ diffDetail: value })}
                  />
                </View>
              </View>
            </ScrollView>
          }
          <View style={styles.modalBtns}>
            <TOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              content={
                <View>
                  <Text style={styles.modalText}>取消</Text>
                </View>
              }
              onPress={this.closeModel}
            />
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>确认</Text>
                </View>
              }
              onPress={this.saveModel}
            />
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    const { item, masterImage } = this.state;
    return (
      <Container>
        <Header back={pop} title="订单明细" />
        {
          item &&
          <Content>
            {this._renderTop()}
            {this._renderAddress()}
            {this._renderProduct()}
            {this._renderOrderInfo()}
            {masterImage.length > 0 && this._renderCompleteInfo()}
            {item.orderEvaluate && this._renderEval()}
          </Content>
        }
        {item && item.status < 5 && this._renderFooter()}
        {this._renderModal()}
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
