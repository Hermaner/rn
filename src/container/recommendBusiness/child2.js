import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { BusinessList } from '../../components';

class Child2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const { push, data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <BusinessList
              data={item}
              rowID={index}
              key={index}
              onPress={() => { push({ key: 'StoreDetail', params: { memberId: item.memberId } }); }}
            />
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
