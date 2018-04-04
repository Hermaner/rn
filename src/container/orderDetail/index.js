import React from 'react';
import { View, BackHandler } from 'react-native';
import Modal from 'react-native-modalbox';
import { CachedImage } from 'react-native-img-cache';
import { Container, Content, Icon, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, InputNumber, Header, TFeedback, TOpacity } from '../../components';
import { pushRoute, popRoute } from '../../actions';
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
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.getDelete();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { push } = this.props;
    const {
      skuCount,
      label,
      labelLength,
      supplyInfo,
      tu,
      renderServicesItems,
      logisticsModeItems,
      supplyModeItems,
      defaultAds,
      } = this.state;
    return (
      <View style={styles.pagebody}>
        {
          defaultAds ?
            <TFeedback
              content={
                <View style={styles.firstBox}>
                  <View>
                    <Icon name="pin" style={styles.leftIcn} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.addNameLine}>
                      <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>{defaultAds.name}</Text>
                      <Text style={{ fontSize: 16, color: '#333' }}>{ defaultAds.phone}</Text>
                    </View>
                    <Text style={styles.sixText}>
                      {defaultAds.receiveProvinceName}
                      {defaultAds.receiveCityName}
                      {defaultAds.receiveDistrictName}
                    </Text>
                  </View>
                  <View>
                    <Icon name="md-arrow-dropright" style={styles.rightIcn} />
                  </View>
                </View>}
              onPress={this.showAds}
            />
            :
            <TFeedback
              content={
                <View style={styles.firstBox}>
                  <Text style={{ flex: 1, fontSize: 16, color: '#333' }}>点击添加地址</Text>
                  <Icon name="md-arrow-dropright" style={styles.rightIcn} />
                </View>}
              onPress={() => { push({ key: 'MyAddressCreate', params: { type: 'getEmitAdress' } }); }}
            />
        }
        <CachedImage source={require('../../assets/img/11.png')} style={styles.storeImg} />
        <View style={{ marginTop: 10 }}>
          <TFeedback
            content={
              <View style={styles.mai}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 14, color: '#666', marginRight: 10 }}>卖家: {supplyInfo.nickName}</Text>
                </View>
              </View>}
            // onPress={() => { push({ key: 'StoreDetail',
            // params: { memberId: supplyInfo.memberId } }); }}
          />
          <TFeedback
            content={
              <View style={styles.goodsInfo}>
                {
                  supplyInfo.supplyImages !== '' && supplyInfo.supplyImages !== null && supplyInfo.supplyImages.length > 0 ?
                    <CachedImage
                      source={{ uri: `${supplyInfo.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
                      style={styles.goodsImg}
                    />
                  :
                    <CachedImage style={styles.goodsImg} source={tu} />
                }
                <View style={styles.goodsNameBox}>
                  <Text style={{ flex: 1, fontSize: 14, color: '#333' }}>{supplyInfo.brandName}{supplyInfo.categoryName}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 14, color: Mcolor }}>
                      {supplyInfo.wholesalePrice}</Text>
                    <Text style={{ fontSize: 14, color: Mcolor }}>
                      元/{supplyInfo.unit}</Text>
                  </View>
                </View>
              </View>}
            onPress={() => { push({ key: 'GoodDetail', params: { supplyId: supplyInfo.supplyId, memberId: supplyInfo.memberId } }); }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          <View style={styles.flexRowInfo}>
            <Text style={styles.titleText}>数量</Text>
            <View>
              <InputNumber
                onChange={count => this.setState({ skuCount: count })}
                value={skuCount}
                min={1}
              />
            </View>
          </View>
          {
            (renderServicesItems.length > 0 || logisticsModeItems.length > 0 || supplyModeItems.length > 0) &&
            <View style={styles.flexRowInfo}>
              <View style={[styles.flexRow, { flex: 1 }]}>
                <Text style={{ fontSize: 16, color: '#333', marginRight: 2 }}>服务方式</Text>
                <Text style={{ fontSize: 16, color: '#666' }}>(非必填)</Text>
              </View>
            </View>
          }
          <View style={styles.typeChoose}>
            <View style={styles.typeChooseBox}>
              {
                supplyInfo.renderServices !== '' && supplyInfo.renderServices !== null &&
                <View>
                  <View style={styles.typeView}>
                    <Text style={styles.typeText}>提供服务</Text>
                  </View>
                  <View style={styles.logsView}>
                    {
                      renderServicesItems.map((item, index) => (
                        <TOpacity
                          style={[styles.logsList, item.cur && styles.logsListCur]}
                          key={index}
                          content={
                            <Text style={[styles.logsListText, item.cur && styles.logsListTextCur]}>
                              {item.title}
                            </Text>
                          }
                          onPress={() => this.tabSer(index)}
                        />
                      ))
                    }
                  </View>
                </View>
              }
            </View>
            <View style={styles.typeChooseBox}>
              {
                supplyInfo.logisticsMode !== '' && supplyInfo.logisticsMode !== null &&
                <View>
                  <View style={styles.typeView}>
                    <Text style={styles.typeText}>物流方式</Text>
                  </View>
                  <View style={styles.logsView}>
                    {
                      logisticsModeItems.map((item, index) => (
                        <TOpacity
                          style={[styles.logsList, item.cur && styles.logsListCur]}
                          key={index}
                          content={
                            <Text style={[styles.logsListText, item.cur && styles.logsListTextCur]}>
                              {item.title}
                            </Text>
                          }
                          onPress={() => this.tabLog(index)}
                        />
                      ))
                    }
                  </View>
                </View>
              }
            </View>
            <View style={[styles.typeChooseBox, { paddingBottom: 10 }]}>
              {
                supplyInfo.supplyMode !== '' && supplyInfo.supplyMode !== null &&
                <View>
                  <View style={styles.typeView}>
                    <Text style={styles.typeText}>供货模式</Text>
                  </View>
                  <View style={styles.logsView}>
                    {
                      supplyModeItems.map((item, index) => (
                        <TOpacity
                          style={[styles.logsList, item.cur && styles.logsListCur]}
                          key={index}
                          content={
                            <Text style={[styles.logsListText, item.cur && styles.logsListTextCur]}>
                              {item.title}
                            </Text>
                          }
                          onPress={() => this.tabSup(index)}
                        />
                      ))
                    }
                  </View>
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
  _renderAddressModal() {
    const { isAdsShow, adsItems } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        entry="top"
        animationDuration={300}
        onClosed={this.hideAds}
        isOpen={isAdsShow}
        coverScreen
        ref={(o) => { this.ModaladsView = o; }}
      >
        <View style={styles.addressmodalView}>
          <View style={styles.popDate}>
            {
              adsItems.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={[styles.address, styles.addressList]}>
                      <View style={styles.addressRight}>
                        <View style={styles.addressTop}>
                          <Text style={styles.userName}>{item.name}</Text>
                          <Text style={styles.phone}>{item.phone}</Text>
                        </View>
                        <Text style={styles.userAddress}>
                          {item.receiveProvinceName}{item.receiveCityName}
                          {item.receiveDistrictName}{item.fullAddress}
                        </Text>
                      </View>
                      <Icon name="md-arrow-dropright" style={styles.arr} />
                    </View>
                  }
                  onPress={() => { this.selectAddress(item); }}
                />
              ))
            }
          </View>
          <View style={styles.modalBtns}>
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>添加新地址</Text>
                </View>
              }
              onPress={this.createAddress}
            />
          </View>
        </View>
      </Modal>
    );
  }
  renderFooter() {
    const { supplyInfo, skuCount } = this.state;
    return (
      <View style={[styles.flexRow, { backgroundColor: '#f8f8f8' }]}>
        <Text style={{ marginLeft: 10, flex: 1, fontSize: 15, color: Mcolor }}>
          总金额￥{ (skuCount * supplyInfo.wholesalePrice).toFixed(2) }</Text>
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
          <View>
            {
              supplyInfo &&
              this._renderBody()
            }
          </View>
        </Content>
        {this._renderAddressModal()}
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
