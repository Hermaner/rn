import { StyleSheet, Dimensions } from 'react-native';
import { Mgreen, Mcolor } from '../../utils';
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  headerNavigation: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerNavigationText: {
    fontSize: 16,
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
    color: '#53E0B5',
  },
  hang: {
    color: '#FAC342',
  },
  hui: {
    color: '#9ED63C',
  },
  my: {
    color: '#82B4FD',
  },
  publicIcn: {
    marginBottom: 6,
    fontSize: 60,
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
    fontSize: 40,
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
    paddingTop: 10,
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
    justifyContent: 'flex-end',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 6,
    textAlign: 'right',
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
});
export default styles;
