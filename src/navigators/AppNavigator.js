import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../container/LoginScreen';
import Main from '../container/Main';
import MainSearch from '../container/mainSearch';
import MainSearcher from '../container/mainSearcher';
import MainList from '../container/mainList';
import ImageCrop from '../container/ImageCrop';
import User from '../container/user';
import Agreement from '../container/user/agreement';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  MainSearch: { screen: MainSearch },
  MainSearcher: { screen: MainSearcher },
  MainList: { screen: MainList },
  User: { screen: User },
  Agreement: { screen: Agreement },
  Login: { screen: LoginScreen },
  ImageCrop: { screen: ImageCrop },
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
