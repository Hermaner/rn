import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback, Loading } from '../../components';
import { pushRoute } from '../../actions';
import { ColorList } from '../../utils';
import styles from './styles';

class Child1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  render() {
    const { data, push } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          data.map((item, index) => (
            <View style={{ marginBottom: 5 }} key={index}>
              <TFeedback
                content={
                  <View style={styles.goodsItem}>
                    {
                      item.supplyImages.length === 0 ?
                        <CachedImage
                          style={styles.goodsImg}
                          source={{ uri: `${item.imgUrl}?imageView2/1/w/120` }}
                        />
                      :
                        <CachedImage
                          style={styles.goodsImg}
                          source={{ uri: `${item.supplyImages[0].imgUrl}?imageView2/1/w/120` }}
                        />
                    }
                    <View style={{ flex: 1 }}>
                      <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
                      <Text style={styles.goodsPlace}>
                        {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
                      </Text>
                      <View style={[styles.flexRow, { flexWrap: 'wrap' }]}>
                        {
                          item.logisticsMode !== '' &&
                          item.logisticsMode.split(',').map((item3, index3) => (
                            <Text
                              style={[
                                styles.aa,
                                { borderColor: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }
                              ]}
                              key={index3}
                            >
                              {item3}
                            </Text>
                          ))
                        }
                        {
                          item.supplyMode !== '' &&
                          item.supplyMode.split(',').map((item4, index4) => (
                            <Text
                              style={[
                                styles.aa,
                                { borderColor: ColorList[index4 > ColorList.length ? index4 % ColorList.length : index4] }
                              ]}
                              key={index4}
                            >{item4}</Text>
                          ))
                        }
                        {
                          item.renderServices !== '' &&
                          item.renderServices.split(',').map((item5, index5) => (
                            <Text
                              style={[
                                styles.aa,
                                { borderColor: ColorList[index5 > ColorList.length ? index5 % ColorList.length : index5] }
                              ]}
                              key={index5}
                            >
                              {item5}
                            </Text>
                          ))
                        }
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
                onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
              />
            </View>
          ))
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
  memberId: PropTypes.string,
};
export default connect(null, { push: pushRoute })(Child1);
