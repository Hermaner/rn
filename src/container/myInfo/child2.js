import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TFeedback } from '../../components';
import { pushRoute } from '../../actions';
import styles from './styles';

class Child2 extends React.Component {
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
              <View style={styles.buyGoodsItem}>
                <Text style={styles.buyGoodsName}>{item.categoryName}</Text>
                <View style={styles.flexRow}>
                  <Text style={styles.buyGoodsVariety}>品种: {item.brandName}</Text>
                  <Text style={styles.flexRight}>{item.demand}{item.unit}</Text>
                </View>
                <Text style={styles.buyGoodsPlace}>
                  所在地: {item.receiveProvinceName}{item.receiveCityName}
                </Text>
                <View style={styles.flexRow}>
                  <View style={{ flex: 1 }} />
                  <TFeedback
                    content={
                      <View style={styles.goBuyBtnBox}>
                        <Text style={styles.goBuyBtn}>去报价</Text>
                      </View>}
                    onPress={() => { push({ key: 'PurchaseDetail', params: { item } }); }}
                  />
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
}
Child2.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child2);
