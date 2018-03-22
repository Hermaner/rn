import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { GoodList, Loading, TOpacity, NoData } from '../../components';
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
  _readerHeader() {
    const { pop, push } = this.props;
    return (
      <Header style={{ alignItems: 'center', backgroundColor: '#f8f8f8' }}>
        <TouchableOpacity onPress={pop} style={styles.Headerleft}>
          <Icon name="arrow-back" style={{ fontSize: 22, color: '#666' }} />
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => { push({ key: 'MainSearcher', params: { type: 'getMainListName' } }); }}>
          <View style={styles.HeaderMain}>
            <Icon name="ios-search-outline" style={styles.HeaderIcon} />
            <Text style={styles.HeaderMainText}>输入货品名称</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => { push({ key: 'GoodsScreen', params: { type: 'getMainList' } }); }}>
          <Text style={styles.HeaderRightText}>筛选</Text>
        </TouchableOpacity>
      </Header>
    );
  }
  _readerConditions() {
    const { name } = this.props.navigation.state.params;
    const { cityName, childgoodsName } = this.state;
    return (
      <View style={styles.conditions}>
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{childgoodsName || name}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={() => { this.showAction(0); }}
        />
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{cityName || '全国'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={() => { this.showAction(3); }}
        />
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
              childgoods &&
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
  _renderRow = ({ item, index }) => (
    <View>
      <GoodList
        data={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
      />
    </View>
  )
  _renderContent() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ListFooterComponent={() =>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>
                    {nomore ? '没有更多数据了' : '数据加载中...'}
                  </Text>
                </View>}
              onRefresh={this._onRefresh}
              refreshing={refresh}
              onEndReached={this._reachEnd}
              onEndReachedThreshold={0.1}
            />
            :
            <NoData
              label="没有相关数据"
            />
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
