import React from 'react';
import { View, Text, ListView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
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
  componentWillUnmount() {
  }
  _renderRow = (item) => {
    const { push } = this.props;
    return (
      <View>
        <View>
          <View style={styles.buyTime}>
            <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
          </View>
          {
            item.map((item1, index) => (
              <View style={styles.goodsitem} key={index}>
                <View style={styles.goodsDetail}>
                  <View style={{ flex: 1 }}>
                    <View style={styles.goodsPrice}>
                      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 16, color: '#333' }}>{item1.brandName} {item1.categoryName} </Text>
                        {
                          item1.purchaseItems.map((item2, index2) => (
                            <Text key={index2} style={{ fontSize: 16, color: '#333' }}> {item2.specName} </Text>
                          ))
                        }
                      </View>
                      <View style={{}}>
                        {
                          item1.demand === '' ?
                            <Text style={{ fontSize: 16, color: '#FC8521' }}>面议</Text>
                          :
                            <Text style={{ fontSize: 16, color: '#FC8521' }}>{item1.demand}{item1.unit}</Text>
                        }
                      </View>
                    </View>
                    <View style={{ marginBottom: 6 }}>
                      <Text style={{ fontSize: 14, color: '#666' }}>品种:{item1.categoryName}</Text>
                    </View>
                    <View>
                      <Text style={{ fontSize: 14, color: '#666' }}>所在地:{item1.receiveProvinceName}{item1.receiveCityName}</Text>
                    </View>
                    <View style={styles.activeDetail}>
                      <View style={{ flex: 1 }}>
                        <View style={styles.time}>
                          <Text style={styles.everyWeek}>{item1.frequency}</Text>
                          <Text style={styles.scaleText}>距截止{item1.surplusTime}天</Text>
                        </View>
                      </View>
                      <TFeedback
                        content={
                          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <View style={styles.offerBox}>
                              <Text style={styles.offer}>去报价</Text>
                            </View>
                          </View>}
                        onPress={() => { push({ key: 'PurchaseDetail', params: { item: item1 } }); }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { dataSource, nomore } = this.state;
    console.log('AAAAAa', dataSource);
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          // onEndReached={this._reachEnd}
          enableEmptySections
          onEndReachedThreshold={10}
          contentContainerStyle={styles.listViewStyle}
          renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }}>
            {nomore ? '没有更多数据了' : '数据加载中...'}
          </Text>}
        />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
