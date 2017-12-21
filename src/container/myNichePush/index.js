import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { GoodList, Header } from '../../components';
import myNichePushBase from './base';
import styles from './styles';

class MyNichePush extends myNichePushBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _readerConditions() {
    return (
      <View style={styles.conditions}>
        <TouchableWithoutFeedback onPress={() => { this.showAction(0); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>标记</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => { this.showAction(1); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>推送时间</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
  _readerMasker() {
    const { leftLists, isVarietiesShow, skuLists, isSkuShow, isCategoryShow } = this.state;
    const { push, pop } = this.props;
    return (
      <View style={styles.masker}>
        <View style={styles.maskerContent}>
          {
            isVarietiesShow &&
            <View style={styles.maskerContentView}>
              <View style={styles.topPart}>
                <View style={styles.rowBox}>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>全部</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>一天内</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>一周内</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rowBox}>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>半个月内</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>半年内</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
          {
            isCategoryShow &&
            <View style={styles.maskerContentView}>
              <View style={styles.topPart}>
                <View style={styles.rowBox}>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>全部</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>未读</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>已读</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.rowBox}>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>意向客户</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>联系不上买家</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.flexOne} onPress={pop}>
                    <Text style={styles.flexText}>已联系</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
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
                    {item.label}
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
                  <TouchableWithoutFeedback key={index} onPress={() => { this.changeLeftTab(index); }}>
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
  _renderFooter() {
    return (
      <View style={styles.maskerBtns}>
        <TouchableOpacity style={styles.maskerCancelBtn} onPress={this.hideMasker}>
          <Text style={styles.maskerBtnText}>累计已收到0条商机</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.maskerSaveBtn} onPress={this.saveMasker}>
          <Text style={styles.maskerBtnTextCur}>设置关键词</Text>
        </TouchableOpacity>
      </View>
    )
  }
  _renderContent() {
    const { noData, dataSource, nomore, loading, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData &&
          <ListView
            dataSource={dataSource}
            renderRow={this._renderRow}
            onEndReached={this._reachEnd}
            enableEmptySections
            onEndReachedThreshold={10}
            contentContainerStyle={styles.listViewStyle}
            renderFooter={() => <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
              {nomore ? '没有更多数据了' : loading ? '数据加载中...' : '加载完毕'}
            </Text>}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this._onRefresh}
              />}
          />
        }
        {
          noData &&
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
              没有相关数据
            </Text>
          </View>
        }
      </View>
    );
  }
  render() {
    const { isMaskerShow } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header back={pop} title="商机推送" />
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
          {isMaskerShow && this._readerMasker()}
        </View>
        {this._renderFooter()}
      </Container>
    );
  }
}

MyNichePush.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyNichePush);
