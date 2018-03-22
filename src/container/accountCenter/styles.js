import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  headerImgBox: {
    flex: 1,
    height: 150,
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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
    paddingTop: 6,
    paddingBottom: 6,
  },
  textBackground: {
    backgroundColor: 'transparent',
    color: '#fff',
    textAlign: 'center',
  },
  textMoney: {
    fontSize: 22,
  },
  rightBtn: {
    position: 'absolute',
    right: 10,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 6,
    paddingBottom: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 16,
  },
  detailInfo: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default styles;
