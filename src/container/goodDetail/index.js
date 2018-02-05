import React from 'react';
import { View, Image, TouchableWithoutFeedback, TouchableOpacity, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import AutoHeightImage from 'react-native-auto-height-image';
import { popRoute, pushRoute } from '../../actions';
import { Header, GoodhList, ModalView, InputNumber, Loading, TFeedback } from '../../components';
import { Mred, deviceW } from '../../utils';
import base from './base';
import styles from './styles';

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
    this.getInit();
  }
  _renderTop() {
    const { detail } = this.state;
    return (
      <View style={styles.topView}>
        <Image source={{ uri: detail.supplyImages[0].imgUrl }} style={styles.mainImg} />
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
    const { detail } = this.state;
    const { push } = this.props;
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
            onPress={() => { push({ key: 'ReportPage' }); }}
          />
        </View>
        <View style={styles.nameAddressView}>
          <Text style={styles.grayText}>
            {detail.sendProvinceName}{detail.sendCityName}{detail.sendDistrictName}
          </Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>{detail.wholesalePrice}</Text>
          <Text style={styles.pricelabel}>元/{detail.unit}</Text>
          <View style={styles.priceLabelView}>
            <Text style={styles.priceLabelText}>{detail.wholesaleCount}{detail.unit}起批</Text>
          </View>
          {/* <Icon name="ios-help-circle-outline" style={styles.ptsIcon} /> */}
        </View>
        <View style={styles.nameTipsView}>
          <Icon name="md-volume-down" style={styles.nameTipsicon} />
          <View>
            <Text style={styles.grayText}>
              私自打款有风险啊有风险私自打款有风险啊有风险私自打款有风险啊有风险私自打款有风险啊有风险私自打款有风险啊有风险私自打款有风险啊有风险
              <Text style={styles.nameColorText}>了解</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderProvideTypes() {
    const { detail: { logisticsMode, renderServices, supplyMode } } = this.state;
    let ptems = [];
    ptems = ptems.concat(logisticsMode.split(',') : [], renderServices.split(',') : [], supplyMode.split(',') : []);
    return (
      <View style={styles.provideTypes}>
        <View style={styles.provideTypesLeft}>
          {
            ptems.map((item, index) => (
              <View style={styles.ptlList} key={index}>
                <Icon name="ios-checkmark-circle-outline" style={styles.ptlIcon} />
                <Text style={styles.ptlText}>{item}</Text>
              </View>
            ))
          }
        </View>
        {/* <Icon name="md-arrow-dropright" style={styles.ptrIcon} /> */}
      </View>
    );
  }
  _renderEval() {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => push({ key: 'EvalList' })}>
        <View style={styles.evalView}>
          <View style={styles.evalViewTop}>
            <Text style={styles.evalTopLabel}>评价</Text>
            <View style={styles.evalTopRight}>
              <Text style={styles.evalTopText}>
                查看<Text style={styles.evalTopColor}>4</Text>条评价
              </Text>
              <Icon name="play" style={styles.evalTopIcon} />
            </View>
          </View>
          <View style={styles.evalViewBom}>
            <Text style={styles.evalMainText}>评价文字显示的确</Text>
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
                  rating={3.5}
                />
                <Text style={styles.evalMainCount}>购买数量：x2</Text>
              </View>
              <Text style={styles.evalMainName}>h****8</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    const { detail, memberId } = this.state;
    return (
      <View style={styles.storeView}>
        <TouchableWithoutFeedback onPress={() => { push({ key: memberId ? 'StoreDetail' : 'User', params: { memberId } }); }}>
          <View style={styles.storeViewTop}>
            <View style={styles.storeLeft}>
              <Image source={{ uri: detail.member.imgUrl || '' }} style={styles.storeImg} />
              <View style={styles.storeLeftView}>
                <Text style={styles.storeImgText}>{detail.member.identityName}</Text>
              </View>
            </View>
            <View style={styles.storeMid}>
              <View style={styles.storeMidName}>
                <Icon name="ios-ribbon" style={styles.storeMidIcon} />
                <Text style={styles.storeMidNameText}>{detail.member.nickName}</Text>
              </View>
              <View style={[{ justifyContent: 'space-between' }, styles.fr]}>
                <View style={styles.storeMidLabel}>
                  <Text style={styles.storeMidLabelText}>{detail.member.identityName}</Text>
                </View>
                <View />
              </View>
              <Text style={styles.storeMidText}>
                已缴纳保证金<Text style={styles.storeMidColorText}>5000</Text>元
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        {
          !detail.member.authenticate ?
            <View style={styles.noIdView}>
              <Text style={styles.noIdText}>
                该卖家未实名认证，交易风险较高，请谨慎交易
              </Text>
            </View>
            :
            <View style={styles.storeViewBottom}>
              <View style={styles.provideTypesLeft}>
                <View style={styles.ptlList}>
                  <Icon name="arrow-back" style={styles.ptlIcon} />
                  <Text style={styles.ptlText}>基地直供</Text>
                </View>
                <View style={styles.ptlList}>
                  <Icon name="arrow-back" style={styles.ptlIcon} />
                  <Text style={styles.ptlText}>基地直供</Text>
                </View>
                <View style={styles.ptlList}>
                  <Icon name="arrow-back" style={styles.ptlIcon} />
                  <Text style={styles.ptlText}>基地直供</Text>
                </View>
              </View>
              <Icon name="arrow-back" style={styles.ptrIcon} />
            </View>
        }
        <View style={styles.storeRight}>
          <Text style={styles.storeRightText}>进店铺</Text>
        </View>
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
          detail.otherSupplys.map((item, index) => (
            <GoodhList
              count={2}
              data={item}
              key={index}
              onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
            />
          ))
        }
      </View>
    );
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 10 }]}>
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne === 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
                <Text style={[styles.tabText, isTabOne === 1 ? styles.tabTextChoose : '']}>图文详情</Text>
              </View>}
            onPress={() => this.tabChange(1)}
          />
          <TFeedback
            content={
              <View style={[styles.flexOne, isTabOne !== 1 ? styles.textBorder : '', { paddingBottom: 10 }]}>
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
    return (
      <Footer>
        <View style={styles.fotBtn1}>
          <Icon name="chatboxes" style={styles.fotChatIcon} />
          <Text style={styles.fotChatText}>聊生意</Text>
        </View>
        <View style={styles.fotBtn2}>
          <Text style={styles.fotText}>打电话</Text>
        </View>
        <TouchableOpacity style={styles.fotBtn3} onPress={this.openBuyMasker}>
          <Text style={styles.fotText}>立即购买</Text>
        </TouchableOpacity>
      </Footer>
    );
  }
  _renderModalView() {
    const { skuCount, detail } = this.state;
    const content = (
      <View style={styles.maskerContent}>
        <View style={styles.maskerTop}>
          <View style={styles.maskerLeft}>
            <Image source={{ uri: detail.supplyImages[0].imgUrl }} style={styles.maskerImg} />
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
        <View style={styles.maskerLink}>
          <Image source={{ uri: 'http://p11md08oo.bkt.clouddn.com/201812115032101.jpg?imageView2/2/w/600' }} style={styles.maskerLinkImg} />
        </View>
        <View style={styles.maskerBom}>
          <Text style={styles.maskerBomPrice}>合计：{skuCount * detail.wholesalePrice}元</Text>
          <TouchableOpacity style={styles.maskerBomBtn} onPress={() => this.enterOrderDetail()} >
            <Text style={styles.maskerBomText}>立即购买</Text>
          </TouchableOpacity>
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
    const { detail } = this.state;
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
            // refreshControl={
            //   <RefreshControl
            //     refreshing={refresh}
            //     onRefresh={this._onGetSupplyInfoService}
            //     tintColor="#ff0000"
            //     title="加载中..."
            //     titleColor="#00ff00"
            //     colors={['#ff0000', '#00ff00', '#0000ff']}
            //     progressBackgroundColor="#ffffff"
            //   />
            // }
            onScroll={this._onScroll}
            scrollEventThrottle={50}
          >
            {this._renderTop()}
            {this._renderNameAP()}
            {this._renderProvideTypes()}
            {this._renderStore()}
            {this._renderEval()}
            {detail.supplyItems && this._renderSkuTable()}
            {this._renderTabs()}
            {this._renderModalView()}
          </ScrollView>
        }
        {detail && this._renderFooter()}
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
