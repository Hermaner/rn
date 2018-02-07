import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Main from '../containers/Main';
import ServiceList from '../containers/ServiceList';
import ServiceDetail from '../containers/ServiceDetail';
import MasterDetail from '../containers/MasterDetail';
import User from '../containers/User';
import ChatRoom from '../containers/ChatRoom';
import DemandOrderDetail from '../containers/DemandOrderDetail';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  User: { screen: User },
  ServiceList: { screen: ServiceList },
  ServiceDetail: { screen: ServiceDetail },
  MasterDetail: { screen: MasterDetail },
  ChatRoom: { screen: ChatRoom },
  DemandOrderDetail: { screen: DemandOrderDetail },
}, {
  headerMode: 'screen',
  navigationOptions: () => ({
    header: null,
  }),
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <Root>
    <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
  </Root>
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
