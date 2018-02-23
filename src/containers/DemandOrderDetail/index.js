import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, TOpacity, Header, ImageLook } from '../../components';
import base from './base';
import styles from './styles';

class DemandOrderDetail extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderAddress() {
    const { item } = this.state;
    return (
      <View style={styles.address}>
        <CachedImage source={{ uri: item.memberInfo.imgUrl }} style={styles.userImg} />
        <View style={styles.addressRight}>
          <Text style={styles.userName}>{decodeURI(item.memberInfo.nickName)}</Text>
          <Text style={styles.userAddress}>
            {item.provinceName}{item.cityName}{item.districtName}{item.address}
          </Text>
        </View>
      </View>
    );
  }
  _renderList() {
    const { item } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务详情</Text>
          <View style={styles.listRight}>
            <View style={styles.listType}>
              <View style={styles.listTypeBg}>
                <Text style={styles.listTypeName}>
                  {item.demandCategoryName}
                </Text>
              </View>
              <View style={styles.price}>
                <View style={styles.priceIcon}>
                  <Icon name="logo-usd" style={styles.priceText} />
                </View>
                <Text style={styles.priceValue}>{item.servicesPrice ? `${item.servicesPrice}元` : '再议'}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务详情</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>{item.detail}</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>截止时间</Text>
          <View style={styles.listRight}>
            <Text style={styles.listText}>{item.closingDate.substr(0, 10)}</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>图片详情</Text>
          <View style={styles.listRight}>
            {
              item.demandOrderImages && item.demandOrderImages.length > 0 ?
                <ImageLook images={item.demandOrderImages} />
                :
                <Text style={styles.listText}>发起人没有上传相关图片</Text>
            }
          </View>
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
          onPress={global.masterId ? this.openModal : this.openModal}
        />
      </Footer>
    );
  }
  _renderModal() {
    const { ModalOpen, price, message } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="bottom"
        entry="bottom"
        animationDuration={250}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>申请信息</Text>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.modalListView}>
              <Text style={styles.memoLabel}>期望薪酬</Text>
              <View style={styles.modalListRight}>
                <Input
                  style={styles.listInput}
                  placeholderTextColor="#999"
                  placeholder="输入期望薪酬"
                  keyboardType="numeric"
                  clearButtonMode="while-editing"
                  value={price}
                  onChangeText={value => this.setState({ price: value })}
                />
              </View>
            </View>
            <View style={styles.memoView}>
              <Text style={styles.memoLabel}>补充信息</Text>
              <View style={styles.memoInput}>
                <Input
                  multiline
                  autoFocus
                  style={styles.listMemo}
                  placeholderTextColor="#999"
                  placeholder="输入补充信息"
                  clearButtonMode="while-editing"
                  value={message}
                  onChangeText={value => this.setState({ message: value })}
                />
              </View>
            </View>
          </View>
          <View style={styles.modalBtns}>
            <TOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              content={
                <View>
                  <Text style={styles.modalText}>取消</Text>
                </View>
              }
              onPress={this.closeModal}
            />
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>确认</Text>
                </View>
              }
              onPress={this.CreateDemandOrderBiddingService}
            />
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="接单详情" />
        <Content>
          {this._renderAddress()}
          {this._renderList()}
        </Content>
        {this._renderFooter()}
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DemandOrderDetail.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandOrderDetail);
