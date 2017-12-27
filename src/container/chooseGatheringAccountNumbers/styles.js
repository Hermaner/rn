import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  typeImg: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  accoutTitle: {
    fontSize: 14,
    color: '#333',
  },
  accoutLabel: {
    fontSize: 12,
    color: '#666',
  },
  icnBox: {
    flex: 1,
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    borderColor: '#64C42C',
    borderWidth: 1,
    borderRadius: 6,
  },
  buttonText: {
    textAlign: 'center',
    color: '#64C42C',
    fontSize: 14,
  },
});
export default styles;
