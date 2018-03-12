
import { StyleSheet } from 'react-native';
import { st, Mcolor } from '../../utils';

const styles = StyleSheet.create({
  centerView: {
    backgroundColor: Mcolor,
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#fff',
  },
  marker: {
    flexDirection: 'row',
    backgroundColor: '#f5533d',
    borderRadius: 4,
    padding: 8,
  },
  logo: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    color: '#eee',
    fontSize: 12,
  },
  callout: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    ...st.frcenter,
    width: 200,
  },
  calloutTop: {
    ...st.frcenter,
  },
  distance: {
    color: Mcolor,
    fontSize: 12,
  },
  imageView: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    overflow: 'hidden',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  calloutRight: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    marginBottom: 6,
  },
  detail: {
    fontSize: 12,
    color: '#666',
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 8,
    left: 10,
    top: 40,
    ...st.jacenter,
    backgroundColor: '#fff',
  },
  backIcon: {
    color: '#666',
    fontSize: 30,
  },
  toCenter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 8,
    left: 10,
    bottom: 20,
    ...st.jacenter,
    backgroundColor: '#fff',
  },
  toCenterIcon: {
    color: '#666',
    fontSize: 30,
  },
  arr: {
    fontSize: 16,
    color: '#666',
  },
});
export default styles;
