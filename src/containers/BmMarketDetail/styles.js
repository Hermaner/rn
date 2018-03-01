
import { StyleSheet } from 'react-native';
import { Mcolor, st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    padding: 15,
    ...st.frcenter,
    backgroundColor: '#fff',
  },
  topImgView: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 35,
    marginRight: 10,
  },
  topImg: {
    width: 70,
    height: 70,
  },
  topRight: {
    flex: 1,
  },
  topNameView: {
    ...st.fr,
    flex: 1,
  },
  topName: {
    ...st.frcenter,
  },
  topNameText: {
    fontSize: 14,
    marginRight: 10,
    color: Mcolor,
    fontWeight: 'bold',
  },
  topNameLevel: {
    fontSize: 22,
    color: '#CD3700',
  },
  topLabelText: {
    color: '#666',
    fontSize: 12,
  },
  topBzView: {
    ...st.fr,
    marginTop: 5,
    ...st.acenter,
  },
  topBzIcon: {
    fontSize: 18,
    marginRight: 5,
    color: '#CD3700',
  },
  topNoBzIcon: {
    fontSize: 18,
    marginRight: 5,
    color: '#aaa',
  },
  topBzBorder: {
    backgroundColor: '#CD3700',
    borderRadius: 3,
    padding: 3,
  },
  topNoBzBorder: {
    backgroundColor: '#aaa',
    borderRadius: 3,
    padding: 3,
  },
  topBzText: {
    flex: 1,
    fontSize: 11,
    color: '#fff',
  },
  tec: {
    padding: 10,
    paddingTop: 0,
    backgroundColor: '#fff',
  },
  star: {
    ...st.fr,
    ...st.acenter,
  },
  starText: {
    fontSize: 12,
    marginLeft: 5,
    color: Mcolor,
  },
  tecView: {
    ...st.fr,
    paddingTop: 3,
    paddingBottom: 3,
  },
  tecLabel: {
    lineHeight: 20,
    fontSize: 12,
    color: '#666',
  },
  tecValue: {
    flex: 1,
    lineHeight: 20,
    fontSize: 12,
    color: '#444',
  },
  bzView: {
    ...st.fr,
    flex: 1,
    ...st.acenter,
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
    color: '#444',
    fontSize: 12,
  },
  intrView: {
  },
  intrTextView: {
    backgroundColor: '#fff',
    padding: 10,
  },
  intrText: {
    color: '#444',
    fontSize: 13,
    lineHeight: 22,
  },
  swiperImage: {
    width: deviceW,
    height: 200,
    backgroundColor: 'transparent',
    resizeMode: 'stretch',
  },
  footer: {
    backgroundColor: '#f8f8f8',
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
  recordList: {
    ...st.frcenter,
    height: 30,
    backgroundColor: '#fff',
  },
  f1: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  f70: {
    width: 70,
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  moreView: {
    ...st.frcenter,
  },
  moreTextColor: {
    fontSize: 13,
    color: Mcolor,
  },
  moreText: {
    fontSize: 13,
    color: '#666',
  },
  arr: {
    fontSize: 16,
    color: '#666',
    marginLeft: 5,
  },
  caseView: {
    backgroundColor: '#fff',
  },
  caseList: {
    position: 'relative',
    margin: 8,
  },
  caseImg: {
    width: '100%',
    height: 230,
  },
  caseGray: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  caseName: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#fff',
  },
  caseLabel: {
    fontSize: 12,
    lineHeight: 20,
    color: '#bbb',
  },
});
export default styles;
