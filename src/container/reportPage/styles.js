import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  form: {
    backgroundColor: '#fff', borderRadius: 8,
  },
  Headerleft: {
    height: 44,
    width: 20,
  },
  whyReport: {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 14,
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#fff',
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    marginBottom: 10,
  },
  reason: {
    flex: 1,
    color: '#666',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  returnIndex: {
    flex: 1,
  },
  returnIndexText: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    color: '#666',
    backgroundColor: '#fff',
  },
  contactService: {
    flex: 1,
  },
  contactServiceText: {
    textAlign: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    color: '#fff',
    backgroundColor: '#53BB21',
  },
});
export default styles;
