import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, SpotLine, TOpacity, TitleItem, ImageLook } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterOrderDetail extends base {
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
    const { info } = this.state;
    return (
      <View style={styles.top}>
        <Text style={styles.topText}>
          待接单
        </Text>
        <Text style={styles.topText}>
          要求时间：{info.masterOrderItems[0].serviceDate}
        </Text>
      </View>
    );
  }
  _renderAddress() {
    const { info } = this.state;
    return (
      <View>
        <View style={styles.address}>
          <Icon name="ios-aperture-outline" style={styles.leftIco} />
          <View style={styles.addressRight}>
            <View style={styles.addressTop}>
              <Text style={styles.userName}>{info.memberName}</Text>
              <TOpacity
                content={
                  <Text style={styles.mainText}>{info.memberPhone}</Text>
                }
                onPress={() => this.call(info.memberPhone)}
              />
            </View>
            <Text style={styles.mainText}>
              {info.addressName}
            </Text>
          </View>
        </View>
        <SpotLine />
      </View>
    );
  }
  _renderProduct() {
    const { info } = this.state;
    return (
      <View>
        <TitleItem
          text="服务项目"
          rightContent={
            <View style={styles.price}>
              <View style={styles.priceIcon}>
                <Icon name="ios-flame" style={styles.priceText} />
              </View>
              <Text style={styles.priceValue}>{info.amount}元</Text>
            </View>
          }
        />
        <View style={styles.mid}>
          {
            info.masterOrderItems.map((list, index) => (
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
        <View>
          <View style={styles.memo}>
            <Text style={styles.memoText}>
              用户留言：{info.buyMessage || '无'}
            </Text>
          </View>
          {
            info.orderImages.length > 0 &&
            <ImageLook images={info.orderImages.map(item => item.imgUrl)} />
          }
        </View>
      </View>
    );
  }
  _renderOrderInfo() {
    const { info } = this.state;
    return (
      <View style={styles.infoView}>
        <TitleItem
          text="订单信息"
        />
        <View style={styles.infoList}>
          <Text style={styles.infoText}>订单编号：{info.orderNumber}</Text>
          <Text style={styles.infoText}>下单时间：{info.modiDate}</Text>
        </View>
      </View>
    );
  }
  _renderFooter() {
    return (
      <Footer style={styles.footer}>
        <View style={styles.footTips}>
          {
            !global.masterId && <Text style={styles.footTipsText}>需认证为平台师傅才可接单</Text>
          }
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>{global.masterId ? '接单' : '申请接单'}</Text>
            </View>
          }
          onPress={global.masterId ? this.save : () => this.props.push({ key: 'ApplyMaster' })}
        />
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    const { info } = this.state;
    return (
      <Container>
        <Header back={pop} title="订单明细" />
        {
          info ?
            <Content>
              {this._renderTop()}
              {this._renderAddress()}
              {this._renderProduct()}
              {this._renderOrderInfo()}
            </Content>
            :
            <Content />
        }
        {this._renderFooter()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterOrderDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterOrderDetail);
