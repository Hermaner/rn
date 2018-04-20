import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { pushRoute, popRoute } from '../../actions';
import { Loading, NoData, Header } from '../../components';
import base from './base';
import styles from './styles';

class ChatSupply extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
    this._onRefresh();
  }
  componentWillUnmount() {
    this.getDelete();
  }
  _renderRow = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => this.select(item)}>
        <View style={styles.goodsitem}>
          <View style={styles.goodsDetail}>
            <View style={{ flex: 1 }}>
              <View style={styles.goodsPrice}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ fontSize: 16, color: '#333' }}>{item.brandName} {item.categoryName}</Text>
                </View>
                <View>
                  <Text style={{ fontSize: 16, color: '#FC8521' }}>{item.wholesalePrice}元/{item.unit}</Text>
                </View>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', paddingBottom: 10 }}>
                {
                  item.supplyItems.map((item2, index2) => (
                    <Text key={index2} style={{ fontSize: 13, color: '#666' }}> {item2.specName} </Text>
                  ))
                }
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, items, nomore, refresh } = this.state;
    const { pop } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <Header
          back={pop}
          title="我的供应"
        />
        {
          !noData ?
            <OptimizedFlatList
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
              label="没有相关数据，点击刷新"
              onPress={this._onRefresh}
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
ChatSupply.propTypes = {
  push: PropTypes.func,
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ChatSupply);
