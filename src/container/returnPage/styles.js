import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  twoBox: {
    flex: 1,
    height: 45,
    ...st.frcenter,
  },
  headerImg: {
    width: 80,
    height: 80,
    marginRight: 10,
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  headerTextBox: {
    flex: 1,
  },
  headerBox: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
  pricesBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sevicesBox: {
    marginTop: 10,
    backgroundColor: '#fff',
  },
  sevicesTitle: {
    fontSize: 14,
    color: '#666',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  typeBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  typeBtnBox: {
    height: 35,
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginRight: 10,
  },
  typeBtnText: {
    fontSize: 14,
    color: '#666',
  },
  inputText: {
    fontSize: 14,
    color: '#666',
    height: 60,
    borderWidth: 1,
    borderColor: '#eee',
    textAlignVertical: 'top',
  },
  chooseTypeBtnText: {
    color: '#fff',
  },
  chooseTypeBtnBox: {
    backgroundColor: Mcolor,
    height: 35,
    ...st.frcenter,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderColor: Mcolor,
    borderRadius: 4,
    marginRight: 10,
  },
});
export default styles;
