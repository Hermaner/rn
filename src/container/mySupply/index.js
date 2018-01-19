import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header, Loading, TOpacity } from '../../components';
import styles from './styles';

import Child from './child';

class MySupply extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }
  render() {
    const { pop } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <Header back={pop} title="我的供应" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="销售中" type="0" />
          <Child tabLabel="已下架" type="1" />
          <Child tabLabel="被驳回" type="2" />
        </ScrollableTabView>
        <TOpacity
          style={styles.bomFixedView}
          content={
            <View style={styles.bomFixedBtn}>
              <Text style={styles.bomFixedText}>发供应</Text>
            </View>
          }
          onPress={() => this.props.push({ key: 'MainSearch', params: { type: '3' } })}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
MySupply.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MySupply);
