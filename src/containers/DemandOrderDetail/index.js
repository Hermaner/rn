import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content, Footer } from 'native-base';
import { connect } from 'react-redux';
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
        <Image source={{ uri: item.memberInfo.imgUrl }} style={styles.userImg} />
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
  _renderModal() {
    const { ModalOpen, popItems, twoItems, oneIndex } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        entry="top"
        animationDuration={300}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        coverScreen
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalTitle}>选择类目</Text>
            <View style={styles.modalList}>
              {
                popItems.map((item, index) => (
                  <TFeedback
                    key={index}
                    content={
                      <View style={[styles.modalItem, item.cur && styles.modalItemCur]}>
                        <Text style={[styles.modalItemText, item.cur && styles.modalItemTextCur]}>
                          {item.name}
                        </Text>
                      </View>
                    }
                    onPress={() => { this.tabOneItem(index); }}
                  />
                ))
              }
            </View>
            {
              oneIndex !== undefined &&
              <View>
                <Text style={styles.modalTitle}>选择产品类型</Text>
                <View style={styles.modalList}>
                  {
                    twoItems.map((item, index) => (
                      <TFeedback
                        key={index}
                        content={
                          <View style={[styles.modalItem, item.cur && styles.modalItemCur]}>
                            <Text
                              style={[styles.modalItemText, item.cur && styles.modalItemTextCur]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        }
                        onPress={() => { this.tabTwoItem(index); }}
                      />
                    ))
                  }
                </View>
              </View>
            }
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
              onPress={this.closeModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
  _renderFooter() {
    const { masterId } = this.state;
    return (
      <Footer style={styles.footer}>
        <View style={styles.footTips}>
          <Text style={styles.footTipsText}>需认证为平台师傅才可接单</Text>
        </View>
        <TOpacity
          style={styles.footBtn}
          content={
            <View style={styles.footBtnView}>
              <Text style={styles.footBtnText}>申请接单</Text>
            </View>
          }
          onPress={this.createService}
        />
      </Footer>
    );
  }
  render() {
    const { popItems } = this.state;
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="接单详情" />
        <Content>
          {this._renderAddress()}
          {this._renderList()}
        </Content>
        {this._renderFooter()}
        {popItems && this._renderModal()}
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
