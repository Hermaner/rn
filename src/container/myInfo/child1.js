import React from 'react';
import { View, TouchableWithoutFeedback, Text, ListView, RefreshControl, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading } from '../../components';
import { pushRoute } from '../../actions';
import Base1 from './base1';
import styles from './styles';

class Child1 extends Base1 {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderRow = (item) => {
    const { push } = this.props;
    const { memberId } = this.state;
    return (
      <View style={{ marginBottom: 5 }}>
        <TFeedback
          content={
            <View style={styles.goodsItem}>
              {
                item.supplyImages.length === 0 ?
                  <Image
                    style={styles.goodsImg}
                    source={{ uri: item.imgUrl }}
                  />
                :
                  <Image
                    style={styles.goodsImg}
                    source={{ uri: item.supplyImages[0].imgUrl }}
                  />
              }
              <View style={{ flex: 1 }}>
                <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
                <Text style={styles.goodsPlace}>
                  {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.chooseBtn}>{item.supplyMode}</Text>
                  <View />
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
          }
          onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, member: memberId } }); }}
        />
      </View>
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
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
