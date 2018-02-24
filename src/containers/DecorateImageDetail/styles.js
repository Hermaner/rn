
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listContent: {
    padding: 10,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    color: '#222',
    lineHeight: 40,
  },
  list: {
    ...st.frcenter,
    height: 30,
  },
  text: {
    fontSize: 13,
    flex: 1,
    color: '#666',
  },
  caseImg: {
    width: '100%',
    height: 230,
    marginTop: 10,
  },
});
export default styles;
