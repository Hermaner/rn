import TLight from './TLight';
import TOpacity from './TOpacity';
import TFeedback from './TFeedback';
import Header from './Header';
import GoodList from './goodList';
import GoodhList from './goodhList';
import NoData from './NoData';
import ModalView from './ModalView';
import MyModalView from './MyModalView';
import ScrollableTab from './ScrollableTab';
import InputNumber from './InputNumber';
import UploadFile from './UploadFile';
import PeopleUploadFile from './PeopleUploadFile';
import Loading from './Loading';
import Iconfont from './Iconfont';
import BusinessList from './businessList';
import LoadMore from './loadMore';
import LoadNoMore from './loadNoMore';
import SampleGoodList from './SampleGoodList';
import EnsureGoodList from './EnsureGoodList';
import Select from './Select';
import MaketHallItem from './MaketHallItem';
import MaketHallList from './MaketHallList';
import UserObser from './UserObser';
import CheckBox from './CheckBox';
import HomeSearch from './HomeSearch';
import MHeader from './MHeader';
import UploadLogo from './UploadLogo';
import ImageLook from './ImageLook';
import TitleItem from './TitleItem';
import ScrollableStatusTab from './ScrollableStatusTab';
import Upload from './Upload';
import BHeader from './BHeader';
import ModalCall from './ModalCall';
import ChatHeader from './ChatHeader';
import Chat from './chat/GiftedChat';
import SocketStore from './socket/SocketStore';

const UserSocket = new UserObser();
const SocketObser = new SocketStore();

export {
  ModalCall,
  ChatHeader,
  TLight,
  BHeader,
  Chat,
  SocketObser,
  Upload,
  ImageLook,
  CheckBox,
  MHeader,
  HomeSearch,
  MaketHallItem,
  MaketHallList,
  UserSocket,
  TOpacity,
  Select,
  LoadMore,
  LoadNoMore,
  GoodList,
  Iconfont,
  Loading,
  TFeedback,
  ModalView,
  MyModalView,
  InputNumber,
  NoData,
  UploadFile,
  PeopleUploadFile,
  GoodhList,
  Header,
  ScrollableTab,
  BusinessList,
  SampleGoodList,
  EnsureGoodList,
  UploadLogo,
  TitleItem,
  ScrollableStatusTab,
};
