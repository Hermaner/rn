import React from 'react';
import { View, ListView, RefreshControl, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { ServiceItem, Loading, TOpacity, SearchHeader, NoData } from '../../components';
import base from './base';
import styles from './styles';

class ServiceList extends base {
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
  }
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
  _renderRow = (item, sectionID, index) => (
    <View>
      <ServiceItem
        item={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'ServiceDetail', params: { masterServicesId: item.id } }); }}
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
            <NoData
              label="没有相关数据,请重新搜索"
              onPress={() => {}}
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

ServiceList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ServiceList);
