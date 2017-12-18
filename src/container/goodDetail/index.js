import React from 'react';
import { View, Image, TouchableWithoutFeedback, Modal, Animated, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import StarRating from 'react-native-star-rating';
import AutoHeightImage from 'react-native-auto-height-image';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, GoodhList, ModalView } from '../../components';
import { DeepClone } from '../../../api';
import { Mred, deviceW } from '../../utils';
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
  }
  _renderTop() {
    return (
      <View style={styles.topView}>
        <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.mainImg} />
        <View style={styles.topOne}>
          <Text style={styles.topText}>6小时前</Text>
        </View>
        <View style={styles.topTwo}>
          <Text style={styles.topText}>1111人查看</Text>
        </View>
      </View>
    );
  }
  _renderNameAP() {
    return (
      <View style={styles.nameAPView}>
        <View style={styles.nameOneView}>
          <View style={styles.nameTextView}>
            <Text style={styles.nameText} numberOfLines={2}>
              赣南脐橙双11秒杀价按时大大打算多赣南脐橙双11秒杀价按时大大打算多
            </Text>
          </View>
          <View style={styles.nameIconView}>
            <Icon name="arrow-back" style={styles.jcIcon} />
            <Text style={styles.grayText}>举报</Text>
          </View>
        </View>
        <View style={styles.nameAddressView}>
          <Text style={styles.grayText}>江西省赣州市宁都县</Text>
        </View>
        <View style={styles.priceView}>
          <Text style={styles.priceText}>3.5</Text>
          <Text style={styles.pricelabel}>元/斤</Text>
          <View style={styles.priceLabelView}>
            <Text style={styles.priceLabelText}>10斤起批</Text>
          </View>
          <Icon name="arrow-back" style={styles.ptsIcon} />
        </View>
        <View style={styles.nameTipsView}>
          <Icon name="arrow-back" style={styles.nameTipsicon} />
          <View>
            <Text style={styles.grayText}>
              10斤起批10斤起批10起批10斤起批10斤起批10斤起批10斤批10斤起批10斤起批
              <Text style={styles.nameColorText}>了解</Text>
            </Text>
          </View>
        </View>
      </View>
    );
  }
  _renderProvideTypes() {
    return (
      <View style={styles.provideTypes}>
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
              <Icon name="arrow-back" style={styles.evalTopIcon} />
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
    return (
      <View style={styles.skuTable}>
        <View style={styles.skuTableTitle}>
          <Text style={styles.skuTableTitleText}>货品规格</Text>
        </View>
        <View style={styles.stTabelView}>
          <View style={styles.stLabelView}>
            <Text style={styles.skuTableText}>品种名</Text>
          </View>
          <View style={styles.stTextView}>
            <Text style={styles.skuTableText}>紫色一号月瓜</Text>
          </View>
          <View style={styles.stLabelView}>
            <Text style={styles.skuTableText}>单果重</Text>
          </View>
          <View style={styles.stTextView}>
            <Text style={styles.skuTableText}>90-100g</Text>
          </View>
          <View style={styles.stLabelView}>
            <Text style={styles.skuTableText}>种植方式</Text>
          </View>
          <View style={styles.stTextView}>
            <Text style={styles.skuTableText}>野生</Text>
          </View>
          <View style={styles.stLabelView}>
            <Text style={styles.skuTableText}>外皮颜色</Text>
          </View>
          <View style={styles.stTextView}>
            <Text style={styles.skuTableText}>紫色</Text>
          </View>
        </View>
      </View>
    );
  }
  _renderStore() {
    const { push } = this.props;
    return (
      <View style={styles.storeView}>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'StoreDetail' }); }}>
          <View style={styles.storeViewTop}>
            <View style={styles.storeLeft}>
              <Image source={{ uri: 'https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2495803215,2562259820&fm=173&s=DA383EC754026CEE0E2E89200300704B&w=218&h=146&img.JPEG' }} style={styles.storeImg} />
              <View style={styles.storeLeftView}>
                <Text style={styles.storeImgText}>行情官</Text>
              </View>
            </View>
            <View style={styles.storeMid}>
              <View style={styles.storeMidName}>
                <Icon name="arrow-back" style={styles.storeMidIcon} />
                <Text style={styles.storeMidNameText}>行情官</Text>
              </View>
              <View style={[{ justifyContent: 'space-between' }, styles.fr]}>
                <View style={styles.storeMidLabel}>
                  <Text style={styles.storeMidLabelText}>行情官/行情官</Text>
                </View>
                <View />
              </View>
              <Text style={styles.storeMidText}>
                已缴纳保证金<Text style={styles.storeMidColorText}>5000</Text>元
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
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
        <View style={styles.storeRight}>
          <Text style={styles.storeRightText}>进店铺</Text>
        </View>
      </View>
    );
  }
  _renderTabs() {
    const { images, otherItems } = this.state;
    const Tab1 = () => (
      <View style={styles.detialView}>
        <Text style={styles.detialLabel}>131313</Text>
        {
          images.map((item, index) => (
            <View key={index} style={styles.detialImg}>
              <AutoHeightImage
                width={deviceW - 20}
                imageURL={item.imgUrl}
              />
            </View>
          ))
        }
      </View>
    );
    const Tab2 = () => (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          otherItems.map((item, index) => (
            <GoodhList
              count={2}
              data={item}
              key={index}
              onPress={() => { this.props.push({ key: 'GoodDetail' }); }}
            />
          ))
        }
      </View>
    );
    return (
      <View style={{ backgroundColor: '#fff', marginTop: 10 }}>
        <ScrollableTabView renderTabBar={() => <ScrollableTab />}>
          <Tab1 tabLabel="图文详情" />
          <Tab2 tabLabel="他还供应" />
        </ScrollableTabView>
      </View>
    );
  }
  _renderFooter() {
    return (
      <Footer>
        <View style={styles.fotBtn1}>
          <Icon name="arrow-back" style={styles.fotChatIcon} />
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
  _renderBuyMasker() {
    const { push } = this.props;
    const { isBuyMaskerShow, maskerHeight } = this.state;
    console.log(maskerHeight)
    console.log(new Animated.Value(300))
    return (
      <Modal
        animationType={'none'}
        transparent
        visible={isBuyMaskerShow}
        onRequestClose={() => { console.log('关闭'); }}
      >
        <TouchableWithoutFeedback onPress={this.closeBuyMasker}>
          <View style={styles.masker}>
            <TouchableWithoutFeedback>
              <Animated.View style={[styles.maskerContent, { transform: [{ translateY: new Animated.Value(30) }] }]}>
                <View>
                  <View style={styles.maskerTop}>
                    <Text style={styles.maskerTitle}>该货品已经介入买家保障</Text>
                    <TouchableOpacity style={styles.maskerCloseBtn} onPress={this.closeBuyMasker}>
                      <Icon name="arrow-back" style={styles.maskerCloseIcon} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.maskerContainer}>
                    <Text style={styles.title}>该货品已经介入买家保障</Text>
                  </View>
                  <View style={styles.maskerBtns}>
                    <TouchableOpacity style={styles.maskerConfirm} onPress={this.saveBuyMasker}>
                      <Text style={styles.maskerConfirmText}>确认</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
  _renderModalView() {
    return (
      <ModalView
        ref={(o) => { this.ModalView = o; }}
        title={'1231'}
        content={<Text>1331313131</Text>}
        onConfirm={() => console.log(111)}
      />
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="供应详情"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content>
          {this._renderTop()}
          {this._renderNameAP()}
          {this._renderProvideTypes()}
          {this._renderStore()}
          {this._renderEval()}
          {this._renderSkuTable()}
          {this._renderTabs()}
          {this._renderModalView()}
        </Content>
        {this._renderFooter()}
        {this._renderBuyMasker()}
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
