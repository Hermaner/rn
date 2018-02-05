import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Icon, Content } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { popRoute, pushRoute } from '../../actions';
import { ScrollableTab, Header } from '../../components';
import notificationSystemBase from './base';
import styles from './styles';

import Child from './child';

class NotificationSystem extends notificationSystemBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  _randerBody() {
    return (
      <View style={styles.pagebody}>
        <Child />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="系统通知" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._randerBody()}
        </Content>
      </Container>
    );
  }
}

NotificationSystem.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(NotificationSystem);
