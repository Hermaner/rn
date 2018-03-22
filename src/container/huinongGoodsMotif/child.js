import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData } from '../../components';
import styles from './styles';
import { Mcolor } from '../../utils';

class Child extends React.Component {
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
          data.map((item, index) => (
            item.seasonCategoryId &&
            <View key={index}>
              <View style={styles.goodsTypeBox}>
                <View style={{ flex: 1 }} />
                <View style={styles.goodsTypeCenter}>
                  <Text style={styles.goodsTypeText}>{item.name}</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              {
                item.supplys.map((item2, index2) => (
                  <TFeedback
                    key={index2}
                    content={
                      <View>
                        <View style={[styles.goodsItem, styles.specialItem]}>
                          {
                            item2.supplyImages && item2.supplyImages.length > 0 &&
                            <CachedImage style={styles.goodsImage} source={{ uri: `${item2.supplyImages[0].imgUrl}?imageView2/1/w/80` }} />
                          }
                          <View style={{ flex: 1 }}>
                            <Text style={styles.goodsName}>{item2.brandName}{item2.categoryName}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                              <Text style={{ color: Mcolor, fontSize: 20 }}>{item2.wholesalePrice}</Text>
                              <Text style={{ color: Mcolor, fontSize: 14, flex: 1 }}>元/{item2.unit}</Text>
                              <Text style={{ color: '#666', fontSize: 12 }}>{item2.wholesaleCount}{item2.unit}起批</Text>
                            </View>
                            <Text style={styles.userName}>
                              {item2.sendProvinceName}{item2.sendCityName}{item2.sendDistrictName}
                            </Text>
                          </View>
                        </View>
                      </View>}
                    onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item2.supplyId, memberId: item2.memberId } }); }}
                  />
                ))
              }
            </View>
          ))
        }
        {
          data &&
          !data[0].seasonCategoryId &&
          data.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View>
                  <View style={styles.goodsItem}>
                    {
                      item.supplyImages &&
                      <CachedImage style={styles.goodsImage} source={{ uri: `${item.supplyImages[0].imgUrl}?imageView2/1/w/80` }} />
                    }
                    <View style={{ flex: 1 }}>
                      <Text style={styles.goodsName}>{item.brandName}{item.categoryName}</Text>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                        <Text style={{ color: Mcolor, fontSize: 20 }}>{item.wholesalePrice}</Text>
                        <Text style={{ color: Mcolor, fontSize: 14, flex: 1 }}>元/{item.unit}</Text>
                        <Text style={{ color: '#666', fontSize: 12 }}>{item.wholesaleCount}{item.unit}起批</Text>
                      </View>
                      <Text style={styles.userName}>
                        {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                      </Text>
                    </View>
                  </View>
                </View>}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { name, data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {/* <View style={styles.goodsTitle}>
          <Text style={styles.goodsTitleText}>{name}</Text>
        </View> */}
        {
          (data && data.length > 0) ?
          this._renderRow()
          :
          <View style={{ marginTop: 40 }}>
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
  name: PropTypes.string,
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
