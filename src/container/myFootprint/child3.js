import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, Loading, BusinessList } from '../../components';
import Base from './base';
import styles from './styles';

class Child3 extends Base {
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
        <View style={styles.buyTime}>
          <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
        </View>
        {
          item.map((item1, i) => (
            <BusinessList
              data={item1}
              key={i}
              onPress={() => {
                push({ key: item1.memberVerifs !== null && item1.memberVerifs !== '' && item1.memberVerifs.length > 0 ? 'StoreDetail' : 'MyInfo', params: { memberId: item1.memberId } });
              }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { noData, items } = this.state;
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
Child3.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child3);
