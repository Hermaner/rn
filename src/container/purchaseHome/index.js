import React from 'react';
import { View, TouchableOpacity, BackHandler, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { GoodList } from '../../components';
import purchaseHomebase from './base';
import styles from './styles';

class PurchaseHome extends purchaseHomebase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ alignItems: 'center' }}>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'MainSearcher' }); }}>
          <View style={styles.HeaderMain}>
            <Icon name="ios-search-outline" style={styles.HeaderIcon} />
            <Text style={styles.HeaderMainText}>输入货品名称</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => { push({ key: 'GoodsScreen' }); }}>
          <Text style={styles.HeaderRightText}>筛选</Text>
        </TouchableOpacity>
      </Header>
    );
  }
  _readerConditions() {
    return (
      <View style={styles.conditions}>
        <TouchableWithoutFeedback onPress={() => { this.showAction(0); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>全部分类</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { this.showAction(3); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>全国</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  _readerMasker() {
    const {
      leftLists, isVarietiesShow, skuLists, isSkuShow, isCategoryShow, isAddressShow } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.masker}>
        <View style={styles.maskerContent}>
          {
            isVarietiesShow &&
            <View style={styles.maskerContentView}>
              {
                leftLists.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'User' }); }}>
                    <View style={styles.contetnTabView}>
                      <Text
                        style={styles.mainText}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </View>
          }
          {
            isSkuShow &&
            <View style={styles.f1}>
              {
                skuLists.map((items, index) => (
                  <View key={index}>
                    <View style={styles.maskerTitle}>
                      <Text style={styles.maskerTitleText}>{items.title}</Text>
                    </View>
                    <View style={[styles.fr, { flexWrap: 'wrap' }]}>
                      {
                        items.items.map((item, i) => (
                          <TouchableWithoutFeedback key={i} onPress={() => { push({ key: 'User' }); }}>
                            <View style={styles.contetnTabView}>
                              <Text
                                style={styles.mainText}
                              >
                                {item.label}
                              </Text>
                            </View>
                          </TouchableWithoutFeedback>
                        ))
                      }
                    </View>
                  </View>
                ))
              }
            </View>
          }
          {
            isCategoryShow &&
            <View style={[styles.f1, styles.fr]}>
              {this._renderCategoryLeft()}
              {this._renderCategoryContent()}
            </View>
          }
          {
            isAddressShow &&
            <View style={styles.f1}>
              {this._renderAddressContent()}
            </View>
          }
          {
            (isVarietiesShow || isSkuShow) &&
            <View style={styles.maskerBtns}>
              <TouchableOpacity style={styles.maskerCancelBtn} onPress={this.hideMasker}>
                <Text style={styles.maskerBtnText}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.maskerSaveBtn} onPress={this.saveMasker}>
                <Text style={styles.maskerBtnTextCur}>确认</Text>
              </TouchableOpacity>
            </View>
          }
        </View>
      </View>
    );
  }
  _renderCategoryLeft() {
    const { leftLists } = this.state;
    return (
      <View style={styles.leftNav}>
        <Content>
          {
            leftLists.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => { this.changeLeftTab(index); }}>
                <View style={[styles.leftNavList, item.cur && styles.leftNavListCur]}>
                  <Text
                    style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                  >
                    {item.label}eerr
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </Content>
      </View>
    );
  }
  _renderCategoryContent() {
    const { leftLists } = this.state;
    const { push } = this.props;
    return (
      <View style={styles.rightContent}>
        <Content>
          <TouchableOpacity onPress={() => { push({ key: 'User' }); }}>
            <View style={styles.rightAll}>
              <Text style={styles.mainText}>全部iii</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightContentView}>
            {
              leftLists.map((item, index) => (
                <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'User' }); }}>
                  <View style={styles.contetnTabView}>
                    <Text
                      style={styles.mainText}
                    >
                      {item.label}gg
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              ))
            }
          </View>
        </Content>
      </View>
    );
  }
  _renderAddressContent() {
    const { leftLists } = this.state;
    const { push } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.maskerTitle}>
          <Text style={styles.maskerTitleText}>自动定位</Text>
        </View>
        <TouchableOpacity style={styles.usedCityView}>
          <Text style={styles.nousedCity}>您的地址：上海</Text>
        </TouchableOpacity>
        <View style={styles.maskerTitle}>
          <Text style={styles.maskerTitleText}>常用城市</Text>
        </View>
        <View style={styles.usedCityView}>
          {
            leftLists.length === 0 ?
            leftLists.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'User' }); }}>
                <View style={styles.contetnTabView}>
                  <Text
                    style={styles.mainText}
                  >
                    {item.label}ff
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )) :
            <Text style={styles.nousedCity}>暂无</Text>
          }
        </View>
        <View style={styles.maskerTitle}>
          <Text style={styles.maskerTitleText}>省、市</Text>
        </View>
        <View style={[styles.f1, styles.fr]}>
          <View style={[styles.f1, { backgroundColor: '#f2f2f2' }]}>
            <Content>
              {
                leftLists.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => { this.changeLeftTab(index); }}
                  >
                    <View style={[styles.addressLeftList, item.cur && styles.addressLeftListCur]}>
                      <Text
                        style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </Content>
          </View>
          <View style={[styles.f1, { backgroundColor: '#f9f9f9' }]}>
            <Content>
              {
                leftLists.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => { this.selectCity(index); }}>
                    <View style={styles.addressRightList}>
                      <Text
                        style={styles.leftNavText}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </Content>
          </View>
        </View>
      </View>
    );
  }
  _renderRow = (rowData, sectionID, rowID) => (
    <View>
      <GoodList
        data={rowData}
        rowID={rowID}
        key={rowID}
        onPress={() => { this.props.push({ key: 'GoodDetail' }); }}
      />
    </View>
  )
  _renderContent() {
    const { push } = this.props;
    return (
      <View style={styles.listContent}>
        <View style={styles.goodsDetailList}>
          <TouchableOpacity onPress={() => { push({ key: 'PurchaseDetail' }); }}>
            <View style={styles.goodsDetail}>
              <Text style={styles.goodsName}>甘蔗</Text>
              <View style={styles.goodsVariety}>
                <Text style={styles.allText}>品种：</Text>
                <Text style={styles.allText}>不限</Text>
                <Text style={[styles.allText, styles.goodsWeight]}>1000斤</Text>
              </View>
              <View style={styles.goodsAddress}>
                <Text style={styles.allText}>所在地：</Text>
                <Text style={styles.allText}>江苏徐州</Text>
              </View>
              <View style={styles.activeDetail}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={styles.otherIndustryBox}>
                      <Text style={styles.otherIndustry}>其他行业</Text>
                    </View>
                  </View>
                  <View style={styles.time}>
                    <Text style={styles.everyWeek}>每周</Text>
                    <Text style={styles.scaleText}>距截止</Text>
                    <Text style={[styles.scaleText, styles.timeCount]}>6</Text>
                    <Text style={styles.scaleText}>天</Text>
                  </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                  <View style={styles.offerBox}>
                    <Text style={styles.offer}>去报价</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { isMaskerShow } = this.state;
    return (
      <Container>
        <View style={styles.fixTop}>
          {this._readerHeader()}
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
          {isMaskerShow && this._readerMasker()}
        </View>
      </Container>
    );
  }
}

PurchaseHome.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(PurchaseHome);
