import React from 'react';
import { View, Image, TouchableWithoutFeedback, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, TFeedback, MyModalView } from '../../components';
import { DeepClone } from '../../api';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...DeepClone(this.resetData),
    };
  }
  componentDidMount() {
    this.getData();
  }
  _renderTop() {
    const { goodsImg, infos } = this.state;
    return (
      <View style={styles.topView}>
        {
          infos.supplys &&
          infos.supplys.length > 0 ?
            <Image source={{ uri: infos.supplys[0].imgUrl }} style={styles.mainImg} />
          :
            <Image source={goodsImg} style={styles.mainImg} />
        }
        <View style={styles.toplogo}>
          <Image source={{ uri: infos.imgUrl }} style={styles.mainLogo} />
        </View>
        <View style={styles.topBtn}>
          <Icon name="arrow-back" style={styles.topIcon} />
          <Text style={styles.topText}>关注</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    const { bao, infos } = this.state;
    return (
      <View style={styles.midMainView}>
        <View style={styles.nameOneView}>
          <View style={styles.nameTextView}>
            <Icon name="arrow-back" style={styles.nameIcon} />
            <Icon name="arrow-back" style={styles.nameIcon} />
            <Text style={styles.nameText}>{infos.nickName}</Text>
          </View>
          <View style={styles.nameLabelView}>
            <Text style={styles.grayText}>{infos.identityName}</Text>
          </View>
        </View>
        <TFeedback
          content={
            <View style={styles.midMainCredit}>
              <Image source={bao} style={styles.creditImg} />
              <View style={styles.creditView}>
                <Text style={styles.creditLabel}>{infos.memoText}</Text>
              </View>
              <View style={styles.creditRight}>
                <Icon name="arrow-back" style={styles.creditRightIcon} />
              </View>
            </View>}
          onPress={() => this.rzDetail()}
        />
      </View>
    );
  }
  _renderProvideTypes() {
    const { infos } = this.state;
    return (
      <TFeedback
        content={
          <View style={styles.provideTypes}>
            <View style={styles.provideTypesLeft}>
              {
                infos.memberVerifs &&
                infos.memberVerifs.map((item, index) => (
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
    const { infos } = this.state;
    const { push } = this.props;
    const Tab = () => (
      <View>
        {
          infos.supplys.map((item, index) => (
            <View key={index}>
              <TFeedback
                content={
                  <View style={styles.goodsItem}>
                    <Image
                      style={styles.goodsImg}
                      source={{ uri: item.supplyImages[0].imgUrl }}
                    />
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
                        <Text style={styles.goodsPlace}>
                          {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                        </Text>
                        <View style={[styles.flexRow, { flexWrap: 'wrap', maxHeight: 50 }]}>
                          {
                            item.logisticsMode !== '' &&
                            item.logisticsMode.split(',').map((item3, index3) => (
                              <Text style={styles.aa} key={index3}>{item3}</Text>
                            ))
                          }
                          {
                            item.supplyMode !== '' &&
                            item.supplyMode.split(',').map((item4, index4) => (
                              <Text style={styles.aa} key={index4}>{item4}</Text>
                            ))
                          }
                          {
                            item.renderServices !== '' &&
                            item.renderServices.split(',').map((item5, index5) => (
                              <Text style={styles.aa} key={index5}>{item5}</Text>
                            ))
                          }
                        </View>
                      </View>
                      <View style={styles.goodsPriceInfo}>
                        <View>
                          <Text style={styles.price}>{item.wholesalePrice}元/{item.unit}</Text>
                        </View>
                        <View style={styles.howLongBox}>
                          <Text style={styles.howLong}>{item.beforeTime == null ? '1天前' : item.beforeTime}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                }
                onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId } }); }}
              />
            </View>
          ))
        }
      </View>
    );
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <ScrollableTabView locked renderTabBar={() => <ScrollableTab />}>
          <Tab tabLabel="供应" />
        </ScrollableTabView>
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
    const { infos } = this.state;
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
          {
            infos &&
            this._renderTop()
          }
          {this._renderNameAP()}
          {
            infos.memberVerifs &&
            this._renderProvideTypes()
          }
          {this._renderSkuTable()}
          {
            infos &&
            this._renderTabs()
          }
        </Content>
        {this._renderFooter()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
