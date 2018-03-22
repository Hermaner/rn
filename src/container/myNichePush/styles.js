import { StyleSheet, Platform } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  fixTop: {
    height: Platform.OS === 'ios' ? 99 : 79,
  },
  Headerleft: {
    height: 48,
    width: 20,
    ...st.jacenter,
  },
  HeaderRightText: {
    color: Mcolor,
    fontSize: 14,
    marginLeft: 10,
  },
  HeaderMain: {
    flex: 1,
    paddingLeft: 8,
    ...st.fr,
    ...st.jacenter,
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
  conditions: {
    height: 35,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    ...st.fr,
  },
  cdsList: {
    flex: 1,
    ...st.fr,
    ...st.jacenter,
  },
  rightLine: {
    position: 'absolute',
    right: 0,
    top: 10,
    height: 15,
    width: 0.7,
    backgroundColor: '#ccc',
  },
  cddown: {
    color: '#666',
    fontSize: 12,
    marginLeft: 3,
  },
  cdsListText: {
    color: '#666',
    fontSize: 12,
  },
  mainView: {
    flex: 1,
    ...st.fr,
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
  leftNav: {
    width: 90,
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavList: {
    height: 45,
    ...st.jacenter,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    borderLeftWidth: 3,
    borderLeftColor: '#f2f2f2',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
  },
  leftNavListCur: {
    borderLeftColor: Mcolor,
    borderRightColor: '#fff',
    backgroundColor: '#fff',
  },
  addressLeftList: {
    height: 45,
    ...st.jcenter,
    borderLeftWidth: 3,
    paddingLeft: 20,
    borderLeftColor: '#f2f2f2',
  },
  addressLeftListCur: {
    borderLeftColor: Mcolor,
    backgroundColor: '#f9f9f9',
  },
  addressRightList: {
    height: 45,
    paddingLeft: 20,
    ...st.jcenter,
  },
  leftNavText: {
    color: '#555',
    fontSize: 14,
  },
  leftNavTextCur: {
    color: Mcolor,
  },
  rightContent: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  rightAll: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginBottom: 10,
    ...st.jacenter,
    height: 35,
  },
  rightContentView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderLeftColor: '#ddd',
    borderLeftWidth: 1,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  usedCityView: {
    flexWrap: 'wrap',
    height: 40,
    ...st.jcenter,
  },
  nousedCity: {
    paddingLeft: 10,
    color: '#888',
    fontSize: 14,
  },
  contetnTabView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 40,
    ...st.jacenter,
    width: `${100 / 3}%`,
  },
  maskerContentView: {

  },
  maskerBtns: {
    ...st.fr,
    height: 45,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  maskerCancelBtn: {
    flex: 2,
    ...st.jacenter,
    backgroundColor: '#E5F5D9',
  },
  maskerSaveBtn: {
    ...st.f1,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  maskerBtnText: {
    fontSize: 16,
    color: Mcolor,
  },
  maskerBtnTextCur: {
    fontSize: 16,
    color: '#FFF',
  },
  maskerTitle: {
    backgroundColor: '#eee',
    paddingLeft: 10,
    height: 40,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    ...st.jcenter,
  },
  maskerTitleText: {
    fontSize: 14,
    color: '#444',
  },
  topPart: {
    backgroundColor: '#fff',
  },
  rowBox: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexOne: {
    width: '33.3%',
    paddingTop: 10,
    paddingBottom: 10,
    borderRightWidth: 1,
    borderRightColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  flexText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
});
export default styles;
