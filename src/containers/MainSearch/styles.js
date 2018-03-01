
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  hotView: {
    backgroundColor: '#fff',
    marginBottom: 6,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 7,
    paddingTop: 7,
  },
  hotTitleView: {
    height: 30,
    ...st.jcenter,
  },
  hotTitleText: {
    fontSize: 13,
    color: '#888',
  },
  hots: {
    ...st.fr,
    flexWrap: 'wrap',
  },
  hot: {
    width: '25%',
  },
  hotList: {
    marginRight: 3,
    height: 30,
    backgroundColor: '#f2f2f2',
    marginTop: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    ...st.jacenter,
  },
  hotText: {
    fontSize: 12,
    color: '#333',
  },
  history: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    height: 40,
    ...st.jcenter,
  },
  historyText: {
    fontSize: 13,
    color: '#666',
  },
  mainView: {
    flex: 1,
    ...st.fr,
  },
  listContent: {
    flex: 1,
  },
});
export default styles;
