
import { StyleSheet } from 'react-native';
import { st, Mcolor, deviceW } from '../../utils';

const pad = 30;
const width = deviceW - pad;
const height = (deviceW - pad) * 0.56;
const styles = StyleSheet.create({
  top: {
    padding: 15,
    backgroundColor: '#fff',
  },
  cardView: {
    position: 'relative',
  },
  cardContentView: {
    position: 'absolute',
    backgroundColor: 'transparent',
    width,
    height,
    ...st.jacenter,
    left: 0,
    top: 0,
  },
  cardLogo: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    right: 15,
    top: 10,
  },
  cardbg: {
    width,
    height,
  },
  isMemView: {
    ...st.frcenter,
    height: 30,
  },
  glod: {
    color: '#FFD700',
    fontSize: 20,
    marginRight: 10,
  },
  memText: {
    fontSize: 14,
    color: Mcolor,
  },
  notMem: {
  },
  bktext: {
    color: '#fff',
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'center',
  },
  tapText: {
    color: '#347eff',
    fontSize: 13,
    lineHeight: 24,
    textAlign: 'center',
  },
  tips: {
    paddingTop: 10,
  },
  tipsText: {
    color: '#666',
    fontSize: 13,
    lineHeight: 24,
  },
  icons: {
    ...st.frcenter,
    backgroundColor: '#fff',
    marginTop: 8,
    padding: 8,
  },
  iconList: {
    flex: 1,
    ...st.jacenter,
  },
  iconType: {
    fontSize: 20,
    color: '#666',
    marginBottom: 5,
  },
  iconBom: {
    ...st.frcenter,
    height: 24,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  lists: {
    ...st.frcenter,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    paddingBottom: 10,
  },
  list: {
    width: '50%',
  },
  listCur: {
    borderColor: Mcolor,
  },
  listView: {
    margin: 10,
    marginBottom: 0,
    borderWidth: 1,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    ...st.jacenter,
    position: 'relative',
    borderColor: '#ccc',
  },
  listTextCur: {
    color: Mcolor,
    fontSize: 16,
    lineHeight: 25,
  },
  listViewText: {
    color: '#555',
    fontSize: 14,
    lineHeight: 25,
  },
  listTipsView: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: Mcolor,
    width: 50,
    height: 18,
    ...st.jacenter,
    borderRadius: 3,
  },
  listTips: {
    color: '#fff',
    fontSize: 12,
  },
  btnView: {
    backgroundColor: Mcolor,
    flex: 1,
    margin: 10,
    height: 50,
    ...st.jacenter,
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  footer: {
    backgroundColor: '#f8f8f8',
    height: 70,
  },
});
export default styles;
