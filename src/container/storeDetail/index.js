import React from 'react';
import { View, TouchableWithoutFeedback, Modal, BackHandler, ScrollView, RefreshControl } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import StarRating from 'react-native-star-rating';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, MyModalView, Loading, LoadMore, LoadNoMore, ImageLook, TOpacity } from '../../components';
import base from './base';
import { Mred } from '../../utils';
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
    const { userInfo, isFollow } = this.state;
    console.log('JJJJJJJJJJJJJJJ', isFollow);
    return (
      <View style={styles.topView}>
        <View style={styles.mainImgView}>
          {
            userInfo.homeImgUrls &&
              <CachedImage
                source={{ uri: `${userInfo.homeImgUrls}?imageView2/1/w/420` }}
                style={styles.mainImg}
              />
          }
        </View>
        <View style={styles.toplogo}>
          <CachedImage source={{ uri: `${userInfo.imgUrl}?imageView2/1/w/60` }} style={styles.mainLogo} />
        </View>
        <TFeedback
          content={
            <View style={styles.topBtn}>
              {
                isFollow ?
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="heart" style={[styles.topIcon, styles.topIcon1]} />
                    <Text style={styles.topText}>已关注</Text>
                  </View>
                :
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name="heart" style={styles.topIcon} />
                    <Text style={styles.topText}>关注</Text>
                  </View>
              }
            </View>}
          onPress={() => { this.CreateMemberFollowService(); }}
        />
      </View>
    );
  }
  _renderNameAP() {
    const { bao, userInfo, realName } = this.state;
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
            <View>
              <Text style={styles.nameText}>{userInfo.nickName}</Text>
              {
                realName !== '' &&
                <Text style={styles.nameTextReal}>(真实姓名：{realName})</Text>
              }
            </View>
          </View>
          <View style={styles.nameLabelView}>
            <Text style={styles.grayText}>{userInfo.identityName}</Text>
          </View>
        </View>
        <TFeedback
          content={
            userInfo.memoText && userInfo.memoText !== '' ?
              <View style={styles.midMainCredit}>
                <CachedImage source={bao} style={styles.creditImg} />
                <View style={styles.creditView}>
                  <Text style={styles.creditLabel}>{userInfo.memoText}</Text>
                </View>
                <View style={styles.creditRight}>
                  <Icon name="md-arrow-dropright" style={styles.creditRightIcon} />
                </View>
              </View>
          :
              <View style={styles.midMainCredit}>
                <Text style={{ flex: 1, fontSize: 14, color: '#666' }}>点击了解买家保证金</Text>
                <View style={styles.creditRight}>
                  <Icon name="md-arrow-dropright" style={styles.creditRightIcon} />
                </View>
              </View>}
          onPress={() => this.rzDetail()}
        />
      </View>
    );
  }
  _renderProvideTypes() {
    const { push } = this.props;
    const { userInfo } = this.state;
    return (
      <TOpacity
        style={styles.flexOne}
        content={
          <View style={styles.provideTypes}>
            <View style={styles.provideTypesLeft}>
              {
                userInfo.memberVerifs ?
                userInfo.memberVerifs.map((item, index) => (
                  <View style={styles.ptlList} key={index}>
                    <Icon name="checkmark" style={styles.ptlIcon} />
                    <Text style={styles.ptlText}>{item.verifFieldName}</Text>
                  </View>
                ))
                :
                <TFeedback
                  content={
                    <View style={{ paddingLeft: 10, paddingBottom: 10 }}>
                      <Text style={{ fontSize: 14, color: '#666' }}>点击前往认证！</Text>
                    </View>}
                  onPress={() => { push({ key: 'Certification' }); }}
                />
              }
            </View>
            <Icon name="md-arrow-dropright" style={styles.ptrIcon} />
          </View>
        }
        onPress={() => push({ key: 'IntroducePage' })}
      />
    );
  }
  _renderSkuTable() {
    const { push } = this.props;
    const { renzhengInfo, imageData, isHaveIndeed, indeedInfo, indeedImageData, memberId, myText } = this.state;
    const { certifIndex, isCertifShow, imageViewData, imageViewDataIndeed } = this.state;
    return (
      <View style={styles.skuTable}>
        <View style={styles.skuTableTitle}>
          {
            isHaveIndeed ?
              <Text style={styles.skuTableTitleText}>实地认证</Text>
            :
              renzhengInfo[1] !== '' ?
                <Text style={styles.skuTableTitleText}>企业认证</Text>
              :
                <Text style={styles.skuTableTitleText}>实地认证</Text>
          }
        </View>
        <View style={[styles.stTabelView, renzhengInfo[1] !== '' || isHaveIndeed ? styles.isBorder : '']}>
          {
            isHaveIndeed ?
            indeedInfo.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.stLabelView : styles.stTextView}>
                <Text style={styles.skuTableText}>{item}</Text>
              </View>
            ))
            :
            renzhengInfo[1] !== '' ?
            renzhengInfo.map((item, index) => (
              <View key={index} style={index % 2 === 0 ? styles.stLabelView : styles.stTextView}>
                <Text style={styles.skuTableText}>{item}</Text>
              </View>
            ))
            :
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 10 }}>
              <Text style={{ flex: 1, fontSize: 14, color: '#666' }}>尚未通过实地认证!</Text>
              <View style={styles.creditRight}>
                <Icon name="md-arrow-dropright" style={styles.creditRightIcon} />
              </View>
            </View>
          }
        </View>
        <View style={styles.certifView}>
          {
            isHaveIndeed ?
              <ImageLook
                images={indeedImageData}
              />
              :
              renzhengInfo[1] !== '' &&
              <ImageLook
                images={imageData}
              />
          }
        </View>
        {
          isHaveIndeed &&
          <View style={styles.investigationBox}>
            <View>
              <Text numberOfLines={3} style={{ flex: 1, fontSize: 14, color: '#333' }}>
                <Text style={styles.listLabel}>[考察内容]</Text>{myText}</Text>
            </View>
            <TOpacity
              style={styles.flexOne}
              content={
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <Text style={styles.readContent}>[查看考察详情]</Text>
                </View>
              }
              onPress={() => push({ key: 'InvestigationInfo', params: { memberId } })}
            />
          </View>
        }
      </View>
    );
  }
  _renderEval() {
    const { push } = this.props;
    const { allScore, allComment, memberId } = this.state;
    return (
      <View>
        {
          allComment !== null &&
          <TouchableWithoutFeedback onPress={() => push({ key: 'StoreEvalList', params: { memberId } })}>
            <View style={styles.evalView}>
              <View style={styles.evalViewTop}>
                <Text style={styles.evalTopLabel2}>评价</Text>
                <View style={styles.evalTopRight}>
                  <Text style={styles.evalTopText}>
                    查看<Text style={styles.evalTopColor}>{allComment}</Text>条评价
                  </Text>
                  <Icon name="md-arrow-dropright" style={styles.evalTopIcon2} />
                </View>
              </View>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.evalMainLeft}>
                  <StarRating
                    disabled
                    starSize={24}
                    emptyStar={'ios-star-outline'}
                    fullStar={'ios-star'}
                    halfStar={'ios-star-half'}
                    iconSet={'Ionicons'}
                    starColor={Mred}
                    maxStars={5}
                    rating={parseFloat(allScore)}
                  />
                  <Text style={styles.scoreText}>{allScore}</Text>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        }
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
          <View style={{ backgroundColor: '#fff' }}>
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
  _renderTabs() {
    const { goodsItems } = this.state;
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <View style={styles.flexOne}>
          <View style={[styles.flexOne, styles.textBorder]}>
            <Text style={styles.tabText}>供应</Text>
          </View>
        </View>
        <Child goodsItems={goodsItems} />
      </View>
    );
  }
  _renderModalView() {
    const content = (
      <View style={styles.maskerContent}>
        <View style={[styles.row, { flex: 1 }]}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={styles.circle} />
            <View style={{ flex: 1 }}>
              <Text style={styles.listTitle}>服务说明</Text>
              <View style={[styles.flexRow, { flex: 1 }]}>
                <Text style={styles.listLabel}>保证金</Text>
                <TFeedback
                  content={
                    <Text numberOfLines={2} style={styles.listLabelRight}>
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
    const { isFollow } = this.state;
    return (
      <Footer>
        <TFeedback
          content={
            <View style={styles.fotBtn1}>
              <Icon name="heart" style={[styles.fotChatIcon, isFollow ? styles.topIcon1 : '']} />
              {
                isFollow ?
                  <Text style={styles.topText}>已关注</Text>
                :
                  <Text style={styles.topText}>关注</Text>
              }
            </View>}
          onPress={() => { this.CreateMemberFollowService(); }}
        />
        <TFeedback
          content={
            <View style={styles.fotBtn2}>
              <Text style={styles.fotText}>聊生意</Text>
            </View>}
          onPress={this.goChat}
        />
        <TFeedback
          content={
            <View style={styles.fotBtn3}>
              <Text style={styles.fotText}>打电话</Text>
            </View>}
          onPress={() => { this.tellPhone(); }}
        />
      </Footer>
    );
  }
  render() {
    const { pop } = this.props;
    const { goodsItems, allComment, DTgoodsScore, DTsellScore, DTlogisticsScore } = this.state;
    const {
      refresh,
      loading,
      nomore,
      userInfo,
    } = this.state;
    return (
      <Container>
        <Header
          back={pop}
          title="店铺详情"
        />
        {
          userInfo &&
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this._onRefresh}
                tintColor="#666"
                title="加载中..."
                titleColor="#333"
                colors={['#666', '#666', '#666']}
                progressBackgroundColor="#ffffff"
              />
            }
            onScroll={this._onScroll}
            scrollEventThrottle={50}
          >
            {this._renderTop()}
            {this._renderNameAP()}
            {this._renderProvideTypes()}
            {this._renderSkuTable()}
            {
              parseFloat(allComment) > 0 &&
              this._renderEval()
            }
            {
              (DTgoodsScore !== '--' || DTsellScore !== '--' || DTlogisticsScore !== '--') &&
              this._renderDynamicEval()
            }
            {this._renderTabs()}
            {loading && <LoadMore />}
            {nomore && <LoadNoMore />}
          </ScrollView>
        }
        {
          goodsItems && userInfo &&
          this._renderFooter()
        }
        {this._renderModalView()}
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
