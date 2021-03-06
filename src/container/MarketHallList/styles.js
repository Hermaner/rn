import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  fixTop: {
  },
  top: {
    backgroundColor: '#666',
    height: 100,
    ...st.jacenter,
  },
  topName: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
  },
  topLabel: {
    color: '#eee',
    fontSize: 20,
  },
  conditions: {
    height: 40,
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
    top: 12,
    height: 16,
    width: 0.9,
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
    ...st.fr,
    ...st.f1,
    flexWrap: 'wrap',
  },
  maskerBtns: {
    ...st.fr,
    height: 45,
    borderTopColor: '#ddd',
    borderTopWidth: 1,
  },
  maskerCancelBtn: {
    ...st.f1,
    ...st.jacenter,
    backgroundColor: '#fff',
  },
  maskerSaveBtn: {
    ...st.f1,
    ...st.jacenter,
    backgroundColor: Mcolor,
  },
  maskerBtnText: {
    fontSize: 16,
    color: '#666',
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
});
export default styles;
