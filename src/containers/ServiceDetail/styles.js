
import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    height: deviceW * 0.6,
  },
  topImg: {
    height: deviceW * 0.6,
    width: '100%',
  },
  mainView: {
    padding: 10,
    backgroundColor: '#fff',
  },
  nameView: {
    height: 40,
    ...st.frcenter,
  },
  nameText: {
    fontSize: 15,
    flex: 1,
    color: '#333',
  },
  priceView: {
    ...st.frcenter,
    height: 40,
  },
  priceText: {
    flex: 1,
    color: Mcolor,
    fontSize: 15,
  },
  salesText: {
    color: '#666',
    fontSize: 12,
  },
  bzView: {
    ...st.fr,
    ...st.acenter,
    borderTopColor: '#e2e2e2',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  bzList: {
    ...st.frcenter,
    marginRight: 10,
    height: 20,
  },
  bzIcon: {
    marginRight: 4,
    fontSize: 16,
    color: Mcolor,
  },
  bzText: {
    color: '#888',
    fontSize: 12,
  },
  intrView: {
  },
  intrTextView: {
    backgroundColor: '#fff',
    padding: 10,
  },
  intrText: {
    color: '#666',
    fontSize: 12,
    lineHeight: 20,
  },
  footer: {
    ...st.fr,
    ...st.jcenter,
  },
  footIcons: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
  },
  footIconView: {
    flex: 1,
    ...st.acenter,
  },
  footIcon: {
    color: '#666',
    fontSize: 24,
  },
  footIconText: {
    color: '#666',
    fontSize: 12,
  },
  footBtn: {
    backgroundColor: Mcolor,
    ...st.jacenter,
    width: 100,
  },
  footBtnView: {
  },
  footBtnText: {
    color: '#fff',
    fontSize: 16,
  },
  footIconCur: {
    color: Mcolor,
  },
  footIconTextCur: {
    color: Mcolor,
  },
});
export default styles;
