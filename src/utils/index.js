
import { Dimensions, PixelRatio } from 'react-native';

export const deviceW = Dimensions.get('window').width;
export const deviceH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();
const pixelRatio = PixelRatio.get();
const defaultPixel = 2;
const w2 = 750 / defaultPixel;
const h2 = 1334 / defaultPixel;
const scale = Math.min(deviceH / h2, deviceW / w2);
export function px(size) {
  size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
  return size / defaultPixel;
}
export function spx(size) {
  size = Math.round(size * scale + 0.5);
  return size / defaultPixel;
}
export const Global = {
  items: [], // 商品大全
  skuType: '0', // 0:默认采购进入 1：采购重新选择商品，返回3page 2： 采供选择规格返回1page 3：默认供应进入 4：供应重新选择商品，返回3page
};
export const Mcolor = '#8bce21';
export const Mred = '#f18334';
export const Fred = '#ff0000';
export const Mgreen = '#7eda99';
export const Sgreen = '#3d9940';
export const Myellow = '#c08b2e';
export const Mblue = '#49d1f4';
export const Sblue = '#79adcd';

export const st = {
  jacenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  jcenter: {
    justifyContent: 'center',
  },
  acenter: {
    alignItems: 'center',
  },
  fr: {
    flexDirection: 'row',
  },
  utilsText: {
    fontSize: 14,
    color: '#666',
  },
  f1: {
    flex: 1,
  },
  masker: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  maskerContent: {
    backgroundColor: '#fff',
    flex: 1,
  },
  font12: {
    fontSize: px(12),
  },
  font14: {
    fontSize: px(14),
  },
  font16: {
    fontSize: px(16),
  },
  font18: {
    fontSize: px(18),
  },
  font20: {
    fontSize: px(20),
  },
  font24: {
    fontSize: px(24),
  },
};
