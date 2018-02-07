import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  KeyboardAvoidingView: {
    flex: 1,
  },
  bottomToolBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    padding: 10,
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
  messageCell: {
    marginTop: 5,
    marginBottom: 5,
  },
  messageCellText: {
    fontSize: 14,
  },
  avatar: {
    borderRadius: 4,
    margin: 5,
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
  },
  endBlankBlock: {
    margin: 5,
    width: 30,
    height: 40,
  },
});
export default styles;
