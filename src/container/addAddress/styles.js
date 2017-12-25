import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  rowBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  inputs: {
    fontSize: 14,
    textAlign: 'right',
  },
  footerButton: {
    backgroundColor: '#4AB21C',
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
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
