import { StyleSheet } from 'react-native';
import { px, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  topView: {
    position: 'relative',
  },
  mainImg: {
    height: px(200),
    width: '100%',
  },
  topOne: {
    position: 'absolute',
    left: 5,
    top: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topTwo: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    borderRadius: 5,
    paddingRight: 6,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  topText: {
    fontSize: 10,
    color: '#fff',
  },
});
export default styles;
