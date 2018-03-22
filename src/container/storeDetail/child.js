import React from 'react';
import { View, TouchableWithoutFeedback, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { CachedImage } from 'react-native-img-cache';
import { connect } from 'react-redux';
import { ColorList } from '../../utils';
import { pushRoute } from '../../actions';
import { Loading } from '../../components';
import styles from './styles';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}>
        <View style={styles.goodsItem}>
          <CachedImage
            style={styles.goodsImg}
            source={{ uri: `${item.supplyImages[0].imgUrl}?imageView2/1/w/80` }}
          />
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
              <Text style={styles.goodsPlace}>
                {item.sendProvinceName}{item.sendCityName}{item.sendDistrictName}
              </Text>
              <View style={[styles.flexRow, { flexWrap: 'wrap', maxHeight: 50 }]}>
                {
                  (item.logisticsMode !== null && item.logisticsMode !== '') &&
                  item.logisticsMode.split(',').map((item3, index3) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index3 > ColorList.length ? index3 % ColorList.length : index3] }]} key={index3}>{item3}</Text>
                  ))
                }
                {
                  (item.supplyMode !== null && item.supplyMode !== '') &&
                  item.supplyMode.split(',').map((item4, index4) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index4 > ColorList.length ? index4 % ColorList.length : index4] }]} key={index4}>{item4}</Text>
                  ))
                }
                {
                  (item.renderServices !== null && item.renderServices !== '') &&
                  item.renderServices.split(',').map((item5, index5) => (
                    <Text style={[styles.aa, { borderColor: ColorList[index5 > ColorList.length ? index5 % ColorList.length : index5] }]} key={index5}>{item5}</Text>
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
    const { goodsItems } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          <FlatList
            data={goodsItems}
            renderItem={this._renderRow}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
          />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
  goodsItems: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child);
