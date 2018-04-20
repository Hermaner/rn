import React from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { ColorList } from '../../utils';
import { Loading, NoData, TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child extends Base {
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
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supply.supplyId, memberId: item.supply.memberId } }); }}>
        <View style={styles.goodsItem}>
          <CachedImage
            style={styles.goodsImg}
            source={{ uri: `${item.supply.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goodsName}>
                {item.supply.brandName} {item.supply.categoryName}
              </Text>
              <View style={styles.flexBox}>
                <Text numberOfLines={1} style={styles.goodsPlace}>
                  {item.supply.sendProvinceName}{item.supply.sendCityName}{item.supply.sendDistrictName}
                </Text>
                <View style={styles.howLongBox}>
                  <Text style={styles.howLong}>
                    {item.supply.beforeTime == null ? '1天前' : item.supply.beforeTime}
                  </Text>
                </View>
              </View>
              <View style={[styles.flexRow, { flexWrap: 'wrap', maxHeight: 50 }]}>
                {
                  (item.supply.logisticsMode !== null && item.supply.logisticsMode !== '') &&
                  item.supply.logisticsMode.split(',').map((item3, index3) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }]} key={index3}>{item3}</Text>
                  ))
                }
                {
                  (item.supply.supplyMode !== null && item.supply.supplyMode !== '') &&
                  item.supply.supplyMode.split(',').map((item4, index4) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index4 > ColorList.length ? index4 % ColorList.length : index4] }]} key={index4}>{item4}</Text>
                  ))
                }
                {
                  (item.supply.renderServices !== null && item.supply.renderServices !== '') &&
                  item.supply.renderServices.split(',').map((item5, index5) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index5 > ColorList.length ? index5 % ColorList.length : index5] }]} key={index5}>{item5}</Text>
                  ))
                }
              </View>
            </View>
            <View style={styles.goodsPriceInfo}>
              <View>
                <Text style={styles.price}>{item.supply.wholesalePrice}元/{item.supply.unit}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1 }} />
                <TFeedback
                  content={
                    <View style={styles.btnBox}>
                      <Text style={styles.btnText}>取消关注</Text>
                    </View>}
                  onPress={() => this.removeCollect(item.supply.supplyId, item.collectId)}
                />
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { items, noData, nomore, refresh } = this.state;
    return (
      <View>
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
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
