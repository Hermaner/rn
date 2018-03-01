import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'native-base';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, ScrollableTab } from '../../components';
import List from './List';

class MgMasterTxList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPage: props.navigation.state.params.initialPage,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    const { pop } = this.props;
    const { initialPage } = this.state;
    return (
      <Container>
        <Header back={pop} title="服务订单" />
        <ScrollableTabView
          style={{ flex: 1 }}
          initialPage={initialPage}
          renderTabBar={() => <ScrollableTab />}
        >
          <List tabLabel="全部" status="2" />
          <List tabLabel="成功" status="3" />
          <List tabLabel="失败" status="4" />
        </ScrollableTabView>
      </Container>
    );
  }
}

MgMasterTxList.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(MgMasterTxList);
