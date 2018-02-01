import { StyleSheet, Dimensions } from 'react-native';
import { st, spx, Mcolor } from '../../utils';

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  ...st,
  headerNavigation: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerNavigationText: {
    fontSize: 14,
    color: '#555',
  },
  mainIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    ...st.jacenter,
    marginBottom: 6,
  },
  mainIconFont: {
    fontSize: 24,
    color: '#fff',
  },
  SampleCenterText: {
    fontSize: 14,
    color: '#333',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
    paddingLeft: 10,
  },
  textCenter: {
    textAlign: 'center',
  },
  gong: {
    fontSize: 30,
    color: '#53E0B5',
    textAlign: 'center',
  },
  hang: {
    fontSize: 30,
    color: '#FAC342',
    textAlign: 'center',
  },
  hui: {
    fontSize: 30,
    marginLeft: 5,
    textAlign: 'center',
    color: '#9ED63C',
  },
  my: {
    fontSize: 30,
    marginTop: 2,
    textAlign: 'center',
    color: '#82B4FD',
  },
  normalThressText: {
    color: '#333',
    fontSize: 14,
  },
  normalSixText: {
    color: '#666',
    fontSize: 14,
  },
  normalNineText: {
    color: '#999',
    fontSize: 14,
  },
  goodsType: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  goodsTypeTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: 'center',
  },
  goodsTypeIcn: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 4,
  },
  goodsTypeText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 20,
  },
  goodsTypeOne: {
    width: '25%',
  },
  icnBoxOne: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  icnBoxTwo: {
    width: 40,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  SampleCenter: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  SampleCenterBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
  SampleCenterTitle: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  SampleCenterLabel: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  SampleCenterIcn: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 80,
  },
  seasonalGoods: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  seasonalGoodsBox: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  seasonalGoodsItem: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderRightWidth: 1,
    borderRightColor: '#eee',
    paddingTop: 4,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 5,
  },
  seasonalGoodsLabel: {
    fontSize: 14,
    color: '#999',
  },
  imageBox: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 6,
  },
  slide: {
    height: 120,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  swiperImage: {
    width,
    height: 120,
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  forYou: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  forYouTitle: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  bomFixedView: {
    height: 0,
    position: 'relative',
  },
  bomFixedBtn: {
    width: 50,
    height: 50,
    overflow: 'hidden',
    backgroundColor: Mcolor,
    position: 'absolute',
    right: 10,
    bottom: 40,
    borderRadius: 25,
    ...st.jacenter,
  },
  bomFixedText: {
    fontSize: 14,
    color: '#fff',
  },
  fristBox: {
    width: 60,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    borderRadius: 30,
  },
  myImage: {
    flex: 1,
    height: 80,
    borderRadius: 40,
    marginTop: 10,
  },
  textBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '#8BCE21',
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  tabTextChoose: {
    color: '#8BCE21',
  },
  headerImgBox: {
    flex: 1,
    height: spx(180),
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerImg: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },
  boxStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4,
  },
  headerText: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginTop: 80,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputText: {
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
  },
  headerIcn: {
    fontSize: 18,
    color: '#666',
  },
});
export default styles;
