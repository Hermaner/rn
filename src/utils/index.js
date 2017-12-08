
import { Dimensions } from 'react-native';

export const deviceW = Dimensions.get('window').width;
export const deviceH = Dimensions.get('window').height;
const basePx = 375;
const deviceWpx = deviceW / basePx;
export function px(e) {
  return e * deviceWpx;
}

export const Mcolor = '#8bce21';
export const Mred = '#f23130';
export const Fred = '#ff0000';
export const Mgreen = '#7eda99';
export const Sgreen = '#3d9940';
export const Myellow = '#c08b2e';
export const Mblue = '#49d1f4';
export const Sblue = '#79adcd';
