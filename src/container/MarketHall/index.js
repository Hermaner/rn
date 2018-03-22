import React from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { MaketHallItem, Loading, TOpacity, NoData, Header } from '../../components';
import base from './base';
import styles from './styles';

class MarketHall extends base {
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
    const { name } = this.state;
    return (
      <View style={styles.conditions}>
        <TOpacity
          style={{ flex: 1 }}
          content={
            <View style={styles.cdsList}>
              <Text style={styles.cdsListText}>{name || '全部分类'}</Text>
              <Icon name="ios-arrow-down" style={styles.cddown} />
              <View style={styles.rightLine} />
            </View>
          }
          onPress={() => { this.showAction(0); }}
        />
        <View style={styles.cdsList}>
          <Text style={styles.cdsListText}>整体行情[16:00]</Text>
        </View>
      </View>
    );
  }
  _readerMasker() {
    return (
      <View style={styles.masker}>
        <View style={styles.maskerContent}>
          <View style={[styles.f1, styles.fr]}>
            {this._renderCategoryLeft()}
            {this._renderCategoryContent()}
          </View>
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
    <TOpacity
      style={{ flex: 1 }}
      key={index}
      content={
        <MaketHallItem item={item} />
      }
      onPress={() => this.props.push({ key: 'MarketHallList', params: { item } })}
    />

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
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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
    const { pop } = this.props;
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header back={pop} title="行情大厅" />
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

MarketHall.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MarketHall);
