import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container } from 'native-base';
import PropTypes from 'prop-types';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { ScrollableTab, Header, Loading } from '../../components';
import styles from './styles';

import Child1 from './child1';
import Child2 from './child2';

class CollectiveAuthentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    return (
      <View style={styles.pagebody}>
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child1 tabLabel="三证合一" />
          <Child2 tabLabel="营业执照" />
        </ScrollableTabView>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="企业认证" />
        {this._renderBody()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CollectiveAuthentication.propTypes = {
  pop: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CollectiveAuthentication);
