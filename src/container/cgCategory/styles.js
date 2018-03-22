import { StyleSheet } from 'react-native';
import { Mcolor, st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  maskerContentView: {
    ...st.fr,
    ...st.f1,
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#555',
    fontSize: 14,
  },
  contetnTabView: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    borderRightColor: '#ddd',
    borderRightWidth: 1,
    height: 40,
    ...st.jacenter,
    width: `${100 / 3}%`,
  },
  tabCur: {
    backgroundColor: Mcolor,
    borderColor: Mcolor,
  },
  tabCurText: {
    color: '#fff',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.6,
    borderColor: '#ddd',
    height: 26,
    ...st.jacenter,
    paddingLeft: 6,
    paddingRight: 6,
  },
  marginL: {
    marginLeft: 10,
  },
  promptText: {
    color: Mcolor,
    fontSize: 13,
  },
  promptTextLeft: {
    color: '#999',
    fontSize: 13,
  },
  icn: {
    marginRight: 5,
    fontSize: 16,
    color: Mcolor,
  },
  flexOne: {
    flex: 1,
  },
  modal: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
  },
  modalBigBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
    marginTop: 20,
  },
  inputText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
  },
  modalBox: {
    flex: 1,
    backgroundColor: Mcolor,
    height: 45,
    ...st.jacenter,
    borderRadius: 5,
  },
});
export default styles;
