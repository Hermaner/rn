import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, Loading, ReleaseList } from '../../components';
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
  _renderRow = ({ item }) => {
    const { push } = this.props;
    return (
      <View>
        <View>
          <View style={styles.buyTime}>
            <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
          </View>
          {
            item.map((item1, index) => (
              <ReleaseList
                item={item1}
                rowID={index}
                key={index}
                onPress={() => { push({ key: global.memberId ? 'PurchaseDetail' : 'User', params: { item: item1, purchaseId: item1.purchaseId } }); }}
              />
            ))
          }
        </View>
      </View>
    );
  }
  render() {
    const { items, noData } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            />
            :
            <NoData
              label="没有相关数据"
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
