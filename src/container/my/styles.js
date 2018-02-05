import { StyleSheet } from 'react-native';
import { st, px, spx, Mred } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  // pagebody: {
  //   flex: 1,
  //   borderWidth: 20,
  // },
  userView: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 20,
    ...st.jcenter,
  },
  userText: {
    fontSize: 18,
    color: '#333',
  },
  headerBackground: {
    flex: 1,
    height: spx(180),
    backgroundColor: Mred,
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
    height: 180,
    // marginTop: 15,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
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
    color: '#333',
    marginBottom: 4,
  },
  firstBottomLabel: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
  },
  accountMoney: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 50,
    marginBottom: 10,
  },
  textBackground: {
    backgroundColor: 'transparent',
    color: '#333',
  },
  textSmall: {
    fontSize: 14,
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
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  myWidth: {
    width: '25%',
    // flex: 1,
    // borderWidth: 1,
  },
  flexOne: {
    flex: 1,
  },
  headerImgBox: {
    // position: 'absolute',
    // top: -26,
    marginTop: 10,
  },
  imgBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#fff',
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
});
export default styles;
