import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../container/LoginScreen';
import Main from '../container/Main';
import ImageCrop from '../container/ImageCrop';
import AppIndex from '../container/app';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  Login: { screen: LoginScreen },
  ImageCrop: { screen: ImageCrop },
  AppIndex: { screen: AppIndex },
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
