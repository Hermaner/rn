import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, Loading } from '../../components';
import Base from './base';
import { ColorList } from '../../utils';
import styles from './styles';

class Child2 extends Base {
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
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    const { tu } = this.state;
    return (
      <View>
        <View style={styles.buyTime}>
          <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
        </View>
        {
          item.map((item1, i) => (
            <TFeedback
              key={i}
              content={
                <View style={styles.goodsDetail2}>
                  {
                    item1.supplyImages ?
                      <CachedImage
                        style={styles.exampleImg}
                        source={{ uri: `${item1.supplyImages[0].imgUrl}?imageView2/1/w/120` }}
                      />
                    :
                      <CachedImage
                        style={styles.exampleImg}
                        source={tu}
                      />
                  }
                  <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flex: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={styles.gyTitle}>{item1.brandName} {item1.categoryName}</Text>
                          {
                            item1.supplyItems.map((item2, index2) => (
                              <Text numberOfLines={1} key={index2} style={{ flex: 1, fontSize: 18, color: '#333' }}> {item2.specName} </Text>
                            ))
                          }
                        </View>
                      </View>
                      <View style={{ flex: 4 }}>
                        <Text style={styles.gyPrice}>{item1.wholesalePrice}元/{item1.unit}</Text>
                        <View style={[styles.flexRow, { flexWrap: 'wrap' }]}>
                          {
                            (item1.logisticsMode !== null && item1.logisticsMode !== '') &&
                            item1.logisticsMode.split(',').map((item3, index3) => (
                              <View
                                key={index3}
                                style={[styles.aaBox,
                                  { borderColor: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }]}
                              >
                                <Text
                                  style={[
                                    styles.aa,
                                    { color: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }
                                  ]}
                                >{item3}</Text>
                              </View>
                            ))
                          }
                          {
                            (item1.supplyMode !== null && item1.supplyMode !== '') &&
                            item1.supplyMode.split(',').map((item4, index4) => (
                              <View
                                key={index4}
                                style={[styles.aaBox,
                                  { borderColor: ColorList[index4 > ColorList.length ? index4 % ColorList.length : index4] }]}
                              >
                                <Text style={[styles.aa, { color: ColorList[index4 > ColorList.length ? index4 % ColorList.length : index4] }]}>{item4}</Text>
                              </View>
                            ))
                          }
                          {
                            (item1.renderServices !== null && item1.renderServices !== '') &&
                            item1.renderServices.split(',').map((item5, index5) => (
                              <View
                                key={index5}
                                style={[styles.aaBox,
                                  { borderColor: ColorList[index5 > ColorList.length ? index5 % ColorList.length : index5] }]}
                              >
                                <Text style={[styles.aa, { color: ColorList[index5 > ColorList.length ? index5 % ColorList.length : index5] }]}>{item5}</Text>
                              </View>
                            ))
                          }
                        </View>
                      </View>
                    </View>
                    <View style={[styles.flexRow, styles.flexOne]}>
                      <Icon style={{ fontSize: 18, color: '#999', marginRight: 6 }} name="pin" />
                      <Text numberOfLines={1} style={{ flex: 1, fontSize: 14, color: '#666' }}>{item1.sendProvinceName} {item1.sendCityName} {item1.sendDistrictName} {item1.nickName}</Text>
                    </View>
                  </View>
                </View>}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item1.supplyId, memberId: item1.memberId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { items, noData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            />
            :
            <NoData
              label="没有相关数据"
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
