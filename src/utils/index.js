
import { Dimensions, PixelRatio, Platform } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import CompressImage from 'react-native-compress-image';
import ImageResizer from 'react-native-image-resizer';

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
  return size * deviceW / 375;
}
export const Global = {
  items: [], // 商品大全
  skuType: '0', // 0:默认采购进入 1：采购重新选择商品，返回3page 2： 采供选择规格返回1page 3：默认供应进入 4：供应重新选择商品，返回3pagef66c03
};
export const Bcolor = '#5699e2';
export const Bcolor2 = '#5699e2';
export const Bcolor3 = '#006eea';
export const Fcolor = '#FF4511';
export const Mcolor = '#5C9AE5';
export const Mred = '#ff0000';
export const Fred = '#ff0000';
export const Mgreen = '#7eda99';
export const Sgreen = '#3d9940';
export const Myellow = '#c08b2e';
export const Mblue = '#49d1f4';
export const Sblue = '#79adcd';
export const ColorList = ['#ffa8a8', '#8be289', '#e196fa', '#fa96c0', '#96cafa', '#96fae1', '#fa9696', '#f6fa96', '#96faa6', '#fae496', '#f296fa', '#96fa9d', '#d6fa96'];

export const st = {
  jacenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  frcenter: {
    flexDirection: 'row',
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
    fontSize: 12,
  },
  font14: {
    fontSize: 14,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  font24: {
    fontSize: 24,
  },
};
export const fileKey = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  let ran = parseInt(Math.random() * 888, 10);
  ran += 100;
  return `${year}${month}${day}${hour}${minute}${second}${ran}${'.jpg'}`;
};
export const getSessionList = () => {
  const { CacheDir } = RNFetchBlob.fs.dirs;
  const path = `${CacheDir}/${global.memberId}sessionList`;
  RNFetchBlob.fs.exists(path)
  .then((exist) => {
    if (!exist) {
      RNFetchBlob.fs.createFile(path, '', 'utf8');
    } else {
      RNFetchBlob.fs.readFile(path, 'utf8')
      .then((data) => {
        console.log(data);
        return data;
      });
    }
  });
};
export const writeSessionList = (data) => {
  const { CacheDir } = RNFetchBlob.fs.dirs;
  const path = `${CacheDir}/${global.memberId}sessionList`;
  RNFetchBlob.fs.writeFile(path, data, 'utf8');
};
export const writeChatList = (memberId, data) => {
  const { CacheDir } = RNFetchBlob.fs.dirs;
  const path = `${CacheDir}/${global.memberId}${memberId}`;
  RNFetchBlob.fs.writeFile(path, data, 'utf8');
};
export const ImageCompress = (url, upWidth, upHeight) => {
  const CompressFunc =
    Platform.OS === 'android' ?
    CompressImage.createCustomCompressedImage(
      url, RNFetchBlob.fs.dirs.DocumentDir, upWidth, upHeight, 60)
      :
      ImageResizer.createResizedImage(url, upWidth, upHeight, 'JPEG', 60);
  return CompressFunc;
};
export const DoImageCompress = (image, myWidth) => {
  const width = myWidth || Platform.OS === 'android' ? 400 : 700;
  let upHeight = '';
  let upWidth = '';
  const bl = image.height / image.width;
  if (image.width > width) {
    upHeight = width * bl;
    upWidth = width;
  } else {
    upHeight = image.height;
    upWidth = image.width;
  }
  const CompressFunc =
    Platform.OS === 'android' ?
    CompressImage.createCustomCompressedImage(
      image.uri, RNFetchBlob.fs.dirs.DocumentDir, upWidth, upHeight, 60)
      :
      ImageResizer.createResizedImage(image.uri, upWidth, upHeight, 'JPEG', 60);
  return CompressFunc;
};
