import React from 'react';
import { View, Text } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData } from '../../components';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
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
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <TFeedback
        content={
          <View style={styles.rowBox}>
            <View style={styles.rowBoxInner}>
              <View style={styles.needNameBox}>
                <View style={styles.borderLeft} />
                <View style={styles.needBox}>
                  <Text numberOfLines={1} style={styles.needTitle}>紧急采购 ({item.categoryName})</Text>
                </View>
                <View style={styles.borderRight} />
              </View>
              <View style={styles.requireBox}>
                <Text numberOfLines={4} style={styles.requireText}>
                  要求：{item.memo}
                </Text>
              </View>
              <View style={styles.adressBox}>
                <Text numberOfLines={1} style={styles.adress}>
                  {item.receiveProvinceName}{item.receiveCityName}
                </Text>
                <Text style={styles.needCount}>
                  {item.demand}{item.unit}
                </Text>
              </View>
            </View>
            <View style={styles.btnBox}>
              <View style={styles.leftBtn}>
                <Text style={styles.leftBtnText}>{item.nickName}</Text>
              </View>
              <View style={styles.rightBtn}>
                <Text style={styles.rightBtnText}>我要报价</Text>
              </View>
            </View>
          </View>}
        onPress={() => { push({ key: global.memberId ? 'PurchaseDetail' : 'User', params: { item, purchaseId: item.purchaseId } }); }}
      />
    );
  }
  render() {
    const { items, noData } = this.state;
    return (
      <Container>
        {
          !noData ?
            <Content>
              <View style={styles.bigBox}>
                {
                  items.map((item, index) => (
                    <View key={index}>
                      {this._renderRow(item, index)}
                    </View>
                  ))
                }
              </View>
            </Content>
            :
            <View style={{ flex: 1 }}>
              <NoData
                label="没有相关数据"
              />
            </View>
        }
      </Container>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
