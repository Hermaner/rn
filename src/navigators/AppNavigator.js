import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Root } from 'native-base';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from '../container/LoginScreen';
import Main from '../container/Main';
import MainSearch from '../container/mainSearch';
import CgCategory from '../container/cgCategory';
import CgSkus from '../container/cgSkus';
import CgCitys from '../container/cgCitys';
import CgDemand from '../container/cgDemand';
import CgComfirm from '../container/cgComfirm';
import CgyComfirm from '../container/cgyComfirm';
import CgyCitys from '../container/cgyCitys';
import CgySpot from '../container/cgySpot';
import CgyPrice from '../container/cgyPrice';
import CgyDesc from '../container/cgyDesc';
import CgyServices from '../container/cgyServices';
import CbjConfirm from '../container/cbjConfirm';
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
import MyVisitor from '../container/myVisitor';
import MyInfo from '../container/myInfo';
import MyFootprint from '../container/myFootprint';
import VisitDetail from '../container/visitDetail';
import TalkBusiness from '../container/talkBusiness';
import Bill from '../container/bill';
import NotificationSystem from '../container/notificationSystem';
import NotificationSystemDetail from '../container/notificationSystemDetail';
import RevisePhone from '../container/revisePhone';
import UserInfo from '../container/userInfo';
import ShippingAddress from '../container/shippingAddress';
import AddAddress from '../container/addAddress';
import Authentication from '../container/authentication';
import ClauseAndAgreement from '../container/clauseAndAgreement';
import Keyword from '../container/keyword';
import KeywordReturn from '../container/keywordReturn';
import ValidatePhone from '../container/validatePhone';
import HuinongConsult from '../container/huinongConsult';
import HuinongConsultDetail from '../container/huinongConsultDetail';
import Comment from '../container/comment';
import AccountNumberType from '../container/accountNumberType';
import AddPersonalAccount from '../container/addPersonalAccount';
import ChooseGatheringAccountNumbers from '../container/chooseGatheringAccountNumbers';
import Cash from '../container/cash';
import CashRule from '../container/cashRule';
import ReleaseSuccess from '../container/releaseSuccess';
import ReviseSuccess from '../container/reviseSuccess';

export const AppNavigator = StackNavigator({
  Main: { screen: Main },
  MainSearch: { screen: MainSearch },
  CgCategory: { screen: CgCategory },
  CgSkus: { screen: CgSkus },
  CgCitys: { screen: CgCitys },
  CgDemand: { screen: CgDemand },
  CgComfirm: { screen: CgComfirm },
  CgyComfirm: { screen: CgyComfirm },
  CgyCitys: { screen: CgyCitys },
  CgySpot: { screen: CgySpot },
  CgyPrice: { screen: CgyPrice },
  CgyDesc: { screen: CgyDesc },
  CgyServices: { screen: CgyServices },
  CbjConfirm: { screen: CbjConfirm },
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
  MyVisitor: { screen: MyVisitor },
  MyInfo: { screen: MyInfo },
  MyFootprint: { screen: MyFootprint },
  VisitDetail: { screen: VisitDetail },
  TalkBusiness: { screen: TalkBusiness },
  Bill: { screen: Bill },
  NotificationSystem: { screen: NotificationSystem },
  NotificationSystemDetail: { screen: NotificationSystemDetail },
  RevisePhone: { screen: RevisePhone },
  UserInfo: { screen: UserInfo },
  ShippingAddress: { screen: ShippingAddress },
  AddAddress: { screen: AddAddress },
  Authentication: { screen: Authentication },
  ClauseAndAgreement: { screen: ClauseAndAgreement },
  Keyword: { screen: Keyword },
  KeywordReturn: { screen: KeywordReturn },
  ValidatePhone: { screen: ValidatePhone },
  HuinongConsult: { screen: HuinongConsult },
  HuinongConsultDetail: { screen: HuinongConsultDetail },
  Comment: { screen: Comment },
  AccountNumberType: { screen: AccountNumberType },
  AddPersonalAccount: { screen: AddPersonalAccount },
  ChooseGatheringAccountNumbers: { screen: ChooseGatheringAccountNumbers },
  Cash: { screen: Cash },
  CashRule: { screen: CashRule },
  ReleaseSuccess: { screen: ReleaseSuccess },
  ReviseSuccess: { screen: ReviseSuccess },
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
