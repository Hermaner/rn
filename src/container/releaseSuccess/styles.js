import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  pagebody: {
    backgroundColor: '#53BC21',
    paddingBottom: 60,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    flex: 1,
  },
  flexJu: {
    justifyContent: 'center',
  },
  successText: {
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 25,
  },
  releaseText: {
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#fff',
  },
  successIcn: {
    marginTop: 20,
    fontSize: 100,
    color: '#fff',
    textAlign: 'center',
  },
  goRelease: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#FFEBA9',
  },
  goBtnBox: {
    backgroundColor: '#4FAF1C',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 160,
    marginRight: 160,
  },
  goBtnText: {
    color: '#fff',
    fontSize: 14,
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
  buyGoodsItems: {
  },
  titleText: {
    fontSize: 14,
    color: '#666',
    fontWeight: 'bold',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  btnList: {
    flexDirection: 'row',
  },
  leftBtn: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
  },
  centerBtn: {
    flex: 2,
    backgroundColor: '#E1F4D1',
    paddingTop: 20,
    paddingBottom: 10,
  },
  rightBtn: {
    flex: 2,
    backgroundColor: '#49B21A',
    paddingTop: 20,
    paddingBottom: 10,
  },
  leftBtnText: {
    color: '#666',
    fontSize: 12,
  },
  textCenter: {
    textAlign: 'center',
  },
  centerBtnText: {
    color: '#49B21A',
    fontSize: 16,
  },
  rightBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  homeIcn: {
    fontSize: 20,
    color: '#666',
  },
  label: {
    color: '#fff',
    fontSize: 12,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 4,
    paddingRight: 4,
    backgroundColor: '#53BC21',
    marginBottom: 6,
  },
  promptText: {
    color: '#666',
    fontSize: 12,
  },
  promptDay: {
    color: '#FC8521',
    fontSize: 12,
  },
  marginT: {
    marginTop: 10,
  },
});
export default styles;
