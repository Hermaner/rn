import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { st, deviceW } from '../utils';

const styles = StyleSheet.create({
  imagesView: {
    ...st.fr,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
  },
  imageListView: {
    position: 'relative',
  },
  imageList: {
    marginTop: 10,
    marginLeft: 10,
    width: (deviceW / 4) - 10,
    height: (deviceW / 4) - 10,
  },
});
export default class ImageLook extends React.Component {
  static propTypes = {
    images: PropTypes.array,
  };
  constructor(props) {
    super(props);
    const images = [];
    props.images.forEach((item) => {
      images.push({ uri: `${item.imgUrl}?imageView2/1/w/200`, key: item.key });
    });
    this.state = {
      images,
      imageDateIndex: 0,
      isImageDateShow: false,
      imageViewData: [],
    };
  }
  componentDidMount() {
  }
  showImageDate = (imageDateIndex) => {
    const { images } = this.state;
    const imageViewData = [];
    images.forEach(item => imageViewData.push({ url: item.uri }));
    this.setState({
      imageDateIndex,
      isImageDateShow: true,
      imageViewData,
    });
  }
  _renderImageUpload() {
    const {
      images,
      imageDateIndex,
      isImageDateShow,
      imageViewData,
    } = this.state;
    return (
      <View>
        <View style={styles.imagesView}>
          {
            images.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => this.showImageDate(index)}
              >
                <View style={styles.imageListView}>
                  <CachedImage source={{ uri: item.uri }} style={styles.imageList} />
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <Modal
          visible={isImageDateShow}
          transparent
        >
          <ImageViewer
            imageUrls={imageViewData}
            index={imageDateIndex}
            onClick={() => this.setState({ isImageDateShow: false })}
          />
        </Modal>
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
