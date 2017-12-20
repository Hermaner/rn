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
import Payroll from '../container/payroll';
import GoodDetail from '../container/goodDetail';
import StoreDetail from '../container/storeDetail';
import WhyChoose from '../container/whyChoose';
import AdjectiveInfo from '../container/adjectiveInfo';
import ReportPage from '../container/reportPage';
import ReportDetailPage from '../container/reportDetailPage';
import AddAccount from '../container/addAccount';
import GatheringAccount from '../container/gatheringAccount';
import AccountCenter from '../container/accountCenter';
import ChooseAccountType from '../container/chooseAccountType';
import My from '../container/my';
import SelfSet from '../container/selfSet';
import EvalList from '../container/evalList';
import Certification from '../container/certification';
import IndividualAuthentication from '../container/individualAuthentication';
import CollectiveAuthentication from '../container/collectiveAuthentication';
import AboutUs from '../container/aboutUs';
import SystemSet from '../container/systemSet';
import PurchaseHome from '../container/purchaseHome';
import PurchaseDetail from '../container/purchaseDetail';
import MySupply from '../container/mySupply';
import MyRelease from '../container/myRelease';
import MyBuyGoods from '../container/myBuyGoods';
import MySoldGoods from '../container/mySoldGoods';
import MySendOffer from '../container/mySendOffer';
import MyNichePush from '../container/myNichePush';

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
  EvalList: { screen: EvalList },
  Payroll: { screen: Payroll },
  WhyChoose: { screen: WhyChoose },
  AdjectiveInfo: { screen: AdjectiveInfo },
  ReportPage: { screen: ReportPage },
  ReportDetailPage: { screen: ReportDetailPage },
  AddAccount: { screen: AddAccount },
  GatheringAccount: { screen: GatheringAccount },
  AccountCenter: { screen: AccountCenter },
  ChooseAccountType: { screen: ChooseAccountType },
  Certification: { screen: Certification },
  My: { screen: My },
  SelfSet: { screen: SelfSet },
  IndividualAuthentication: { screen: IndividualAuthentication },
  CollectiveAuthentication: { screen: CollectiveAuthentication },
  AboutUs: { screen: AboutUs },
  SystemSet: { screen: SystemSet },
  PurchaseHome: { screen: PurchaseHome },
  PurchaseDetail: { screen: PurchaseDetail },
  MySupply: { screen: MySupply },
  MyRelease: { screen: MyRelease },
  MyBuyGoods: { screen: MyBuyGoods },
  MySoldGoods: { screen: MySoldGoods },
  MySendOffer: { screen: MySendOffer },
  MyNichePush: { screen: MyNichePush },
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
