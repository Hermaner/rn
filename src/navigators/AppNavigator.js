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
import GoodsScreen from '../container/goodsScreen';
import ImageCrop from '../container/ImageCrop';
import User from '../container/user';
import Agreement from '../container/user/agreement';
<<<<<<< HEAD
import Payroll from '../container/payroll';
=======
import GoodDetail from '../container/goodDetail';
import StoreDetail from '../container/storeDetail';
>>>>>>> 0d90e3b2688f89a3dc27758ecbcc10f63a13fe05

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  MainSearch: { screen: MainSearch },
  MainSearcher: { screen: MainSearcher },
  MainList: { screen: MainList },
  GoodsScreen: { screen: GoodsScreen },
  StoreDetail: { screen: StoreDetail },
  GoodDetail: { screen: GoodDetail },
  User: { screen: User },
  Agreement: { screen: Agreement },
  Login: { screen: LoginScreen },
  ImageCrop: { screen: ImageCrop },
  Payroll: { screen: Payroll },
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
