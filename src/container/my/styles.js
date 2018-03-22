import { StyleSheet } from 'react-native';
import { st, px, spx, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  userView: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
    ...st.jcenter,
  },
  userText: {
    fontSize: 18,
    color: '#333',
    backgroundColor: 'transparent',
  },
  noText: {
    color: 'transparent',
  },
  headerBackground: {
    flex: 1,
    height: spx(140),
    backgroundColor: Mcolor,
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  headerImg: {
    flex: 1,
    height: '100%',
    resizeMode: 'stretch',
  },
  firstBox: {
    flex: 1,
    height: 160,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  backGroundImg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 5,
  },
  firstBottom: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 10,
  },
  firstBottomCount: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  firstBottomCount2: {
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: 'transparent',
    color: '#333',
    fontWeight: 'bold',
    marginTop: 4,
    marginBottom: 5,
  },
  firstBottomLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    backgroundColor: 'transparent',
  },
  accountMoney: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  textBackground: {
    backgroundColor: 'transparent',
    padding: 3,
    borderRadius: 3,
  },
  textSmall: {
    fontSize: 14,
    color: '#666',
    textAlign: 'left',
  },
  textMoney: {
    fontSize: px(22),
  },
  detailInfo: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  infoBox: {
    height: 60,
    ...st.frcenter,
  },
  aa: {
    height: 60,
    ...st.frcenter,
  },
  infoBox2: {
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 4,
  },
  myWidth: {
    width: '25%',
  },
  flexOne: {
    flex: 1,
  },
  headerImgBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  imgBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
  },
  icnBox: {
    width: 40,
    height: 40,
    ...st.jacenter,
    borderRadius: 20,
    marginLeft: 5,
    backgroundColor: '#666',
  },
  icnBoxl: {
    width: 40,
    height: 40,
    ...st.jacenter,
    marginBottom: 5,
    borderRadius: 20,
    backgroundColor: '#666',
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  myIdentity: {
    paddingTop: 15,
    paddingBottom: 15,
    color: '#666',
  },
  paddingB: {
    paddingBottom: 30,
  },
  borderB: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  soldList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  soldListRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  soldListRowOne: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  border: {
    borderRightWidth: 1,
    borderRightColor: '#eee',
  },
  ModalStyle: {
    backgroundColor: '#fff',
    height: 170,
  },
  modalView: {
    flex: 1,
  },
  shareLists: {
    ...st.frcenter,
    backgroundColor: '#f8f8f8',
    height: 120,
    paddingTop: 20,
    paddingBottom: 20,
  },
  shareList: {
    flex: 1,
    ...st.acenter,
  },
  shareTop: {
    width: 50,
    height: 50,
    ...st.jacenter,
    borderRadius: 30,
    marginBottom: 10,
  },
  shareIcon: {
    fontSize: 20,
    color: '#fff',
  },
  shareText: {
    fontSize: 12,
    color: '#444',
  },
  shareBtn: {
    backgroundColor: '#fff',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    height: 50,
    ...st.jacenter,
  },
  shareBtnText: {
    fontSize: 14,
    color: '#333',
  },
  displayCountBox: {
    position: 'absolute',
    left: 18,
    top: -4,
    height: 20,
    ...st.jacenter,
    borderRadius: 10,
    backgroundColor: Mcolor,
    paddingLeft: 6,
    paddingRight: 6,
  },
  prompt: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Mcolor,
    position: 'absolute',
    right: 0,
    top: 15,
  },
  myBox: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
export default styles;