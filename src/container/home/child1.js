import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { GoodList } from '../../components';

class Child1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    const { push, data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <GoodList
              data={item}
              rowID={index}
              key={index}
              onPress={() => { push({ key: 'GoodDetail', params: { supplyId: item.supplyId } }); }}
            />
          ))
        }
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child1);
