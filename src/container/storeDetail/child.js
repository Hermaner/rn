import React from 'react';
import { View, TouchableWithoutFeedback, Text, ListView, RefreshControl, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading } from '../../components';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
  }
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}>
        <View style={styles.goodsItem}>
          <Image
            style={styles.goodsImg}
            source={{ uri: item.supplyImages[0].imgUrl }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
              <Text style={styles.goodsPlace}>
                {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
              </Text>
              <View style={[styles.flexRow, { flexWrap: 'wrap', maxHeight: 50 }]}>
                {
                  item.logisticsMode !== '' &&
                  item.logisticsMode.split(',').map((item3, index3) => (
                    <Text style={styles.aa} key={index3}>{item3}</Text>
                  ))
                }
                {
                  item.supplyMode !== '' &&
                  item.supplyMode.split(',').map((item4, index4) => (
                    <Text style={styles.aa} key={index4}>{item4}</Text>
                  ))
                }
                {
                  item.renderServices !== '' &&
                  item.renderServices.split(',').map((item5, index5) => (
                    <Text style={styles.aa} key={index5}>{item5}</Text>
                  ))
                }
              </View>
            </View>
            <View style={styles.goodsPriceInfo}>
              <View>
                <Text style={styles.price}>{item.wholesalePrice}元/{item.unit}</Text>
              </View>
              <View style={styles.howLongBox}>
                <Text style={styles.howLong}>{item.beforeTime == null ? '1天前' : item.beforeTime}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, dataSource, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
