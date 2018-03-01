
import { StyleSheet } from 'react-native';
import { st, deviceW } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
    backgroundColor: '#fff',
    padding: 30,
    flex: 1,
  },
  logoMidView: {
    ...st.jacenter,
    paddingBottom: 30,
  },
  logoView: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  listView: {
    ...st.frcenter,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  listLabel: {
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  listRight: {
    flex: 1,
    ...st.fr,
    ...st.acenter,
    justifyContent: 'space-between',
  },
  listText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#333',
  },
  cardView: {
    ...st.fr,
  },
  cardImg: {
    width: (deviceW / 3) - 30,
    height: (deviceW / 3) - 30,
    marginRight: 10,
  },
  arr: {
    color: '#888',
    fontSize: 18,
  },
  selectType: {
    backgroundColor: '#fff', borderWidth: 0, padding: 0,
  },
});
export default styles;
