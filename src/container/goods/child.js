import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import Base1 from './base1';
import styles from './styles';

class Child extends Base1 {
  constructor(props) {
    super(props);
    this.state = {
      ...this.resetData,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderRow = () => {
    const { push } = this.props;
    const { allGoods } = this.state;
    return (
      <View>
        {
          allGoods.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.buyGoodsItems}>
                  <View style={styles.buyGoodsItem}>
                    <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
                    <View style={styles.flexRow}>
                      <Text style={styles.buyGoodsVariety}>
                        品种: {item.brandName}{item.categoryName}
                      </Text>
                      <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
                    </View>
                    <Text style={styles.buyGoodsPlace}>
                      所在地: {item.receiveProvinceName}{item.receiveCityName}
                    </Text>
                    <View style={styles.flexRow}>
                      <View style={{ flex: 1, marginTop: 6 }}>
                        <View style={styles.userDoBigBox}>
                          <View style={styles.userDoBox}>
                            <Text style={styles.userDo}>{item.member.identityName}</Text>
                          </View>
                          <View style={{ flex: 1 }} />
                        </View>
                        <View style={[styles.flexRow, { marginTop: 6 }]}>
                          <Text style={styles.everyWeek}>{item.frequency}</Text>
                          <View style={styles.flexRow}>
                            <Text style={styles.howLong}>距截止</Text>
                            <Text style={styles.howLongDay}>{item.purchaseTime}</Text>
                            <Text style={styles.howLong}>天</Text>
                          </View>
                        </View>
                      </View>
                      <View style={styles.goBuyBtnBox}>
                        <Text style={styles.goBuyBtn}>去报价</Text>
                      </View>
                    </View>
                  </View>
                </View>}
              onPress={() => { push({ key: 'PurchaseDetail', params: { item } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { allGoods } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          allGoods &&
          this._renderRow()
        }
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
