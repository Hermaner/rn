import React from 'react';
import { View, Text } from 'react-native';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { CachedImage } from 'react-native-img-cache';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, Loading, GoodList } from '../../components';
import Base from './base';
import { ColorList } from '../../utils';
import styles from './styles';

class Child2 extends Base {
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
    const { tu } = this.state;
    return (
      <View>
        <View style={styles.buyTime}>
          <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
        </View>
        {
          item.map((item1, i) => (
            <GoodList
              data={item1}
              rowID={i}
              key={i}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item1.supplyId, memberId: item1.memberId } }); }}
            />
          ))
        }
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
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
