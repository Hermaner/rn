import React from 'react';
import { View, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback } from '../../components';
import { pushRoute } from '../../actions';
import Base from './base';
import styles from './styles';

class Child1 extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderRow = () => {
    const { push } = this.props;
    const { info } = this.props.navigation.state.params;
    return (
      <View style={{ marginBottom: 5 }}>
        {
          info.products.map((item, index) => (
            <TFeedback
              content={
                <View style={styles.goodsItem} key={index}>
                  <Image
                    style={styles.goodsImg}
                    source={{ uri: item.imgUrl }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.goodsName}>{item.brandName} {item.categoryName}</Text>
                    <Text style={styles.goodsPlace}>
                      {info.address}
                    </Text>
                    <View style={styles.goodsPriceInfo}>
                      <View>
                        <Text style={styles.price}>{item.salesPrice}元/{item.unit}</Text>
                      </View>
                      {/* <View style={styles.howLongBox}>
                        <Text style={styles.howLong}>
                        {item.beforeTime == null ? '1天前' : item.beforeTime}
                      </Text>
                      </View> */}
                    </View>
                  </View>
                </View>
              }
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {/* {this._renderRow()} */}
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
