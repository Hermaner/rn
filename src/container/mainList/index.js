import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Header, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
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
        <TouchableOpacity onPress={pop}>
          <Text style={styles.HeaderRightText}>筛选</Text>
        </TouchableOpacity>
      </Header>
    );
  }
  _readerConditions() {
    return (
      <View style={styles.conditions}>
        <TouchableWithoutFeedback onPress={() => { alert(1); }}>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>八目瓜</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>品种</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>规格</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View style={styles.cdsList}>
            <Text style={styles.cdsListText}>全国</Text>
            <Icon name="ios-arrow-down" style={styles.cddown} />
            <View style={styles.rightLine} />
          </View>
        </TouchableWithoutFeedback>
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
                    {item.label}
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
              <Text style={styles.mainText}>全部</Text>
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
                      {item.label}
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
    return (
      <Container>
        <View style={styles.fixTop}>
          {this._readerHeader()}
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
