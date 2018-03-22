import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  content: {
    ...st.fr,
    flexWrap: 'wrap',
    flex: 1,
    margin: 10,
  },
  list: {
    width: '25%',
  },
  mainText: {
    fontSize: 15,
    color: '#555',
  },
  contentTabView: {
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderRadius: 3,
    margin: 2,
    height: 40,
    ...st.jacenter,
  },
});
export default styles;
