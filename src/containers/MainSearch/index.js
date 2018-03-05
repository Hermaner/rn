import React from 'react';
import { View, FlatList, ScrollView, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { ServiceItem, Loading, TOpacity, SearchHeader, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MainSearch extends base {
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
  renderHot() {
    const { hots } = this.state;
    return (
      <View style={styles.hotView}>
        <View style={styles.hotTitleView}>
          <Text style={styles.hotTitleText}>服务热搜</Text>
        </View>
        <View style={styles.hots}>
          {
            hots.map((item, index) => (
              <View style={styles.hot} key={index}>
                <TOpacity
                  style={styles.hotList}
                  content={
                    <Text style={styles.hotText}>{item.label}</Text>
                  }
                  onPress={() => this._onRefresh(item.label)}
                />
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  renderHistory() {
    const { historys } = this.state;
    return (
      <View style={styles.hotView}>
        <View style={styles.hotTitleView}>
          <Text style={styles.hotTitleText}>我的搜索</Text>
        </View>
        <View style={styles.historys}>
          {
            historys.map((item, index) => (
              <TOpacity
                style={styles.history}
                key={index}
                content={
                  <Text style={styles.historyText}>{item.label}</Text>
                }
                onPress={() => this._onRefresh(item.label)}
              />
            ))
          }
        </View>
      </View>
    );
  }
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <ServiceItem
        item={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'ServiceDetail', params: { masterServicesId: item.id } }); }}
      />
    );
  }
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
    const { pop } = this.props;
    const { isSearch, searchValue, hots } = this.state;
    return (
      <Container>
        <SearchHeader
          value={searchValue}
          back={pop}
          submit={this._onRefresh}
          searchChange={this.searchChange}
        />
        {
          isSearch ?
            <View style={styles.mainView}>
              {this._renderContent()}
            </View>
            :
            <ScrollView style={{ flex: 1 }}>
              {hots.length > 0 && this.renderHot()}
              {this.renderHistory()}
            </ScrollView>
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MainSearch.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainSearch);
