import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, GoodList } from '../../components';
import Base1 from './base1';

class Child1 extends Base1 {
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
  _renderRow = () => {
    const { push } = this.props;
    const { items, memberId } = this.state;
    return (
      <View>
        {
          items.map((item, index) => (
            <GoodList
              data={item}
              rowID={index}
              key={index}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, member: memberId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={{ backgroundColor: '#f6f6f6' }}>
        {this._renderRow()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
