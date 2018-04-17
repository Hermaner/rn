import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DeviceEventEmitter, View, Platform, Dimensions } from 'react-native';
import { Root } from 'native-base';
import { Initializer } from 'react-native-baidumap-sdk';
import {
  createReduxBoundAddListener,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';
import { SocketObser } from '../components';

import LoginScreen from '../container/LoginScreen';
import Main from '../container/Main';
import MainSearch from '../container/mainSearch';
import CgCategory from '../container/cgCategory';
import CgSkus from '../container/cgSkus';
import CgxSkus from '../container/cgxSkus';
import CgCitys from '../container/cgCitys';
import CgDemand from '../container/cgDemand';
import CgComfirm from '../container/cgComfirm';
import CgxComfirm from '../container/cgxComfirm';
import CgyComfirm from '../container/cgyComfirm';
import CgyxComfirm from '../container/cgyxComfirm';
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
import MySetting from '../container/MySetting';
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
import SeePrice from '../container/seePrice';
import PriceDetail from '../container/priceDetail';
import PriceInfo from '../container/priceInfo';
import SetPassword from '../container/setPassword';
import EnlistBusiness from '../container/enlistBusiness';
import OtherInfo from '../container/otherInfo';
// import GoodBusinessDetail from '../container/goodBusinessDetail';
import HuinongGoodsMotif from '../container/huinongGoodsMotif';
import HomeMainList from '../container/homeMainList';
import ReleaseMainList from '../container/releaseMainList';
import RecommendBusiness from '../container/recommendBusiness';
import SampleMainList from '../container/sampleMainList';
import SampleCenter from '../container/sampleCenter';
import EnsureMainList from '../container/ensureMainList';
import OrderDetail from '../container/orderDetail';
import OrderInfo from '../container/orderInfo';
import OrderInfoSeller from '../container/orderInfoSeller';
import OrderPay from '../container/orderPay';
import OrderSendGoods from '../container/orderSendGoods';
import OrderThink from '../container/orderThink';
import OrderLOG from '../container/orderLOG';
import ReviewKnow from '../container/reviewKnow';
import ReviewKnow2 from '../container/reviewKnow2';
import MySoldGoodsWaitRevise from '../container/mySoldGoodsWaitRevise';
import MemberInfo from '../container/memberInfo';
import MarketHall from '../container/MarketHall';
import MarketHallList from '../container/MarketHallList';
import MarketHallDetail from '../container/MarketHallDetail';
import MyAddress from '../container/MyAddress';
import MyAddressCreate from '../container/MyAddressCreate';
import Categorys from '../container/Categorys';
import CategorysBrands from '../container/CategorysBrands';
import StrengthBusiness from '../container/strengthBusiness';
import HighQualityPurchasers from '../container/highQualityPurchasers';
import ProductSignedUp from '../container/productSignedUp';
import SignUp from '../container/signUp';
import FacilitatorRecruit from '../container/facilitatorRecruit';
import RevisePassword from '../container/revisePassword';
import IntroducePage from '../container/introducePage';
import InvestigationInfo from '../container/investigationInfo';
import MyAccount from '../container/MyAccount';
import MgMasterTxList from '../container/MgMasterTxList';
import MyDrawAdd from '../container/MyDrawAdd';
import MyDrawList from '../container/MyDrawList';
import MyTixian from '../container/MyTixian';
import SetPayPassword from '../container/setPayPassword';
import SetPayPasswordUsOldPassword from '../container/setPayPasswordUsOldPassword';
import MyCollect from '../container/myCollect';
import DynamicEval from '../container/dynamicEval';
import StoreEvalList from '../container/storeEvalList';
import MessageSet from '../container/messageSet';
import MyFriend from '../container/myFriend';
import FriendCitys from '../container/friendCitys';
import UserIdentity from '../container/userIdentity';
import LogisticsInfo from '../container/logisticsInfo';
import ChatRoom from '../container/ChatRoom';
import ChatPhrase from '../container/ChatPhrase';
import ChatPhraseChange from '../container/ChatPhraseChange';
import ChatImage from '../container/ChatImage';
import ChatSupply from '../container/ChatSupply';
import NewcomerStudy from '../container/newcomerStudy';
import CallLog from '../container/callLog';
import BuyerProtection from '../container/buyerProtection';
import ImgInfo from '../container/imgInfo';
import SearchPeople from '../container/searchPeople';
import ReturnGoods from '../container/returnGoods';
import ReturnOrderLOG from '../container/returnOrderLOG';

export const AppNavigator = StackNavigator({
  ChatSupply: { screen: ChatSupply },
  ChatPhrase: { screen: ChatPhrase },
  ChatPhraseChange: { screen: ChatPhraseChange },
  ChatImage: { screen: ChatImage },
  ChatRoom: { screen: ChatRoom },
  CategorysBrands: { screen: CategorysBrands },
  Categorys: { screen: Categorys },
  MyAddress: { screen: MyAddress },
  MyAddressCreate: { screen: MyAddressCreate },
  Main: { screen: Main },
  MarketHallList: { screen: MarketHallList },
  MarketHallDetail: { screen: MarketHallDetail },
  MarketHall: { screen: MarketHall },
  MainSearch: { screen: MainSearch },
  CgCategory: { screen: CgCategory },
  CgSkus: { screen: CgSkus },
  CgxSkus: { screen: CgxSkus },
  CgCitys: { screen: CgCitys },
  CgDemand: { screen: CgDemand },
  CgComfirm: { screen: CgComfirm },
  CgxComfirm: { screen: CgxComfirm },
  CgyComfirm: { screen: CgyComfirm },
  CgyxComfirm: { screen: CgyxComfirm },
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
  WhyChoose: { screen: WhyChoose },
  AdjectiveInfo: { screen: AdjectiveInfo },
  ReportPage: { screen: ReportPage },
  ReportDetailPage: { screen: ReportDetailPage },
  AddAccount: { screen: AddAccount },
  GatheringAccount: { screen: GatheringAccount },
  AccountCenter: { screen: AccountCenter },
  Certification: { screen: Certification },
  My: { screen: My },
  MySetting: { screen: MySetting },
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
  SeePrice: { screen: SeePrice },
  PriceDetail: { screen: PriceDetail },
  PriceInfo: { screen: PriceInfo },
  SetPassword: { screen: SetPassword },
  EnlistBusiness: { screen: EnlistBusiness },
  OtherInfo: { screen: OtherInfo },
  // GoodBusinessDetail: { screen: GoodBusinessDetail },
  HuinongGoodsMotif: { screen: HuinongGoodsMotif },
  HomeMainList: { screen: HomeMainList },
  ReleaseMainList: { screen: ReleaseMainList },
  RecommendBusiness: { screen: RecommendBusiness },
  SampleMainList: { screen: SampleMainList },
  SampleCenter: { screen: SampleCenter },
  EnsureMainList: { screen: EnsureMainList },
  OrderDetail: { screen: OrderDetail },
  OrderInfo: { screen: OrderInfo },
  OrderInfoSeller: { screen: OrderInfoSeller },
  OrderPay: { screen: OrderPay },
  OrderSendGoods: { screen: OrderSendGoods },
  OrderThink: { screen: OrderThink },
  OrderLOG: { screen: OrderLOG },
  ReviewKnow: { screen: ReviewKnow },
  ReviewKnow2: { screen: ReviewKnow2 },
  MySoldGoodsWaitRevise: { screen: MySoldGoodsWaitRevise },
  MemberInfo: { screen: MemberInfo },
  StrengthBusiness: { screen: StrengthBusiness },
  HighQualityPurchasers: { screen: HighQualityPurchasers },
  ProductSignedUp: { screen: ProductSignedUp },
  SignUp: { screen: SignUp },
  FacilitatorRecruit: { screen: FacilitatorRecruit },
  RevisePassword: { screen: RevisePassword },
  IntroducePage: { screen: IntroducePage },
  InvestigationInfo: { screen: InvestigationInfo },
  MyAccount: { screen: MyAccount },
  MgMasterTxList: { screen: MgMasterTxList },
  MyDrawAdd: { screen: MyDrawAdd },
  MyDrawList: { screen: MyDrawList },
  MyTixian: { screen: MyTixian },
  SetPayPassword: { screen: SetPayPassword },
  SetPayPasswordUsOldPassword: { screen: SetPayPasswordUsOldPassword },
  MyCollect: { screen: MyCollect },
  DynamicEval: { screen: DynamicEval },
  StoreEvalList: { screen: StoreEvalList },
  MessageSet: { screen: MessageSet },
  MyFriend: { screen: MyFriend },
  FriendCitys: { screen: FriendCitys },
  UserIdentity: { screen: UserIdentity },
  LogisticsInfo: { screen: LogisticsInfo },
  NewcomerStudy: { screen: NewcomerStudy },
  CallLog: { screen: CallLog },
  BuyerProtection: { screen: BuyerProtection },
  ImgInfo: { screen: ImgInfo },
  SearchPeople: { screen: SearchPeople },
  ReturnGoods: { screen: ReturnGoods },
  ReturnOrderLOG: { screen: ReturnOrderLOG },
}, {
  headerMode: 'screen',
  navigationOptions: () => ({
    header: null,
  }),
});
Initializer.init('NGe39sDcxR1CywyfIw9TCktq14lvGkxM').catch(e => console.error(e));
createReactNavigationReduxMiddleware(
  'root',
  state => state.nav,
);
const platform = Platform.OS;
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const isIphoneX = platform === 'ios' && deviceHeight === 812 && deviceWidth === 375;

const addListener = createReduxBoundAddListener('root');
// const AppWithNavigationState = ({ dispatch, nav }) => (
//   <Root>
//     <AppNavigator
//       navigation={addNavigationHelpers({
//         dispatch,
//         state: nav,
//         addListener,
//       })}
//     />
//   </Root>
// );
class AppWithNavigationState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDot: false,
    };
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('notifyGetNoReadCount', () => {
      SocketObser.socket.on('notifyGetNoReadCount', (data) => {
        console.log(data)
        this.setState({
          isDot: data > 0,
        });
      });
    });
  }
  render() {
    const { dispatch, nav } = this.props;
    const { isDot } = this.state;
    return (
      <Root>
        <AppNavigator
          navigation={addNavigationHelpers({
            dispatch,
            state: nav,
            addListener,
          })}
        />
        {
          isDot && nav.index === 0 &&
          <View
            style={{
              position: 'absolute',
              right: '32%',
              bottom: isIphoneX ? 64 : 30,
              backgroundColor: '#ff0000',
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
        }
      </Root>
    );
  }
}

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
