import React from 'react';
import { View, ListView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, BusinessList } from '../../components';
import Base2 from './base2';
import styles from './styles';

class Child2 extends Base2 {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.business();
  }
  _renderRow = (item, index) => {
    const { push } = this.props;
    return (
      <BusinessList
        data={item}
        rowID={index}
        key={index}
        onPress={() => { push({ key: 'StoreDetail', params: { info: item, name: item.nickName } }); }}
      />
    );
  }
  render() {
    const { dataSource } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          onEndReached={this._reachEnd}
          enableEmptySections
          onEndReachedThreshold={10}
          contentContainerStyle={styles.listViewStyle}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
