import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ActionSheet } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import { Rpc } from 'react-native-qiniu-hm';
import PropTypes from 'prop-types';
import Toast from 'react-native-simple-toast';
import { GetUploadTokenService } from '../api';
import { st } from '../utils';

const styles = StyleSheet.create({
  lists: {
    backgroundColor: '#fff',
  },
  list: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  title: {
    height: 30,
    ...st.jcenter,
  },
  titleText: {
    fontSize: 12,
    color: '#555',
  },
  row: {
    ...st.frcenter,
  },
  idImgView: {
    flex: 1,
  },
  idImg: {
    width: 108,
    height: 70,
  },
  upViewImg: {
    width: 70,
    height: 70,
  },
});
export default class Prompt extends React.Component {
  static propTypes = {
    getImage: PropTypes.func,
    first: PropTypes.string,
    two: PropTypes.string,
    three: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = {
      upImg: require('../assets/img/addAc.png'),
      index: 0,
      items: [{
        label: '身份证正面照',
        imgUrl: require('../assets/img/idf.png'),
      }, {
        label: '身份证反面照',
        imgUrl: require('../assets/img/idz.png'),
      }, {
        label: '手持身份证照',
        imgUrl: require('../assets/img/idn.png'),
      }],
    };
  }
  componentDidMount() {
    this.GetUploadTokenService();
  }
  goAsheet = (index) => {
    if (index === 0 || index === '0') {
      this.openCamera();
    }
    if (index === 1 || index === '1') {
      this.pickMultiple();
    }
  }
  openCamera = () => {
    ImagePicker.openCamera({
      multiple: false,
      includeExif: true,
    }).then((image) => {
      this.upLoadImage(image.path);
    }).catch(e => console.log(e));
  }
  pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: false,
      includeExif: true,
    }).then((image) => {
      this.upLoadImage(image.path);
    }).catch(e => console.log(e));
  }
  startUpload = (image) => {
    this.upLoadImage(image.path);
  }
  upLoadImage = (source) => {
    const { uptoken, index } = this.state;
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    let ran = parseInt(Math.random() * 888, 10);
    ran += 100;
    const key = `${year}${month}${day}${hour}${minute}${second}${ran}${'.jpg'}`;
    const image = {
      imgUrl: source,
      key: `${global.buketUrl}${key}`,
    };
    this.props.getImage(image, index);
    Rpc.uploadFile(source, uptoken, { key, name: key });
  }
  GetUploadTokenService = () => {
    GetUploadTokenService()
    .then((res) => {
      console.log(res);
      if (res.isSuccess) {
        this.setState({
          uptoken: res.data.upToken,
        });
        global.buketUrl = res.data.buketUrl;
      } else {
        Toast.show(res.msg);
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  _renderImageUpload() {
    const {
      upImg,
      items,
    } = this.state;
    const { first, two, three } = this.props;
    const buttons = [
      { text: '拍照' },
      { text: '从相册选择' },
      { text: '取消' },
    ];
    return (
      <View style={styles.lists}>
        {
          items.map((item, index) => (
            <View key={index} style={[styles.list, index === 2 && { borderBottomWidth: 0 }]}>
              <View style={styles.title}>
                <Text style={styles.titleText}>{item.label}</Text>
              </View>
              <View style={styles.row}>
                <View style={styles.idImgView}>
                  <CachedImage source={item.imgUrl} style={styles.idImg} />
                </View>
                <View style={styles.upView}>
                  <TouchableWithoutFeedback
                    onPress={() => {
                      this.setState({
                        index,
                      });
                      ActionSheet.show(
                        {
                          options: buttons,
                          cancelButtonIndex: 2,
                        },
                        buttonIndex => this.goAsheet(buttonIndex),
                      );
                    }}
                  >
                    <Image
                      source={
                        index === 0 ? (first ? { uri: `${first}?imageView2/1/w/80` } : upImg) :
                        index === 1 ? (two ? { uri: `${two}?imageView2/1/w/80` } : upImg) :
                        (three ? { uri: `${three}?imageView2/1/w/80` } : upImg)
                      }
                      style={styles.upViewImg}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    return (
      <View>
        {this._renderImageUpload()}
      </View>
    );
  }
}
