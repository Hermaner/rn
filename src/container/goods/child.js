import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
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
  _renderRow = () => {
    const { push, data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.buyGoodsItems}>
                  <View style={styles.buyGoodsItem}>
                    <View style={styles.itemNameLine}>
                      <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
                      <Text style={styles.buyGoodsVariety}>
                        ({item.brandName}{item.categoryName})
                      </Text>
                      <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
                    </View>
                    <View style={[styles.itemNameLine, { justifyContent: 'space-between', height: 30 }]}>
                      <View style={styles.userDoBox}>
                        <Text style={styles.userDo}>{item.member.identityName}</Text>
                      </View>
                      <View style={styles.flexRow}>
                        {
                          item.frequency !== '' &&
                          <View style={styles.everyWeekBox}>
                            <Text style={styles.everyWeek}>
                              {item.frequency}
                            </Text>
                          </View>
                        }
                        <View style={styles.flexRow}>
                          <Text style={styles.howLong}>距截止</Text>
                          <Text style={styles.howLongDay}>{item.purchaseTime}</Text>
                          <Text style={styles.howLong}>天</Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.flexRow}>
                      <Text style={styles.buyGoodsPlace}>
                        所在地: {item.receiveProvinceName}{item.receiveCityName}
                      </Text>
                      <View style={styles.goBuyBtnBox}>
                        <Text style={styles.goBuyBtn}>去报价</Text>
                      </View>
                    </View>
                  </View>
                </View>}
              onPress={() => { push({ key: global.memberId ? 'PurchaseDetail' : 'User', params: { item, purchaseId: item.purchaseId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {this._renderRow()}
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child);
