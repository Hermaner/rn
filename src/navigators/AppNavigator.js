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
import ChatIndex from '../containers/ChatIndex';
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

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  User: { screen: User },
  ServiceList: { screen: ServiceList },
  ServiceDetail: { screen: ServiceDetail },
  MasterDetail: { screen: MasterDetail },
  ChatRoom: { screen: ChatRoom },
  ChatIndex: { screen: ChatIndex },
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
