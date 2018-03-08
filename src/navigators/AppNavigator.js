import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import Main from '../containers/Main';
import ServiceList from '../containers/ServiceList';
import ServiceDetail from '../containers/ServiceDetail';
import MasterDetail from '../containers/MasterDetail';
import User from '../containers/User';
import ChatRoom from '../containers/ChatRoom';
import DemandOrderDetail from '../containers/DemandOrderDetail';
import CreateConfirm from '../containers/CreateConfirm';
import CreatePay from '../containers/CreatePay';
import MemberInfo from '../containers/MemberInfo';
import InputChange from '../containers/InputChange';
import BindPhone from '../containers/BindPhone';
import Orders from '../containers/Orders';
import OrderDetail from '../containers/OrderDetail';
import OrderEval from '../containers/OrderEval';
import MyDemandOrderDetail from '../containers/MyDemandOrderDetail';
import MasterList from '../containers/MasterList';
import MasterCategory from '../containers/MasterCategory';
import EvalList from '../containers/EvalList';
import DecorateList from '../containers/DecorateList';
import DecorateDetail from '../containers/DecorateDetail';
import BmMarketList from '../containers/BmMarketList';
import BmMarketDetail from '../containers/BmMarketDetail';
import DecorateCaseDetail from '../containers/DecorateCaseDetail';
import DecorateCaseList from '../containers/DecorateCaseList';
import DecorateImageDetail from '../containers/DecorateImageDetail';
import DecorateIntrDetail from '../containers/DecorateIntrDetail';
import ApplyWant from '../containers/ApplyWant';
import ApplyOther from '../containers/ApplyOther';
import ApplyMaster from '../containers/ApplyMaster';
import ApplyDecorate from '../containers/ApplyDecorate';
import ApplyBmMarket from '../containers/ApplyBmMarket';
import GetCitys from '../containers/GetCitys';
import DemandConfirm from '../containers/DemandConfirm';
import DemandCategory from '../containers/DemandCategory';
import MyAddress from '../containers/MyAddress';
import MyAddressCreate from '../containers/MyAddressCreate';
import MyAccount from '../containers/MyAccount';
import MyCard from '../containers/MyCard';
import MyColl from '../containers/MyColl';
import MyCoupons from '../containers/MyCoupons';
import MyTixian from '../containers/MyTixian';
import PlatProblem from '../containers/PlatProblem';
import About from '../containers/About';
import Feedback from '../containers/Feedback';
import MgBmMarket from '../containers/MgBmMarket';
import MgBmMarketCert from '../containers/MgBmMarketCert';
import MgBmMarketImages from '../containers/MgBmMarketImages';
import MgBmMarketIntr from '../containers/MgBmMarketIntr';
import MgBmMarketSetting from '../containers/MgBmMarketSetting';
import MgDecorate from '../containers/MgDecorate';
import MgDecorateCert from '../containers/MgDecorateCert';
import MgDecorateCreateCase from '../containers/MgDecorateCreateCase';
import MgDecorateIntr from '../containers/MgDecorateIntr';
import MgDecorateLogo from '../containers/MgDecorateLogo';
import MgDecorateSetting from '../containers/MgDecorateSetting';
import MgMaster from '../containers/MgMaster';
import MgMasterCert from '../containers/MgMasterCert';
import MgMasterIntr from '../containers/MgMasterIntr';
import MgMasterLogo from '../containers/MgMasterLogo';
import MgMasterOrderDetail from '../containers/MgMasterOrderDetail';
import MgMasterOrders from '../containers/MgMasterOrders';
import MgMasterPublish from '../containers/MgMasterPublish';
import MgMasterSetting from '../containers/MgMasterSetting';
import MgMasterTxList from '../containers/MgMasterTxList';
import MgMasterLogList from '../containers/MgMasterLogList';
import MyMessage from '../containers/MyMessage';
import MySetting from '../containers/MySetting';
import MgMasterItems from '../containers/MgMasterItems';
import MasterCaseList from '../containers/MasterCaseList';
import MgMasterBadList from '../containers/MgMasterBadList';
import MgSecurity from '../containers/MgSecurity';
import MgMasterCategory from '../containers/MgMasterCategory';
import MyDrawList from '../containers/MyDrawList';
import MyDrawAdd from '../containers/MyDrawAdd';
import MainSearch from '../containers/MainSearch';
import UserAgreement from '../containers/UserAgreement';
import MgMasterApply from '../containers/MgMasterApply';
import MasterItems from '../containers/MasterItems';
import ChangePassword from '../containers/ChangePassword';

export const AppNavigator = StackNavigator({
  MgMasterBadList: { screen: MgMasterBadList },
  MgMasterCategory: { screen: MgMasterCategory },
  ChangePassword: { screen: ChangePassword },
  MasterItems: { screen: MasterItems },
  MgMasterLogList: { screen: MgMasterLogList },
  MgMasterApply: { screen: MgMasterApply },
  UserAgreement: { screen: UserAgreement },
  MainSearch: { screen: MainSearch },
  MyDrawAdd: { screen: MyDrawAdd },
  MyDrawList: { screen: MyDrawList },
  MgSecurity: { screen: MgSecurity },
  MasterCaseList: { screen: MasterCaseList },
  MgMasterItems: { screen: MgMasterItems },
  MyMessage: { screen: MyMessage },
  MgBmMarketCert: { screen: MgBmMarketCert },
  MgBmMarket: { screen: MgBmMarket },
  MySetting: { screen: MySetting },
  MyAccount: { screen: MyAccount },
  MgBmMarketImages: { screen: MgBmMarketImages },
  MgBmMarketIntr: { screen: MgBmMarketIntr },
  MgBmMarketSetting: { screen: MgBmMarketSetting },
  MgDecorate: { screen: MgDecorate },
  MgDecorateCert: { screen: MgDecorateCert },
  MgDecorateCreateCase: { screen: MgDecorateCreateCase },
  MgDecorateIntr: { screen: MgDecorateIntr },
  MgDecorateLogo: { screen: MgDecorateLogo },
  MgDecorateSetting: { screen: MgDecorateSetting },
  MgMaster: { screen: MgMaster },
  MgMasterCert: { screen: MgMasterCert },
  MgMasterIntr: { screen: MgMasterIntr },
  MgMasterLogo: { screen: MgMasterLogo },
  MgMasterOrderDetail: { screen: MgMasterOrderDetail },
  MgMasterOrders: { screen: MgMasterOrders },
  MgMasterPublish: { screen: MgMasterPublish },
  MgMasterSetting: { screen: MgMasterSetting },
  MgMasterTxList: { screen: MgMasterTxList },
  MyAddress: { screen: MyAddress },
  MyCard: { screen: MyCard },
  MyColl: { screen: MyColl },
  MyCoupons: { screen: MyCoupons },
  MyTixian: { screen: MyTixian },
  PlatProblem: { screen: PlatProblem },
  About: { screen: About },
  Feedback: { screen: Feedback },
  MyAddressCreate: { screen: MyAddressCreate },
  Main: { screen: Main },
  User: { screen: User },
  ServiceList: { screen: ServiceList },
  ServiceDetail: { screen: ServiceDetail },
  MasterDetail: { screen: MasterDetail },
  ChatRoom: { screen: ChatRoom },
  DemandOrderDetail: { screen: DemandOrderDetail },
  CreateConfirm: { screen: CreateConfirm },
  CreatePay: { screen: CreatePay },
  MemberInfo: { screen: MemberInfo },
  InputChange: { screen: InputChange },
  BindPhone: { screen: BindPhone },
  Orders: { screen: Orders },
  OrderDetail: { screen: OrderDetail },
  OrderEval: { screen: OrderEval },
  MyDemandOrderDetail: { screen: MyDemandOrderDetail },
  MasterList: { screen: MasterList },
  MasterCategory: { screen: MasterCategory },
  EvalList: { screen: EvalList },
  DecorateList: { screen: DecorateList },
  DecorateDetail: { screen: DecorateDetail },
  BmMarketList: { screen: BmMarketList },
  BmMarketDetail: { screen: BmMarketDetail },
  DecorateCaseDetail: { screen: DecorateCaseDetail },
  DecorateCaseList: { screen: DecorateCaseList },
  DecorateImageDetail: { screen: DecorateImageDetail },
  DecorateIntrDetail: { screen: DecorateIntrDetail },
  ApplyWant: { screen: ApplyWant },
  ApplyOther: { screen: ApplyOther },
  ApplyMaster: { screen: ApplyMaster },
  ApplyDecorate: { screen: ApplyDecorate },
  ApplyBmMarket: { screen: ApplyBmMarket },
  GetCitys: { screen: GetCitys },
  DemandConfirm: { screen: DemandConfirm },
  DemandCategory: { screen: DemandCategory },
}, {
  headerMode: 'screen',
  navigationOptions: () => ({
    header: null,
  }),
});

createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const addListener = createReduxBoundAddListener('root');
const AppWithNavigationState = ({ dispatch, nav }) => (
  <Root>
    <AppNavigator
      navigation={addNavigationHelpers({
        dispatch,
        state: nav,
        addListener,
      })}
    />
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
