import { StyleSheet } from 'react-native';
import { st, px, spx } from '../../utils';

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
    color: '#fff',
  },
  headerImgBox: {
    flex: 1,
    height: spx(180),
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
  accountMoney: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 10,
  },
  textBackground: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  textSmall: {
    fontSize: px(14),
  },
  textMoney: {
    fontSize: px(22),
  },
  rightBtn: {
    position: 'absolute',
    right: 10,
  },
  detailInfo: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  infoBox: {
    flex: 1,
    height: spx(40),
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 6,
    paddingBottom: 6,
  },
  userImg: {
    width: spx(60),
    height: spx(60),
    borderRadius: 35,
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
