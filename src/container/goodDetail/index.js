import React from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, ScrollView, BackHandler, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { CachedImage } from 'react-native-img-cache';
import { observer } from 'mobx-react/native';
import AutoHeightImage from 'react-native-auto-height-image';
import { popRoute, pushRoute } from '../../actions';
import { Header, GoodhList, ModalView, InputNumber, Loading, TFeedback, UserSocket, NoData, TOpacity } from '../../components';
import { Mred, deviceW, ColorList } from '../../utils';
import base from './base';
import styles from './styles';

@observer
class MainScreen extends base {
  constructor(props) {
    super(props);
    const { supplyId } = this.props.navigation.state.params;
    this.state = {
      ...this.resetData,
      supplyId,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderTop() {
    const { detail } = this.state;
    return (
      <View style={styles.topView}>
        <View style={styles.mainImgView}>
          <CachedImage source={{ uri: `${detail.supplyImages[0].imgUrl}?imageView2/1/w/420` }} style={styles.mainImg} />
        </View>
        <View style={styles.topOne}>
          <Text style={styles.topText}>{detail.beforeTime || detail.postDate}</Text>
        </View>
        <View style={styles.topTwo}>
          <Text style={styles.topText}>{detail.lookCount}人查看</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    const { detail, distance } = this.state;
    const { push } = this.props;
    const { detail: { logisticsMode, renderServices, supplyMode } } = this.state;
    let ptems = [];
    ptems = ptems.concat(logisticsMode.split(',') : [], renderServices.split(',') : [], supplyMode.split(',') : []);
    return (
      <View style={styles.nameAPView}>
        <View style={styles.nameOneView}>
          <View style={styles.nameTextView}>
            <Text style={styles.nameText} numberOfLines={2}>
              {detail.categoryName}{detail.brandName}{detail.supplyItems.map((item => item.specName)).join(' ')}
            </Text>
          </View>
          <TFeedback
            content={
              <View style={styles.nameIconView}>
                <Icon name="ios-trophy" style={styles.jcIcon} />
                <Text style={styles.grayText}>举报</Text>
              </View>}
            onPress={() => { push({ key: UserSocket.userData.memberId ? 'ReportPage' : 'User', params: { beMemberId: detail.memberId, supplyId: detail.supplyId } }); }}
          />
        </View>
        <Text numberOfLines={1} style={[styles.grayText, { flex: 1, marginLeft: 10 }]}>
          {detail.sendProvinceName}{detail.sendCityName}{detail.sendDistrictName}
        </Text>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>{detail.wholesalePrice}</Text>
          <Text style={styles.pricelabel}>元/{detail.unit}</Text>
          <View style={styles.priceLabelView}>
            <Text style={styles.priceLabelText}>{detail.wholesaleCount}{detail.unit}起批</Text>
          </View>
          <TOpacity
            style={styles.helpIcnBox}
            content={
              <Icon style={styles.helpIcn} name="help" />
            }
            onPress={() => this.setState({ visible: true })}
          />
          <Text numberOfLines={1} style={styles.positionText}>{distance}km</Text>
        </View>
        <View style={styles.nameTipsView}>
          <Icon name="md-volume-down" style={styles.nameTipsicon} />
          <View>
            <Text style={styles.grayText}>
              私自打款有风险!
              <Text style={styles.nameColorText}>了解</Text>
            </Text>
          </View>
        </View>
        <View style={[styles.provideTypes, { marginTop: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }]}>
          <View style={styles.provideTypesLeft2}>
            {
              ptems.map((item, index) => (
                  item !== '' &&
                  <View style={[styles.ptlList, { borderColor: ColorList[index > ColorList.length ? index % ColorList.length : index] }]} key={index}>
                    <Text style={styles.ptlText}>{item}</Text>
                  </View>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  _renderDynamicEval() {
    const { push } = this.props;
    const { DTgoodsScore, DTlogisticsScore, DTsellScore, memberId } = this.state;
    return (
      <TOpacity
        style={styles.flexOne}
        content={
          <View style={{ backgroundColor: '#fff', marginBottom: 10 }}>
            <View style={styles.dynamicEvalBox}>
              <Text style={styles.evalTopLabel}>动态评分</Text>
              <Icon name="md-arrow-dropright" style={styles.evalTopIcon} />
            </View>
            <View style={styles.bottomBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.bottomTopBox}>{DTgoodsScore}</Text>
                <Text style={styles.bottomText}>货品</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bottomTopBox}>{DTsellScore}</Text>
                <Text style={styles.bottomText}>卖家服务</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.bottomTopBox}>{DTlogisticsScore}</Text>
                <Text style={styles.bottomText}>物流服务</Text>
              </View>
            </View>
          </View>
        }
        onPress={() => push({ key: 'DynamicEval', params: { memberId } })}
      />
    );
  }
  _renderEval() {
    const { push } = this.props;
    const { detail, thinkCount } = this.state;
    return (
      <View>
        {
          thinkCount !== 0 &&
          <TouchableWithoutFeedback onPress={() => push({ key: 'EvalList', params: { thinkInfo: detail.supplyEvaluats } })}>
            <View style={styles.evalView}>
              <View style={styles.evalViewTop}>
                <Text style={styles.evalTopLabel}>评价</Text>
                <View style={styles.evalTopRight}>
                  <Text style={styles.evalTopText}>
                    查看<Text style={styles.evalTopColor}>{thinkCount}</Text>条评价
                  </Text>
                  <Icon name="md-arrow-dropright" style={styles.evalTopIcon} />
                </View>
              </View>
              {
                detail.supplyEvaluats[0] &&
                <View style={styles.evalViewBom}>
                  <Text style={styles.evalMainText}>{detail.supplyEvaluats[0].content}</Text>
                  <View style={styles.evalMain}>
                    <View style={styles.evalMainLeft}>
                      <StarRating
                        disabled
                        starSize={16}
                        emptyStar={'ios-star-outline'}
                        fullStar={'ios-star'}
                        halfStar={'ios-star-half'}
                        iconSet={'Ionicons'}
                        starColor={Mred}
                        maxStars={5}
                        rating={parseFloat(detail.supplyEvaluats[0].starLevel)}
                      />
                      <Text style={styles.evalMainCount}>
                        购买数量：x{detail.supplyEvaluats[0].buyCount}
                      </Text>
                    </View>
                    <Text style={styles.evalMainName}>{detail.supplyEvaluats[0].memberName}</Text>
                  </View>
                </View>
              }
            </View>
          </TouchableWithoutFeedback>
        }
      </View>
    );
  }
  _renderSkuTable() {
    const { detail: { supplyItems } } = this.state;
    const skusLabel = [];
    supplyItems.forEach((item) => {
      skusLabel.push(item.specTypeName);
      skusLabel.push(item.specName);
    });
    return (
      <View style={styles.skuTable}>
        <View style={styles.skuTableTitle}>
          <Text style={styles.skuTableTitleText}>货品规格</Text>
        </View>
        <View style={styles.stTabelView}>
          {
            skusLabel.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.stLabelView : styles.stTextView}>
                <Text style={styles.skuTableText}>{item}</Text>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  _renderStore() {
    const { push } = this.props;
    const { detail, memberId, goodsScore, sellGoodsCount, memo, realName } = this.state;
    return (
      <View style={styles.storeView}>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'StoreDetail', params: { memberId } }); }}>
          <View>
            <View style={styles.storeViewTop}>
              <View style={styles.storeLeft}>
                <CachedImage source={{ uri: `${detail.member.imgUrl}?imageView2/1/w/50` }} style={styles.storeImg} />
                <View style={styles.storeLeftView}>
                  <Text style={styles.storeImgText}>{detail.member.identityName}</Text>
                </View>
              </View>
              <View style={styles.storeMid}>
                <View style={[styles.storeMidName, { marginBottom: 6 }]}>
                  <Icon name="ios-ribbon" style={styles.storeMidIcon} />
                  <View>
                    <Text numberOfLines={1} style={styles.storeMidNameText}>{detail.member.nickName}</Text>
                    {
                      realName !== '' &&
                      <Text style={styles.storeMidNameTextReal}>(真实姓名：{realName})</Text>
                    }
                  </View>
                </View>
                {
                  memo !== '' &&
                  <View style={styles.baozhangBox}>
                    <View style={styles.leftBox}>
                      <Text style={styles.storeMidTextLeft}>买家</Text>
                      <Text style={styles.storeMidTextLeft}>保障</Text>
                    </View>
                    <View style={styles.rightBox}>
                      <Text style={styles.storeMidText}>
                        {memo}
                      </Text>
                      <Text style={styles.storeMidText}>延时发货,货不对板可赔付</Text>
                    </View>
                    <View style={{ flex: 1 }} />
                  </View>
                }
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', color: '#333', fontSize: 14 }}>{sellGoodsCount + 1}</Text>
                <Text style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>全部商品</Text>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', borderLeftWidth: 1, borderLeftColor: '#eee' }}>
                <Text style={{ textAlign: 'center', color: '#333', fontSize: 14 }}>{goodsScore}</Text>
                <Text style={{ textAlign: 'center', color: '#666', fontSize: 14 }}>综合评分</Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {
          !detail.member.personVerifStatus === '1' ?
            <View style={styles.noIdView}>
              <Text style={styles.noIdText}>
                该卖家未实名认证，交易风险较高，请谨慎交易
              </Text>
            </View>
            :
            <View style={styles.storeViewBottom}>
              <View style={styles.provideTypesLeft}>
                {
                  detail.member.memberVerifs &&
                  detail.member.memberVerifs.map((item, index) => (
                    <View key={index} style={[styles.ptlList, { borderColor: '#ddd' }]}>
                      <CachedImage
                        source={{ uri: `${item.verifFieldLogo}?imageView2/1/w/16` }}
                        style={styles.logoImg}
                      />
                      <Text style={styles.ptlText}>{item.verifFieldName}</Text>
                    </View>
                  ))
                }
              </View>
              {/* <Icon name="md-arrow-dropright" style={styles.ptrIcon} /> */}
            </View>
        }
        <TFeedback
          content={
            <View style={styles.storeRight}>
              <Text style={styles.storeRightText}>进店铺</Text>
            </View>}
          onPress={() => { push({ key: UserSocket.userData.memberId ? 'StoreDetail' : 'User', params: { memberId } }); }}
        />
      </View>
    );
  }
  _renderTabs() {
    const { detail, isTabOne } = this.state;
    const Tab1 = () => (
      <View style={styles.detialView}>
        <Text style={styles.detialLabel}>{detail.memo}</Text>
        {
          detail.supplyImages.map((item, index) => (
            <View key={index} style={styles.detialImg}>
              <AutoHeightImage
                width={deviceW - 20}
                imageURL={item.imgUrl}
              />
            </View>
          ))
        }
        <Text style={styles.detialLabel}>发布时间：{detail.postDate}</Text>
      </View>
    );
    const Tab2 = () => (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          detail.otherSupplys.length > 0 ?
          detail.otherSupplys.map((item, index) => (
            <GoodhList
              count={2}
              data={item}
              key={index}
              onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
            />
          ))
          :
          <View style={styles.noDataBox}>
            <NoData
              label="没有相关数据"
            />
          </View>
        }
      </View>
    );
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee' }]}>
          <TFeedback
            content={
              <View style={[styles.tabView, isTabOne === 1 ? styles.textBorder : '']}>
                <Text style={[styles.tabText, isTabOne === 1 ? styles.tabTextChoose : '']}>图文详情</Text>
              </View>}
            onPress={() => this.tabChange(1)}
          />
          <TFeedback
            content={
              <View style={[styles.tabView, isTabOne !== 1 ? styles.textBorder : '']}>
                <Text style={[styles.tabText, isTabOne !== 1 ? styles.tabTextChoose : '']}>他还供应</Text>
              </View>}
            onPress={() => this.tabChange(2)}
          />
        </View>
        <View>
          {
            isTabOne === 1 ?
              <Tab1 type="1" />
            :
              <Tab2 type="2" />
          }
        </View>
      </View>
    );
  }
  _renderFooter() {
    const { haveCollect } = this.state;
    return (
      <Footer>
        <TOpacity
          style={styles.fotBtn1}
          content={
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name="heart" style={[styles.fotChatIcon, haveCollect ? styles.tabTextChoose : '']} />
              <Text style={[styles.fotChatText, haveCollect ? styles.tabTextChoose : '']}>
                { haveCollect ? '已收藏' : '收藏'}
              </Text>
            </View>
          }
          onPress={() => this.keepGoods()}
        />
        <View style={styles.fotBtn1}>
          <Icon name="chatboxes" style={styles.fotChatIcon} />
          <Text style={styles.fotChatText}>聊生意</Text>
        </View>
        <TFeedback
          content={
            <View style={styles.fotBtn2}>
              <Text style={styles.fotText}>打电话</Text>
            </View>}
          onPress={() => { this.tellPhone(); }}
        />
        <TouchableOpacity style={styles.fotBtn3} onPress={this.openBuyMasker}>
          <Text style={styles.fotText}>立即购买</Text>
        </TouchableOpacity>
      </Footer>
    );
  }
  renderModal() {
    return (
      <View>
        <Modal
          visible={this.state.visible}
          transparent={this.state.transparent}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <TFeedback
            content={
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
              >
                <TFeedback
                  content={
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <View style={styles.modalBox}>
                        <View style={styles.modalTitleBox}>
                          <Text numberOfLines={1} style={styles.modalTitleText}>参考价中不包含运费</Text>
                        </View>
                        <Text style={styles.introduceText}>
                          交易前请先使用"聊生意"或"打电话"和卖家沟通，确认好运输方式和运费
                        </Text>
                        <TFeedback
                          content={
                            <View style={styles.submitBox}>
                              <Text style={styles.submitText}>知道了</Text>
                            </View>}
                          onPress={() => { this.setState({ visible: false }); }}
                        />

                      </View>
                      <TFeedback
                        content={
                          <View style={styles.deleteBtnBox}>
                            <Icon style={{ fontSize: 18, color: '#333', textAlign: 'center' }} name="close" />
                          </View>
                          }
                        onPress={() => { this.setState({ visible: false }); }}
                      />
                    </View>
                  }
                  onPress={() => { console.log('modal'); }}
                />
              </View>}
            onPress={() => { this.setState({ visible: false }); }}
          />
        </Modal>
      </View>
    );
  }
  _renderModalView() {
    const { skuCount, detail } = this.state;
    const content = (
      <View style={styles.maskerContent}>
        <View style={styles.maskerTop}>
          <View style={styles.maskerLeft}>
            <CachedImage source={{ uri: `${detail.supplyImages[0].imgUrl}?imageView2/1/w/70` }} style={styles.maskerImg} />
          </View>
          <View style={styles.maskerLabel}>
            <View style={styles.maskerTitle}>
              <Text style={styles.nameText} numberOfLines={2}>
                {detail.categoryName}{detail.brandName}
              </Text>
            </View>
            <View style={styles.maskerPrice}>
              <Text style={styles.maskerPriceText}>{detail.wholesalePrice}</Text>
              <Text style={styles.maskerPriceText}>元/{detail.unit}</Text>
            </View>
          </View>
        </View>
        <View style={styles.maskerNumView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.maskerNumText}>购买数量</Text>
          </View>
          <InputNumber
            onChange={count => this.setState({ skuCount: count })}
            value={skuCount}
            min={1}
          />
          <Text style={styles.maskerNumText}>{detail.unit}</Text>
        </View>
        <View style={styles.maskerBom}>
          <Text style={styles.maskerBomPrice}>
            合计：{(skuCount * detail.wholesalePrice).toFixed(2)}元
          </Text>
          <TFeedback
            content={
              <View style={styles.maskerBomBtn}>
                <Text style={styles.maskerBomText}>购买</Text>
              </View>}
            onPress={this.enterOrderDetail}
          />
        </View>
      </View>
    );
    return (
      <ModalView
        ref={(o) => { this.ModalView = o; }}
        title={'商品数量'}
        content={content}
        onConfirm={() => console.log(111)}
      />
    );
  }
  render() {
    const { pop } = this.props;
    const { detail, DTgoodsScore, DTsellScore, DTlogisticsScore } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="供应详情"
        />
        {
          detail &&
          <ScrollView
            style={{ flex: 1 }}
          >
            {this._renderTop()}
            {this._renderNameAP()}
            {this._renderEval()}
            {
              (DTgoodsScore !== '--' || DTsellScore !== '--' || DTlogisticsScore !== '--') &&
              this._renderDynamicEval()
            }
            {this._renderStore()}
            {detail.supplyItems && this._renderSkuTable()}
            {this._renderTabs()}
            {this._renderModalView()}
          </ScrollView>
        }
        {detail && this._renderFooter()}
        {this.renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
