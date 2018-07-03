import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, GoodList } from '../../components';

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
      <GoodList
        data={item}
        rowID={index}
        key={index}
        onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
      />
    );
  }
  render() {
    const { goodsItems } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          <OptimizedFlatList
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
