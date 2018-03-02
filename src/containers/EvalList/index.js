import React from 'react';
import { BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Header, ScrollableTab } from '../../components';
import { popRoute, pushRoute } from '../../actions';
import Child from './child';

class EvalList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masterId: props.navigation.state.params.masterId,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  componentWillUnmount() {
  }
  render() {
    const { pop } = this.props;
    const { masterId } = this.state;
    return (
      <Container>
        <Header back={pop} title="全部评价" />
        <ScrollableTabView style={{ flex: 1 }} renderTabBar={() => <ScrollableTab />}>
          <Child tabLabel="全部" typeId="0" masterId={masterId} />
          <Child tabLabel="好评" typeId="3" masterId={masterId} />
          <Child tabLabel="中评" typeId="2" masterId={masterId} />
          <Child tabLabel="差评" typeId="1" masterId={masterId} />
        </ScrollableTabView>
      </Container>
    );
  }
}

EvalList.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute, push: pushRoute })(EvalList);
