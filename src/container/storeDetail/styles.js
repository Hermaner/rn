import { StyleSheet } from 'react-native';
import { px, st, Mred, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    position: 'relative',
    paddingBottom: 35,
    backgroundColor: '#fff',
  },
  mainImg: {
    height: px(200),
    width: '100%',
  },
  toplogo: {
    position: 'absolute',
    left: 10,
    bottom: 5,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    ...st.jacenter,
  },
  mainLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  topBtn: {
    position: 'absolute',
    right: 10,
    bottom: 24,
    width: 60,
    height: 32,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    ...st.fr,
    ...st.jacenter,
  },
  topIcon: {
    marginRight: 5,
    fontSize: 16,
    color: '#666',
  },
  topText: {
    fontSize: 12,
    color: '#666',
  },
  midMainView: {
    backgroundColor: '#fff',
  },
  nameOneView: {
    paddingLeft: 10,
  },
  nameTextView: {
    ...st.fr,
    ...st.acenter,
  },
  nameIcon: {
    fontSize: 20,
    marginRight: 4,
  },
  nameText: {
    fontSize: 18,
    color: '#333',
  },
  nameLabelView: {
    paddingBottom: 3,
  },
  grayText: {
    color: '#666',
    lineHeight: 18,
    fontSize: 12,
  },
  midMainCount: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    ...st.fr,
  },
  mmcList: {
    flex: 1,
    ...st.jacenter,
  },
  mmcText: {
    lineHeight: 24,
    color: '#333',
    fontSize: 14,
  },
  mmmLabel: {
    color: '#888',
    fontSize: 12,
  },
  midMainCredit: {
    ...st.fr,
    padding: 10,
    ...st.acenter,
  },
  creditImg: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  creditView: {
    flex: 1,
  },
  creditText: {
    color: '#333',
    fontSize: 12,
  },
  creditLabel: {
    marginTop: 4,
    color: Mred,
    fontSize: 12,
  },
  creditRight: {
    ...st.fr,
    ...st.acenter,
  },
  creditRightText: {
    color: '#666',
    fontSize: 12,
    marginRight: 10,
  },
  creditRightIcon: {
    fontSize: 16,
    color: '#666',
  },
  provideTypes: {
    paddingTop: 10,
    borderTopColor: '#eee',
    borderTopWidth: 1,
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
    width: '100%',
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
  certifView: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  certifList: {
    ...st.acenter,
    width: 60,
    marginTop: 10,
    marginRight: 10,
  },
  certifImg: {
    width: 60,
    height: 60,
  },
  certifText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 20,
  },
});
export default styles;
