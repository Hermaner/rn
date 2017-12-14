import { StyleSheet } from 'react-native';
import { Mgreen, st } from '../../utils';

const styles = StyleSheet.create({
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  Headerleft: {
    height: 44,
    width: 20,
    ...st.jacenter,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eee',
    borderRadius: 5,
    marginLeft: 10,
    height: 30,
  },
  HeaderMainText: {
    color: '#999',
    fontSize: 14,
    flex: 1,
    marginLeft: 8,
  },
  mainView: {
    flex: 1,
    flexDirection: 'row',
  },
  HeaderIcon: {
    color: '#666',
    fontSize: 18,
  },
  HeaderInput: {
    color: '#666',
    fontSize: 14,
    borderBottomColor: '#eee',
  },
  Body: {
  },
  bodyHeader: {
  },
  Headerleft: {
    resizeMode: 'stretch',
    width: '100%',
    height: 150,
  },
  productType: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 10,
  },
  flexOne: {
    flex: 1,
  },
  flexAlignItems: {
    alignItems: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  textInfo: {
    marginTop: 4,
  },
  productTypeChoose: {
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  productTypeChooseTitle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
  },
  isChoose: {
    borderBottomWidth: 3,
    borderBottomColor: '#77C000',
  },
  isText: {
    color: '#333',
  },
  productTypeChooseLogo: {
    marginRight: 6,
  },
  productTypeChooseName: {
    color: '#666',
    fontSize: 16,
  },
  goodsType: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  goodsTypeName: {
    flex: 1,
    textAlign: 'center',
    color: '#666',
    paddingTop: 15,
    paddingBottom: 15,
  },
  goodsList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  goodsItem: {
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  goodsImg: {
    width: 110,
    height: 100,
    marginRight: 10,
  },
  goodsInfo: {
    flex: 1,
  },
  goodsName: {
    color: '#333',
    fontSize: 16,
  },
  buyCounts: {
    width: 70,
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 6,
    marginBottom: 6,
    paddingTop: 2,
    paddingBottom: 2,
  },
  company: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productSell: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  productPrice: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  productEarnMoney: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  Button: {
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    color: '#77C000',
    fontSize: 16,
    borderColor: '#77C000',
    borderWidth: 1,
    borderRadius: 4,
  },
});
export default styles;
