
import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  listContent: {
    flex: 1,
    paddingTop: 4,
  },
  caseList: {
    position: 'relative',
    margin: 8,
  },
  caseImg: {
    width: '100%',
    height: 230,
  },
  caseGray: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.6)',
    left: 0,
    right: 0,
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  caseName: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#fff',
  },
  caseLabel: {
    fontSize: 12,
    lineHeight: 20,
    color: '#bbb',
  },
});
export default styles;
