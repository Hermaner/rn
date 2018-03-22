import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  pagebody: {
    flex: 1,
    // ...st.jacenter,
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  addBtn: {
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 5,
    paddingTop: 60,
    paddingBottom: 60,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountBox: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 10,
    backgroundColor: '#999',
    borderRadius: 4,
  },
  accountImg: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  labelTextBox: {
    borderWidth: 1,
    borderColor: '#fff',
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 8,
  },
  labelTextBoxChange: {
    backgroundColor: '#fff',
  },
  labelText: {
    fontSize: 12,
    color: '#fff',
  },
  labelTextChange: {
    color: '#666',
  },
});
export default styles;
