import React from 'react';
import { View, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, MyModalView, Loading } from '../../components';
import base from './base';
import styles from './styles';

import Child from './child';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderTop() {
    const { goodsImg, userInfo, goodsItems } = this.state;
    return (
      <View style={styles.topView}>
        {
          goodsItems &&
          // goodsItems[0].supplyImages.length > 0 ?
            // <Image
            //   source={{ uri: goodsItems[0].supplyImages[0].imgUrl }}
            //   style={styles.mainImg}
            // />
          // :
            <Image source={goodsImg} style={styles.mainImg} />
        }
        <View style={styles.toplogo}>
          <Image source={{ uri: userInfo.imgUrl }} style={styles.mainLogo} />
        </View>
        <View style={styles.topBtn}>
          <Icon name="arrow-back" style={styles.topIcon} />
          <Text style={styles.topText}>关注</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    const { bao, userInfo } = this.state;
    return (
      <View style={styles.midMainView}>
        <View style={styles.nameOneView}>
          <View style={styles.nameTextView}>
            {
              userInfo.memberVerifs > 0 &&
              userInfo.memberVerifs.map((item, index) => (
                <Icon key={index} name={item.verifFieldLogo} style={styles.nameIcon} />
              ))
            }
            <Text style={styles.nameText}>{userInfo.nickName}</Text>
          </View>
          <View style={styles.nameLabelView}>
            <Text style={styles.grayText}>{userInfo.identityName}</Text>
          </View>
        </View>
        <TFeedback
          content={
            <View style={styles.midMainCredit}>
              <Image source={bao} style={styles.creditImg} />
              <View style={styles.creditView}>
                <Text style={styles.creditLabel}>{userInfo.memoText}</Text>
              </View>
              <View style={styles.creditRight}>
                <Icon name="play" style={styles.creditRightIcon} />
              </View>
            </View>}
          onPress={() => this.rzDetail()}
        />
      </View>
    );
  }
  _renderProvideTypes() {
    const { userInfo } = this.state;
    return (
      <TFeedback
        content={
          <View style={styles.provideTypes}>
            <View style={styles.provideTypesLeft}>
              {
                userInfo.memberVerifs &&
                userInfo.memberVerifs.map((item, index) => (
                  <View style={styles.ptlList} key={index}>
                    <Icon name="checkmark" style={styles.ptlIcon} />
                    <Text style={styles.ptlText}>{item.verifFieldName}</Text>
                  </View>
                ))
              }
            </View>
            <Icon name="play" style={styles.ptrIcon} />
          </View>}
        onPress={() => this.rzDetail()}
      />
    );
  }
  _renderSkuTable() {
    const data = ['认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司', '认证身份', '公司'];
    const imageData = [{
      imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
      name: '产品照片',
    }, {
      imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
      name: '产品照片',
    }, {
      imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
      name: '产品照片',
    }, {
      imgUrl: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600',
      name: '产品照片',
    }];
    const { certifIndex, isCertifShow, imageViewData } = this.state;
    return (
      <View style={styles.skuTable}>
        <View style={styles.skuTableTitle}>
          <Text style={styles.skuTableTitleText}>实地认证</Text>
        </View>
        <View style={styles.stTabelView}>
          {
            data.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.stLabelView : styles.stTextView}>
                <Text style={styles.skuTableText}>{item}</Text>
              </View>
            ))
          }
        </View>
        <View style={styles.certifView}>
          {
            imageData.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.showCertifImage(index, imageData)}
              >
                <View style={styles.certifList}>
                  <Image source={{ uri: 'https://img.static.sunhousm.cn/avatar_female.png' }} style={styles.certifImg} />
                  <Text style={styles.certifText}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <Modal
          visible={isCertifShow}
          transparent
        >
          <ImageViewer
            imageUrls={imageViewData}
            index={certifIndex}
            onClick={() => this.setState({ isCertifShow: false })}
          />
        </Modal>
      </View>
    );
  }
  _renderTabs() {
    const { memberId } = this.props.navigation.state.params;
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <View style={styles.flexOne}>
          <View style={[styles.flexOne, styles.textBorder]}>
            <Text style={styles.tabText}>优质商家</Text>
          </View>
        </View>
        <Child member={memberId} />
      </View>
    );
  }
  _renderModalView() {
    const content = (
      <View style={styles.maskerContent}>
        <View style={styles.row}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.circle} />
            <View>
              <Text style={styles.listTitle}>服务说明</Text>
              <View style={styles.flexRow}>
                <Text style={styles.listLabel}>保证金</Text>
                <TFeedback
                  content={
                    <Text style={styles.listLabelRight}>
                      商家交付给平台，用来保证诚信交易,不欺骗买家的押金。
                    </Text>}
                  onPress={() => this.listPush()}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <MyModalView
        ref={(o) => { this.ModalView = o; }}
        title={'服务说明'}
        content={content}
        onConfirm={() => console.log(111)}
      />
    );
  }
  _renderFooter() {
    return (
      <Footer>
        <View style={styles.fotBtn1}>
          <Icon name="heart" style={styles.fotChatIcon} />
          <Text style={styles.fotChatText}>关注</Text>
        </View>
        <View style={styles.fotBtn2}>
          <Text style={styles.fotText}>聊生意</Text>
        </View>
        <View style={styles.fotBtn3}>
          <Text style={styles.fotText}>打电话</Text>
        </View>
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    const { userInfo, goodsItems } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="店铺详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderTop()}
          {this._renderNameAP()}
          {
            userInfo.memberVerifs &&
            this._renderProvideTypes()
          }
          {this._renderSkuTable()}
          {this._renderTabs()}
        </Content>
        {
          goodsItems &&
          this._renderFooter()
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
