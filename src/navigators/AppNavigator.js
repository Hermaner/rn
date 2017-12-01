import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../components/LoginScreen';
import Main from '../components/Main';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  Login: { screen: LoginScreen },
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
