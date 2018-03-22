import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontSize: 14,
    color: '#666',
  },
  twoBigBox: {
    marginTop: 10,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  twoBox: {
    flex: 1,
    height: 45,
    ...st.frcenter,
  },
  inputLabel: {
    textAlign: 'right',
    fontSize: 14,
  },
  imgBox: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
  },
  selectType: {
    width: 0,
    height: 0,
    overflow: 'hidden',
  },
  exampleImg: {
    width: 80,
    height: 60,
    resizeMode: 'stretch',
  },
});
export default styles;
