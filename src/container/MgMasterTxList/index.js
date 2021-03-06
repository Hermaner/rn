import React from 'react';
import PropTypes from 'prop-types';
import { BackHandler } from 'react-native';
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
      // initialPage: props.navigation.state.params.initialPage,
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
  render() {
    const { pop } = this.props;
    // const { initialPage } = this.state;
    return (
      <Container>
        <Header back={pop} title="提现记录" />
        <ScrollableTabView
          style={{ flex: 1 }}
          // initialPage="0"
          renderTabBar={() => <ScrollableTab />}
        >
          <List tabLabel="成功" status="2" />
          <List tabLabel="处理中" status="1" />
          <List tabLabel="失败" status="3" />
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
