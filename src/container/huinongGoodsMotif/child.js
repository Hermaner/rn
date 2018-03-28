import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class Child extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderRow = () => {
    const { data, push } = this.props;
    return (
      <View>
        {
          data !== undefined && data !== null && data !== '' && data.length > 0 &&
          data.map((item, index) => (
            item.supplys !== null && item.supplys !== '' && item.supplys.length > 0 &&
            <View key={index}>
              <View style={styles.goodsTypeBox}>
                <View style={{ flex: 1 }} />
                <View style={styles.goodsTypeCenter}>
                  <Text style={styles.goodsTypeText}>{item.name}</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                {
                  item.supplys !== null && item.supplys !== '' && item.supplys.length > 0 &&
                  item.supplys.map((item2, index2) => (
                    <TFeedback
                      key={index2}
                      content={
                        <View style={styles.box}>
                          <View style={styles.goodsItem}>
                            {
                              item2.supplyImages && item2.supplyImages.length > 0 &&
                              <CachedImage style={styles.goodsImage} source={{ uri: `${item2.supplyImages[0].imgUrl}?imageView2/1/w/200` }} />
                            }
                            <View style={{ flex: 1 }}>
                              <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Text numberOfLines={2} style={[styles.goodsName, { flex: 1 }]}>
                                  {item2.brandName}{item2.categoryName}
                                </Text>
                              </View>
                              <View style={styles.priceBox}>
                                <Text style={{ color: '#B8860B', fontSize: 20 }}>{item2.wholesalePrice}</Text>
                                <Text style={styles.unit}>元/{item2.unit}</Text>
                                <View style={styles.needCount}>
                                  <Text style={{ color: '#fff', fontSize: 12 }}>{item2.wholesaleCount}{item2.unit}起批</Text>
                                </View>
                                <View style={{ flex: 1 }} />
                              </View>
                              <Text style={styles.name}>{item2.nickName}</Text>
                              <Text style={styles.userName}>
                                {item2.sendProvinceName}{item2.sendCityName}{item2.sendDistrictName}
                              </Text>
                            </View>
                          </View>

                          <TOpacity
                            style={styles.chatBox}
                            content={
                              <Text style={styles.chatText}>聊生意</Text>
                            }
                            onPress={() => this.goChat(item2)}
                          />
                        </View>}
                      onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item2.supplyId, memberId: item2.memberId } }); }}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { haveData } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          haveData ?
          this._renderRow()
          :
          <View style={{ flex: 1 }}>
            <NoData
              label="没有相关数据"
            />
          </View>
        }
      </View>
    );
  }
}
Child.propTypes = {
  data: PropTypes.array,
  push: PropTypes.func,
  haveData: PropTypes.bool,
};
export default connect(null, { push: pushRoute })(Child);
