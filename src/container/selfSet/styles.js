import { StyleSheet } from 'react-native';
import { st } from '../../utils';

const styles = StyleSheet.create({
  ...st,
  // pagebody: {
  //   flex: 1,
  //   borderWidth: 20,
  // },
  detailInfo: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  infoBox: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingTop: 10,
    paddingBottom: 10,
  },
  lookForImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  last: {
    borderWidth: 0,
  },
  icn: {
    marginLeft: 10,
    fontSize: 18,
    color: '#666',
  },
});
export default styles;
