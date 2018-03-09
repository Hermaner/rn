import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, TOpacity, Header, TitleItem, GoodItem, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class CreateConfirm extends base {
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
    this.deleteInit();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderAddress() {
    const { adsData } = this.state;
    return (
      <View>
        {
          adsData ?
            <TFeedback
              content={
                <View style={styles.address}>
                  <Icon name="ios-pin-outline" style={styles.locIcon} />
                  <View style={styles.addressRight}>
                    <View style={styles.addressTop}>
                      <Text style={styles.userName}>{decodeURI(adsData.nickName)}</Text>
                      <Text style={styles.phone}>{adsData.phone}</Text>
                    </View>
                    <Text style={styles.userAddress}>
                      {adsData.provinceName}
                      {adsData.cityName}
                      {adsData.districtName}
                      {adsData.address}
                    </Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={this.showAds}
            />
            :
            <TFeedback
              content={
                <View style={styles.address}>
                  <Icon name="ios-pin-outline" style={styles.locIcon} />
                  <View style={styles.addressRight}>
                    <Text style={styles.userAddress}>
                      点击添加服务地址
                    </Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={this.showAds}
            />
        }
      </View>

    );
  }
  _renderItems() {
    const { items } = this.state;
    return (
      <View>
        <TitleItem text="服务项目" />
        {
          items.map((item, index) => (
            <GoodItem item={item} index={index} key={index} backChange={this.backChange} />
          ))
        }
      </View>

    );
  }
  _renderList() {
    const { initImages, amount, buyMessage, appointDate } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务时间</Text>
          <View style={styles.listRight}>
            <TOpacity
              content={
                <View style={styles.chooseTime}>
                  <Text style={styles.listText}>
                    {appointDate || '请选择服务时间'}
                  </Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={this.showPopDate}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务费用</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>{amount}元</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>备注</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="其他备注"
              clearButtonMode="while-editing"
              value={buyMessage}
              onChangeText={value => this.setState({ buyMessage: value })}
            />
          </View>
        </View>
        <TitleItem text="上传图片" />
        <UploadFile
          initImages={initImages}
          getImages={this.getImages}
          label="(选填)最多上传10张照片(可不传)"
          imageCount={10}
        />
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
                          <Text style={styles.userName}>{decodeURI(item.nickName)}</Text>
                          <Text style={styles.phone}>{item.phone}</Text>
                        </View>
                        <Text style={styles.userAddress}>
                          {item.provinceName}{item.cityName}{item.districtName}{item.address}
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
  _renderModal() {
    const { isDtShow, popDates, popTimes, dayIndex } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        entry="top"
        animationDuration={300}
        onClosed={this.hidepopDate}
        isOpen={isDtShow}
        coverScreen
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={styles.popDate}>
            <Text style={styles.modalTitle}>选择日期</Text>
            <View style={styles.popDay}>
              {
                popDates.map((item, index) => (
                  <TOpacity
                    key={index}
                    style={styles.dtlister}
                    content={
                      <View
                        style={[styles.dtlist,
                          index === 0 &&
                          popDates[0].disabled &&
                          styles.dtlistDisable,
                          item.cur && styles.dtlistCur]}
                      >
                        <Text style={[styles.dtlabel, item.cur && styles.dtlabelCur]}>
                          {item.day}
                        </Text>
                        <Text style={[styles.dtlabel, item.cur && styles.dtlabelCur]}>
                          {item.label}
                        </Text>
                      </View>
                    }
                    onPress={() => { this.dayTab(index); }}
                  />
                ))
              }
            </View>
            <Text style={styles.modalTitle}>选择时间段</Text>
            <View style={styles.popPm}>
              {
                popTimes.map((item, index) => (
                  <TOpacity
                    key={index}
                    style={styles.dtpmlister}
                    content={
                      <View
                        style={[
                          styles.dtlist,
                          dayIndex === 0 && popTimes[index].disabled &&
                          styles.dtlistDisable,
                          item.cur && styles.dtlistCur]}
                      >
                        <Text style={[styles.dtlabel, item.cur && styles.dtlabelCur]}>
                          {item.day}
                        </Text>
                        <Text style={[styles.dtlabel, item.cur && styles.dtlabelCur]}>
                          {item.label}
                        </Text>
                      </View>
                    }
                    onPress={() => { this.timeTab(index); }}
                  />
                ))
              }
            </View>
            <Text style={styles.dttips}>所有时间以师傅实际时间为准，请提前2小时预约</Text>
          </View>
          <View style={styles.modalBtns}>
            <TOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              content={
                <View>
                  <Text style={styles.modalText}>取消</Text>
                </View>
              }
              onPress={this.hidepopDate}
            />
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>确认</Text>
                </View>
              }
              onPress={this.savePopDate}
            />
          </View>
        </View>
      </Modal>
    );
  }
  _renderFooter() {
    const { amount, ruleInfo } = this.state;
    return (
      <Footer style={styles.footer}>
        <View style={styles.footLeft}>
          <View style={styles.footPriceView}>
            <Text style={styles.footPriceLabel}>待支付</Text>
            <Text style={styles.footPrice}>
              {amount}元
            </Text>
          </View>
          {
            ruleInfo && <Text style={styles.footTips}>{ruleInfo.name}</Text>
          }
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>立即购买</Text>
            </View>
          }
          onPress={this.createOrder}
        />
      </Footer>
    );
  }
  render() {
    const { popDates } = this.state;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="接单详情" />
        <Content>
          {this._renderAddress()}
          {this._renderItems()}
          {this._renderList()}
        </Content>
        {this._renderFooter()}
        {this._renderAddressModal()}
        {popDates && this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CreateConfirm.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CreateConfirm);
