import { StyleSheet } from 'react-native';
import { st, Mcolor, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  headerNavigation: {
    paddingTop: 20,
    marginTop: 4,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  headerNavigationText: {
    fontSize: 13,
    color: '#333',
    marginTop: 3,
  },
  mainIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    ...st.jacenter,
    marginBottom: 6,
  },
  mainIconFont: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fff',
  },
  SampleCenterText: {
    fontSize: 14,
    color: '#444',
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
    marginTop: 5,
    backgroundColor: '#fff',
  },
  goodsTypeTitle: {
    fontSize: 16,
    color: '#333',
    paddingTop: 10,
    paddingBottom: 10,
    textAlign: 'center',
  },
  goodsTypeIcn: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 4,
  },
  goodsTypeText: {
    fontSize: 13,
    color: '#333',
    marginTop: 5,
    marginBottom: 20,
  },
  goodsTypeOne: {
    width: '25%',
    ...st.jacenter,
  },
  goodsTypeOne2: {
    ...st.jacenter,
  },
  goodsTypeOneWidth: {
    width: '25%',
  },
  goodsTypeOneWidthFlexOne: {
    flex: 1,
  },
  icnBoxOne: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 10,
  },
  icnBoxTwo: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 25,
  },
  SampleCenter: {
    marginTop: 5,
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
    marginTop: 5,
    textAlign: 'center',
    fontSize: 80,
  },
  seasonalGoods: {
    backgroundColor: '#fff',
    marginTop: 5,
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
    width: 50,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginTop: 6,
  },
  slide: {
    flex: 1,
    height: deviceW * 0.4,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  swiperImage: {
    flex: 1,
    height: deviceW * 0.4,
    backgroundColor: 'transparent',
  },
  forYou: {
    marginTop: 5,
  },
  forYouTitle: {
    fontSize: 14,
    color: Mcolor,
    paddingTop: 10,
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
    marginTop: 5,
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
  },
  headerImg: {
    height: deviceW * 0.3,
    width: deviceW,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: 40,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 8,
    paddingRight: 8,
  },
  headerIcn: {
    fontSize: 18,
    color: '#666',
  },
});
export default styles;
