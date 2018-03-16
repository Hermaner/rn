import PropTypes from 'prop-types';
import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import ImageResizer from 'react-native-image-resizer';
import { Rpc } from 'react-native-qiniu-hm';
import CameraRollPicker from 'react-native-camera-roll-picker';
import { pushRoute } from '../../actions';
import { Header, TOpacity } from '../../components';

import { st } from '../../utils';

const styles = StyleSheet.create({
  access: {
    ...st.frcenter,
    flex: 1,
  },
  accessList: {
    flex: 1,
    ...st.jacenter,
  },
  accessView: {
    width: 40,
    height: 40,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    ...st.jacenter,
  },
  accessIcon: {
    fontSize: 30,
    color: '#666',
  },
  accessText: {
    fontSize: 12,
    color: '#666',
  },
});
class AccessoryActions extends React.Component {
  constructor(props) {
    super(props);
    this._images = [];
    this.state = {
      width: 300,
      modalVisible: false,
      access: [{
        name: '照片',
        icon: 'ios-flame',
      }, {
        name: '快捷短语',
        icon: 'ios-flame',
      }, {
        name: '发商品',
        icon: 'ios-flame',
      }, {
        name: '拍摄',
        icon: 'ios-flame',
      }],
    };
    this.selectImages = this.selectImages.bind(this);
  }

  setImages(images) {
    this._images = images;
  }
  getImages() {
    return this._images;
  }
  setModalVisible(visible = false) {
    this.setState({ modalVisible: visible });
  }
  upLoadImage = () => {
    this.setModalVisible(false);
    const { width } = this.state;
    const images = [];
    this.getImages().forEach((image) => {
      const bl = image.height / image.width;
      const height = width * bl;
      ImageResizer.createResizedImage(image.uri, width, height, 'JPEG', 60).then((response) => {
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
        const urlkey = `${global.buketUrl}${key}`;
        Rpc.uploadFile(response.uri, global.uptoken, { key, name: key });
        images.push({
          text: urlkey,
          image: response.uri,
          type: '2',
        });
        if (images.length === this.getImages().length) {
          this.props.onSend(images);
          this.setImages([]);
        }
      }).catch((err) => {
        console.log(err);
      });
    });
  }
  goAccessory = (index) => {
    console.log(index);
    switch (index) {
      case 0:
        this.setModalVisible(true);
        break;
      case 1:
        this.setModalVisible(true);
        break;
      case 2:
        this.props.push({ key: 'OrderSend' });
        break;
      case 3:
        this.setModalVisible(true);
        break;
      default:
    }
  }
  selectImages(images) {
    this.setImages(images);
  }
  render() {
    const { access } = this.state;
    return (
      <View style={styles.access}>
        {
          access.map((item, index) => (
            <TOpacity
              key={index}
              style={styles.accessList}
              content={
                <View key={index} style={styles.accessList}>
                  <View style={styles.accessView}>
                    <Icon name={item.icon} style={styles.accessIcon} />
                  </View>
                  <Text style={styles.accessText}>{item.name}</Text>
                </View>
              }
              onPress={() => this.goAccessory(index)}
            />
          ))
        }
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}
        >
          <Header
            back={() => this.setModalVisible(false)}
            title="选择图片"
            rightText="选择"
            rightPress={this.upLoadImage}
          />
          <CameraRollPicker
            maximum={10}
            imagesPerRow={4}
            callback={this.selectImages}
            selected={[]}
          />
        </Modal>
      </View>
    );
  }
}

AccessoryActions.contextTypes = {
  actionSheet: PropTypes.func,
};

AccessoryActions.defaultProps = {
  onSend: () => {},
  options: {},
  icon: null,
  containerStyle: {},
  wrapperStyle: {},
  iconTextStyle: {},
};

AccessoryActions.propTypes = {
  onSend: PropTypes.func,
};
AccessoryActions.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(AccessoryActions);
