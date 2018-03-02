import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, TOpacity, Header, TitleItem, UploadFile } from '../../components';
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
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderAddress() {
    const { adsData } = this.state;
    return (
      <View>
        {
          adsData ?
            <TFeedback
              content={
                <View style={styles.address}>
                  <Icon name="ios-locate-outline" style={styles.leftIco} />
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
                  <Icon name="ios-locate-outline" style={styles.leftIco} />
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
  _renderListOne() {
    const { item, servicesPrice, detail } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务类型</Text>
          <View style={styles.listRight}>
            <View style={styles.typeColorView}>
              <View style={styles.typeColor}>
                <Text style={styles.typeText}>{item.name}</Text>
              </View>
              <View />
            </View>
          </View>
        </View>
        <View style={styles.memoView}>
          <Text style={styles.memoLabel}>服务描述</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="8个字以上的描述"
              clearButtonMode="while-editing"
              value={detail}
              onChangeText={value => this.setState({ detail: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务酬金</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="可以再议"
              clearButtonMode="while-editing"
              value={servicesPrice}
              onChangeText={value => this.setState({ servicesPrice: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderList() {
    const { closingDate } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务时间</Text>
          <View style={styles.listRight}>
            <TFeedback
              content={
                <View style={styles.chooseTime}>
                  <Text style={[styles.listText, { color: closingDate.length > 0 ? '#333' : '#999' }]}>
                    {closingDate || '请选择服务时间'}
                  </Text>
                  <Icon name="md-arrow-dropright" style={styles.arr} />
                </View>
              }
              onPress={this.toggleDate}
            />
          </View>
        </View>
        <TitleItem text="上传图片(选填)" />
        <UploadFile
          getImages={this.getImages}
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
              onPress={this.hidepopDate}
            />
          </View>
        </View>
      </Modal>
    );
  }
  _renderFooter() {
    return (
      <Footer style={styles.footer}>
        <View style={styles.footLeft} />
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>立即发布</Text>
            </View>
          }
          onPress={this.CreateNewDemandOrderService}
        />
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    const { isDateShow, maximumDate, minimumDate } = this.state;
    return (
      <Container>
        <Header back={pop} title="接单详情" />
        <Content>
          {this._renderAddress()}
          {this._renderListOne()}
          {this._renderList()}
        </Content>
        {this._renderFooter()}
        {this._renderAddressModal()}
        <DateTimePicker
          titleIOS="选择截止时间"
          confirmTextIOS="确定"
          cancelTextIOS="取消"
          is24Hour
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          isVisible={isDateShow}
          onConfirm={this.dateConfirm}
          onCancel={this.dateCancel}
        />
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
