import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { ReleaseList } from '../../components';

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
  _renderRow = () => {
    const { push, data } = this.props;
    return (
      <View>
        {
          data.map((item, index) => (
            <ReleaseList
              item={item}
              rowID={index}
              key={index}
              onPress={() => { push({ key: global.memberId ? 'PurchaseDetail' : 'User', params: { item, purchaseId: item.purchaseId } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {this._renderRow()}
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
  data: PropTypes.array,
};
export default connect(null, { push: pushRoute })(Child);
