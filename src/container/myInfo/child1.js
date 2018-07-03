import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, GoodList } from '../../components';
import { pushRoute } from '../../actions';

class Child1 extends React.Component {
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
            <GoodList
              data={item}
              rowID={index}
              key={index}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId, memberId: item.memberId } }); }}
            />
          ))
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
  memberId: PropTypes.string,
};
export default connect(null, { push: pushRoute })(Child1);
