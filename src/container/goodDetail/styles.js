import { StyleSheet } from 'react-native';
import { st, Mred, Mcolor, deviceW, Bcolor, Fcolor, Bcolor2, Bcolor3 } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    position: 'relative',
  },
  mainImgView: {
    height: deviceW * 0.6,
  },
  mainImg: {
    height: deviceW * 0.6,
    width: '100%',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  flexOne: {
    flex: 1,
  },
  textBorder: {
    borderBottomWidth: 2,
    borderBottomColor: Mcolor,
  },
  tabView: {
    flex: 1,
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    ...st.jacenter,
  },
  tabText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
  },
  tabTextChoose: {
    color: Mcolor,
  },
  topOne: {
    position: 'absolute',
    left: 5,
    top: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topTwo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    borderRadius: 5,
    paddingRight: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topText: {
    fontSize: 10,
    color: '#fff',
  },
  nameAPView: {
    backgroundColor: '#fff',
  },
  nameOneView: {
    padding: 10,
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  nameTextView: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  nameIconView: {
    ...st.jacenter,
  },
  jcIcon: {
    color: Bcolor,
    fontSize: 18,
  },
  grayText: {
    color: '#666',
    lineHeight: 18,
    fontSize: 12,
  },
  nameColorText: {
    color: Mcolor,
    lineHeight: 18,
    fontSize: 12,
  },
  nameAddressView: {
    paddingLeft: 10,
  },
  priceView: {
    ...st.fr,
    margin: 10,
    ...st.acenter,
  },
  priceText: {
    color: Fcolor,
    fontSize: 22,
    fontWeight: 'bold',
  },
  pricelabel: {
    color: Fcolor,
    fontSize: 15,
    marginLeft: 3,
    marginRight: 8,
  },
  priceLabelView: {
    // backgroundColor: Mred,
  },
  priceLabelText: {
    color: '#333',
    fontSize: 14,
  },
  positionIcn: {
    fontSize: 16,
    color: '#666',
  },
  positionText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  nameTipsView: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  nameTipsList: {
    minHeight: 40,
    ...st.frcenter,
  },
  tipsLabel: {
    fontSize: 14,
    width: 45,
    color: '#888',
  },
  nameTipsicon: {
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16,
    color: Mred,
  },
  provideTypes: {
    backgroundColor: '#fff',
    ...st.fr,
    ...st.acenter,
  },
  provideTypesLeft: {
    ...st.fr,
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 10,
    paddingRight: 10,
  },
  provideTypesLeft2: {
    ...st.fr,
    flex: 1,
    flexWrap: 'wrap',
  },
  ptlList: {
    marginBottom: 3,
    marginTop: 3,
    ...st.frcenter,
    marginRight: 8,
  },
  ptlListDot: {
    width: 4,
    height: 4,
    backgroundColor: '#555',
    borderRadius: 2,
    marginLeft: 4,
  },
  ptlIcon: {
    fontSize: 16,
    color: Mcolor,
    marginRight: 6,
  },
  ptlText: {
    fontSize: 13,
    color: '#444',
  },
  ptrIcon: {
    fontSize: 16,
    color: '#666',
    marginLeft: 10,
    marginBottom: 8,
    marginRight: 10,
  },
  storeView: {
    position: 'relative',
    backgroundColor: '#fff',
  },
  storeViewTop: {
    ...st.fr,
    ...st.jacenter,
    padding: 10,
    paddingTop: 25,
  },
  storeViewBottom: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingBottom: 5,
    ...st.fr,
    ...st.jacenter,
  },
  storeLeft: {
    marginLeft: 10,
    marginRight: 16,
    ...st.jcenter,
  },
  storeLeftView: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 2,
    borderRadius: 8,
    ...st.acenter,
  },
  storeImgText: {
    color: Mcolor,
    fontSize: 11,
  },
  storeMid: {
    flex: 1,
  },
  storeMidName: {
    ...st.fr,
    ...st.acenter,
  },
  storeMidIcon: {
    fontSize: 18,
    color: Mred,
    marginRight: 6,
  },
  storeMidNameText: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
  },
  storeMidNameTextReal: {
    color: '#888',
    fontSize: 12,
    marginTop: 4,
  },
  storeMidLabel: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 2,
    borderRadius: 2,
    marginTop: 6,
    marginBottom: 6,
  },
  storeMidLabelText: {
    color: '#666',
    fontSize: 10,
  },
  storeMidText: {
    color: '#555',
    fontSize: 12,
  },
  storeMidTextLeft: {
    color: '#fff',
    fontSize: 12,
  },
  storeMidColorText: {
    color: Mred,
    fontSize: 12,
  },
  storeRight: {
    position: 'absolute',
    right: 6,
    top: 6,
    backgroundColor: Mcolor,
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 3,
    paddingBottom: 3,
  },
  storeRightText: {
    color: '#fff',
    fontSize: 10,
  },
  noIdView: {
    height: 40,
    ...st.jacenter,
  },
  noIdText: {
    color: Fcolor,
    fontSize: 12,
  },
  footer: {
    backgroundColor: '#fff',
    ...st.frcenter,
  },
  fotBtn1: {
    width: 55,
    backgroundColor: '#fff',
    ...st.jacenter,
  },
  fotChatIcon: {
    color: '#333',
    fontSize: 18,
  },
  fotChatText: {
    color: '#666',
    fontSize: 14,
  },
  fotBtn2: {
    flex: 1,
    backgroundColor: Bcolor2,
    ...st.jacenter,
  },
  btnView: {
    flex: 1,
    height: 40,
    marginRight: 10,
    marginLeft: 10,
    overflow: 'hidden',
    borderRadius: 20,
    ...st.fr,
  },
  fotText: {
    color: '#fff',
    fontSize: 14,
  },
  fotBtn3: {
    flex: 1,
    backgroundColor: Bcolor3,
    ...st.jacenter,
  },
  detialView: {
    padding: 10,
  },
  detialLabel: {
    fontSize: 12,
    color: '#666',
  },
  detialImg: {
    marginTop: 10,
  },
  skuTable: {
    marginTop: 10,
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  skuTableTitle: {
    ...st.jacenter,
    height: 40,
  },
  skuTableTitleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  stTabelView: {
    flexWrap: 'wrap',
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    ...st.fr,
  },
  stLabelView: {
    backgroundColor: '#f2f2f2',
    height: 30,
    // width: 70,
    width: '20%',
    ...st.jacenter,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  skuTableText: {
    fontSize: 12,
    color: '#333',
  },
  logoImg: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  stTextView: {
    height: 30,
    // flex: 1,
    // minWidth: '30%',
    width: '30%',
    ...st.jacenter,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  evalView: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  evalViewTop: {
    ...st.fr,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    ...st.jacenter,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  dynamicEvalBox: {
    ...st.fr,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    ...st.jacenter,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  evalTopLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  evalTopRight: {
    ...st.fr,
    ...st.jacenter,
  },
  evalTopText: {
    marginRight: 5,
    fontSize: 12,
    color: '#666',
  },
  evalTopColor: {
    fontSize: 12,
    color: Mcolor,
  },
  evalTopIcon: {
    fontSize: 16,
    color: '#666',
  },
  evalViewBom: {
    paddingTop: 6,
    paddingLeft: 10,
    paddingRight: 10,
  },
  evalMainText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
  },
  evalMain: {
    ...st.fr,
    ...st.jacenter,
    marginTop: 5,
    marginBottom: 5,
  },
  evalMainLeft: {
    ...st.fr,
    flex: 1,
    ...st.acenter,
  },
  evalMainCount: {
    fontSize: 12,
    color: '#888',
    marginLeft: 10,
  },
  evalMainName: {
    fontSize: 12,
    color: '#333',
  },
  maskerContent: {
    flex: 1,
  },
  maskerTop: {
    ...st.fr,
    margin: 10,
  },
  maskerLeft: {
    width: 70,
    height: 70,
    marginRight: 8,
  },
  maskerImg: {
    width: 70,
    height: 70,
  },
  maskerLabel: {
    flex: 1,
    ...st.jcenter,
  },
  maskerTitleText: {
    fontSize: 12,
    color: '#888',
    lineHeight: 20,
  },
  maskerPrice: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  maskerPriceText: {
    fontSize: 14,
    color: Mred,
    lineHeight: 20,
  },
  maskerNumView: {
    height: 35,
    paddingRight: 10,
    marginTop: 20,
    marginBottom: 6,
    ...st.jacenter,
    ...st.fr,
  },
  maskerNumText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    marginRight: 10,
  },
  maskerLink: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  maskerLinkImg: {
    width: '100%',
    height: 70,
  },
  maskerBom: {
    height: 50,
    marginTop: 8,
    ...st.fr,
    ...st.jacenter,
    paddingLeft: 10,
    backgroundColor: '#f2f2f2',
  },
  maskerBomPrice: {
    fontSize: 15,
    flex: 1,
    color: Mcolor,
  },
  maskerBomBtn: {
    width: 120,
    height: 50,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  maskerBomText: {
    fontSize: 14,
    color: '#fff',
  },
  noDataBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
    paddingBottom: 30,
  },
  helpIcnBox: {
    marginLeft: 5,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#bbb',
  },
  helpIcn: {
    fontSize: 16,
    color: '#fff',
  },
  modalBox: {
    height: 200,
    width: 250,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30,
  },
  modalTitleText: {
    flex: 1,
    color: Mcolor,
    fontSize: 18,
    textAlign: 'right',
    marginRight: 40,
  },
  submitBox: {
    backgroundColor: Mcolor,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 4,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  introduceText: {
    fontSize: 14,
    color: '#666',
    paddingTop: 15,
    paddingBottom: 15,
  },
  deleteBtnBox: {
    width: 30,
    height: 30,
    ...st.jacenter,
    borderRadius: 15,
    marginTop: 20,
    backgroundColor: '#fff',
  },
  baozhangBox: {
    ...st.frcenter,
    marginBottom: 10,
  },
  leftBox: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    ...st.jacenter,
    backgroundColor: Bcolor,
  },
  rightBox: {
    height: 40,
    ...st.jacenter,
    paddingLeft: 10,
    paddingRight: 20,
    borderWidth: 1,
    borderColor: Bcolor,
  },
  bottomBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  bottomTopBox: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Mcolor,
    textAlign: 'center',
    marginBottom: 4,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
  },
  imgBox: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImg: {
    width: 0.8 * deviceW,
    height: 100,
  },
  maskerNumTextRight: {
    fontSize: 14,
    color: Mcolor,
  },
  storeMain: {
    ...st.frcenter,
    height: 70,
    paddingLeft: 6,
    paddingRight: 6,
  },
  storeImgUrlView: {
    width: 60,
    height: 50,
  },
  storeImg: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  storeScore: {
    width: 80,
  },
  storeScoreText: {
    fontSize: 12,
    color: '#333',
    marginTop: 5,
    marginBottom: 5,
  },
  storeIdentity: {
    width: 65,
    backgroundColor: Bcolor,
    height: 30,
    borderRadius: 15,
    ...st.jacenter,
  },
  storeIdentityText: {
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
