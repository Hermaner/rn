import { StyleSheet } from 'react-native';
import { px, st, Mred, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    position: 'relative',
  },
  mainImg: {
    height: px(200),
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
    ...st.fr,
    ...st.jacenter,
  },
  nameTextView: {
    flex: 1,
    marginRight: 10,
  },
  nameText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  nameIconView: {
    ...st.jacenter,
  },
  jcIcon: {
    color: Mred,
    fontSize: 16,
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
    color: Mred,
    fontSize: 22,
    fontWeight: 'bold',
  },
  pricelabel: {
    color: Mred,
    fontSize: 13,
    marginLeft: 8,
    marginRight: 8,
  },
  priceLabelView: {
    padding: 3,
    borderRadius: 4,
    backgroundColor: Mred,
  },
  priceLabelText: {
    color: '#fff',
    fontSize: 10,
  },
  ptsIcon: {
    marginLeft: 5,
    fontSize: 16,
  },
  nameTipsView: {
    backgroundColor: '#f6f6f6',
    padding: 10,
    ...st.fr,
    ...st.acenter,
  },
  nameTipsicon: {
    marginRight: 10,
    marginLeft: 5,
    fontSize: 16,
    color: Mred,
  },
  provideTypes: {
    paddingTop: 10,
    marginTop: 10,
    backgroundColor: '#fff',
    ...st.fr,
    ...st.acenter,
  },
  provideTypesLeft: {
    ...st.fr,
    flex: 1,
    flexWrap: 'wrap',
  },
  ptlList: {
    width: '25%',
    paddingLeft: 3,
    marginBottom: 8,
    ...st.fr,
    ...st.jacenter,
  },
  ptlIcon: {
    fontSize: 16,
    color: Mcolor,
    marginRight: 6,
  },
  ptlText: {
    fontSize: 13,
    color: '#666',
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
    marginTop: 10,
  },
  storeViewTop: {
    ...st.fr,
    ...st.jacenter,
    padding: 10,
  },
  storeViewBottom: {
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 5,
    height: 36,
    ...st.fr,
    ...st.jacenter,
  },
  storeLeft: {
    marginLeft: 10,
    marginRight: 16,
    ...st.jcenter,
  },
  storeImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 5,
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
    color: '#555',
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: '#f6f6f6',
    height: 45,
    ...st.jacenter,
  },
  noIdText: {
    color: Mcolor,
    fontSize: 10,
  },
  fotBtn1: {
    flex: 1,
    ...st.fr,
    backgroundColor: '#fff',
    ...st.jacenter,
  },
  fotChatIcon: {
    color: Mcolor,
    marginRight: 8,
    fontSize: 18,
  },
  fotChatText: {
    color: Mcolor,
    fontSize: 14,
  },
  fotBtn2: {
    flex: 1,
    backgroundColor: Mcolor,
    ...st.jacenter,
  },
  fotText: {
    color: '#fff',
    fontSize: 14,
  },
  fotBtn3: {
    flex: 1,
    backgroundColor: Mred,
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
    width: 70,
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
  stTextView: {
    height: 30,
    flex: 1,
    minWidth: '30%',
    ...st.jacenter,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  evalView: {
    marginTop: 10,
    backgroundColor: '#fff',
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
    width: 60,
    height: 60,
    marginRight: 8,
  },
  maskerImg: {
    width: 60,
    height: 60,
  },
  maskerLabel: {
    flex: 1,
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
    fontSize: 14,
    flex: 1,
    color: Mred,
  },
  maskerBomBtn: {
    width: 120,
    height: 50,
    ...st.jacenter,
    backgroundColor: Mred,
  },
  maskerBomText: {
    fontSize: 14,
    color: '#fff',
  },
});
export default styles;
