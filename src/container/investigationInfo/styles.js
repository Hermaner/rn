import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  bodyBox: {
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleFirstBox: {
    height: 50,
    ...st.jacenter,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleFirst: {
    fontSize: 18,
    color: '#333',
  },
  rowBox: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
    marginBottom: 10,
  },
  borderBox: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Mcolor,
  },
  topTextBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: -15,
    marginBottom: 15,
  },
  typeName: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: Mcolor,
    backgroundColor: '#fff',
  },
  bottomTextBox: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    top: 28,
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    backgroundColor: '#fff',
  },
  bottomBorder: {
    borderBottomWidth: 3,
    borderBottomColor: Mcolor,
    marginTop: 15,
  },
});
export default styles;
