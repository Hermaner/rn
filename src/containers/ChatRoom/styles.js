import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  listContent: {
    flex: 1,
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    borderColor: '#ccc',
    width: 60,
    height: 40,
    marginLeft: 8,
    borderRadius: 4,
    ...st.jacenter,
    borderWidth: 1,
  },
  sendButtonText: {
    color: '#333',
    fontSize: 14,
  },
  input: {
    flex: 1,
    color: '#444',
    backgroundColor: '#fff',
    fontSize: 13,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    paddingTop: 10,
  },
  list: {
    marginTop: 5,
    marginBottom: 5,
    ...st.fr,
  },
  message: {
    color: '#333',
    fontSize: 14,
  },
  avatar: {
    borderRadius: 4,
    margin: 8,
    width: 40,
    height: 40,
  },
  sepView: {
    ...st.frcenter,
    flex: 1,
  },
  sepViewEnd: {
    flex: 1,
  },
  contentView: {
    borderRadius: 4,
    padding: 8,
    margin: 5,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  endBlankBlock: {
    margin: 5,
    width: 30,
    height: 40,
  },
});
export default styles;
