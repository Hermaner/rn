import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  pagebody: {
    backgroundColor: '#fff',
  },
  rowBoxMargin: {
    marginTop: 6,
  },
  flexOne: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  inputTextArea: {
    height: 60,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
  },
  input: {
    fontSize: 13,
    color: '#666',
  },
  inputs: {
    fontSize: 14,
    textAlign: 'right',
  },
  footerButton: {
    backgroundColor: Mcolor,
    height: 50,
    ...st.jacenter,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  footerButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
});
export default styles;
