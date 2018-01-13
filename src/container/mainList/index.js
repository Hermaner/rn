import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { GoodList, Loading } from '../../components';
import base from './base';
import styles from './styles';

class MainList extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
    this.getDelInit();
  }
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
            <Text style={styles.cdsListText}>八目瓜</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { this.showAction(1); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>品种</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { this.showAction(2); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>规格</Text>
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
      brands,
      specTypes,
      isBrandsShow,
      isSpecTypesShow,
      isCategoryShow,
      isAddressShow,
    } = this.state;
    return (
      <View style={styles.masker}>
        <View style={styles.maskerContent}>
          {
            isBrandsShow &&
            <View style={styles.maskerContentView}>
              {
                brands.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => this.brandTab(index)}>
                    <View style={styles.contetnTabView}>
                      <Text
                        style={styles.mainText}
                      >
                        {item.brandName}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                ))
              }
            </View>
          }
          {
            isSpecTypesShow &&
            <View style={styles.f1}>
              {
                specTypes.map((items, index) => (
                  <View key={index}>
                    <View style={styles.maskerTitle}>
                      <Text style={styles.maskerTitleText}>{items.specTypeName}</Text>
                    </View>
                    <View style={[styles.fr, { flexWrap: 'wrap' }]}>
                      {
                        items.specs.map((item, i) => (
                          <TouchableWithoutFeedback key={i} onPress={() => this.specsTab(index, i)}>
                            <View style={styles.contetnTabView}>
                              <Text
                                style={styles.mainText}
                              >
                                {item.specName}
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
            (isBrandsShow || isSpecTypesShow) &&
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
    const { goods } = this.state;
    return (
      <View style={styles.leftNav}>
        <Content>
          {
            goods.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => { this.changeLeftGoods(index); }}
              >
                <View style={[styles.leftNavList, item.cur && styles.leftNavListCur]}>
                  <Text
                    style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                  >
                    {item.name}
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
    const { childgoods } = this.state;
    return (
      <View style={styles.rightContent}>
        <Content>
          <View style={styles.rightContentView}>
            {
              childgoods.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => { this.changeRightGoods(index); }}
                >
                  <View style={styles.contetnTabView}>
                    <Text
                      style={styles.mainText}
                    >
                      {item.name}
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
    const { citys, cityIndex } = this.state;
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
            citys.length === 0 ?
            citys.map((item, index) => (
              <TouchableWithoutFeedback key={index} onPress={() => { push({ key: 'User' }); }}>
                <View style={styles.contetnTabView}>
                  <Text
                    style={styles.mainText}
                  >
                    {item.name}
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
                citys.map((item, index) => (
                  <TouchableWithoutFeedback
                    key={index}
                    onPress={() => { this.changeCityTab(index); }}
                  >
                    <View style={[styles.addressLeftList, item.cur && styles.addressLeftListCur]}>
                      <Text
                        style={[styles.leftNavText, item.cur && styles.leftNavTextCur]}
                      >
                        {item.name}
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
                citys[cityIndex].citys.map((item, index) => (
                  <TouchableWithoutFeedback key={index} onPress={() => { this.selectCity(index); }}>
                    <View style={styles.addressRightList}>
                      <Text
                        style={styles.leftNavText}
                      >
                        {item.name}
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
  _renderRow = (item, sectionID, index, memberId) => (
    <View>
      <GoodList
        data={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, member: memberId } }); }}
      />
    </View>
  )
  _renderContent() {
    const { noData, dataSource, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow}
              onEndReached={this._reachEnd}
              enableEmptySections
              onEndReachedThreshold={10}
              contentContainerStyle={styles.listViewStyle}
              renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }}>
                {nomore ? '没有更多数据了' : '数据加载中...'}
              </Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={this._onRefresh}
                />}
            />
            :
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={this._onRefresh}>
                <View>
                  <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
                    没有相关数据,点击刷新
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
        }
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MainList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainList);
