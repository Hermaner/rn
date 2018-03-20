/**
 * Created by buhe on 16/4/12.
 */
import RNFetchBlob from 'react-native-fetch-blob';
import { Platform } from 'react-native';

function uploadFile(uri, token, key, callback) {
  const PATH = Platform.OS === 'ios' ? uri.replace('file:///', '') : uri;
  const body = [{
    name: 'token',
    data: token,
  }, {
    name: 'key',
    data: key,
  }, {
    name: 'file',
    filename: key,
    data: RNFetchBlob.wrap(PATH),
  }];
  RNFetchBlob
  .fetch('POST', 'https://up.qbox.me', {
    'Content-Type': 'octet-stream',
  }, body)
  .uploadProgress((written, total) => {
    console.log(written, total);
  })
  .progress((received, total) => {
    const perent = received / total;
    console.log(perent);
  })
  .then(response => response.json())
  .then(() => {
    if (callback) {
      callback();
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

export default uploadFile;
