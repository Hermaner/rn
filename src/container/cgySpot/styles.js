import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  btnView: {
    backgroundColor: '#fff',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 15,
  },
  tabList: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    ...st.jacenter,
    ...st.fr,
  },
  tabListCur: {
    borderColor: Mcolor,
  },
  checkView: {
    marginRight: 20,
  },
  tabCon: {
    flex: 1,
  },
  tabTitle: {
    color: '#444',
    fontSize: 15,
    lineHeight: 18,
  },
  tabTitleCur: {
    color: Mcolor,
  },
  tabLabel: {
    color: '#999',
    fontSize: 14,
    lineHeight: 18,
  },
  tabLabelCur: {
    color: Mcolor,
  },
  twoView: {
    paddingLeft: 10,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  twoViewList: {
    ...st.fr,
    ...st.jacenter,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 50,
    paddingRight: 10,
  },
  twoTitle: {
    color: '#444',
    fontSize: 14,
    marginRight: 20,
  },
  twoRight: {
    flex: 1,
    ...st.fr,
    ...st.jacenter,
  },
  twoLabel: {
    color: '#333',
    fontSize: 16,
    flex: 1,
  },
  twoIcon: {
    color: '#666',
    fontSize: 18,
  },
  twoBtn: {
    backgroundColor: Mcolor,
    borderRadius: 4,
    marginTop: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  grayBtn: {
    backgroundColor: '#666',
  },
});
export default styles;
