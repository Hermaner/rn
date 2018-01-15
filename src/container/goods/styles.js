import { StyleSheet, Dimensions } from 'react-native';

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
  seller: {
    marginTop: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  flexfive: {
    flex: 5,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexfour: {
    flex: 4,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  icnImg: {
    height: 50,
    width: 50,
    marginTop: 4,
    marginBottom: 4,
  },
  bigTitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  imgBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  BigIcnImg: {
    width: 100,
    height: 100,
  },
  bottomBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  bigThreeText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  news: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  goodsImg: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  rowBox: {
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  goodsTitle: {
    color: '#333',
    fontSize: 18,
    marginBottom: 8,
  },
  studyBox: {
    backgroundColor: '#fff',
    marginTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  leftText: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#67BC46',
    marginRight: 6,
  },
  centerText: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FC8521',
    marginRight: 6,
  },
  studyRow: {
    flexDirection: 'row',
    alignItems: 'center',
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
  howMuchPeople: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  people: {
    fontSize: 16,
    color: '#666',
  },
  buyGoodsItem: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buyGoodsName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  buyGoodsVariety: {
    fontSize: 14,
    color: '#666',
  },
  flexRight: {
    flex: 1,
    textAlign: 'right',
    color: '#FC8521',
    fontSize: 14,
  },
  buyGoodsPlace: {
    marginTop: 4,
    color: '#666',
    fontSize: 14,
  },
  goBuyBtnBox: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#FC8521',
    borderRadius: 5,
  },
  goBuyBtn: {
    color: '#fff',
    fontSize: 16,
  },
  userDoBigBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userDoBox: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#67BC46',
    borderRadius: 2,
  },
  userDo: {
    fontSize: 12,
    color: '#fff',
  },
  everyWeek: {
    fontSize: 12,
    color: '#FC8521',
    borderWidth: 1,
    borderColor: '#FC8521',
    borderRadius: 2,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    marginRight: 4,
  },
  howLong: {
    fontSize: 10,
    color: '#666',
  },
  howLongDay: {
    fontSize: 10,
    color: '#FC8521',
  },
});
export default styles;