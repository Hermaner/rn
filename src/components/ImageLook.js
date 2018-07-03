import React from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { st } from '../utils';

const styles = StyleSheet.create({
  imagesView: {
    ...st.fr,
    backgroundColor: '#fff',
    flexWrap: 'wrap',
    paddingBottom: 10,
  },
  imageListView: {
    position: 'relative',
    marginLeft: 10,
    ...st.acenter,
  },
  imageList: {
    width: 80,
    height: 80,
  },
  cachedView: {
    marginTop: 10,
    width: 80,
    marginBottom: 8,
    height: 80,
  },
});
export default class ImageLook extends React.Component {
  static propTypes = {
    images: PropTypes.array,
    width: PropTypes.number,
  };
  constructor(props) {
    super(props);
    const images = [];
    props.images.forEach((item) => {
      console.log(item);
      images.push({ uri: `${item.imgUrl}?imageView2/1/w/200`, imgUrl: item.imgUrl, name: item.name });
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
    images.forEach(item => imageViewData.push({ url: item.imgUrl }));
    console.log(imageViewData);
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
    const { width } = this.props;
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
                  <View style={styles.cachedView}>
                    <CachedImage
                      source={{ uri: item.uri }}
                      style={[styles.imageList, width && { width, height: width, borderWidth: 1 }]}
                    />
                  </View>
                  <Text style={{ textAlign: 'center', fontSize: 12, color: '#666' }}>{item.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))
          }
        </View>
        <Modal
          visible={isImageDateShow}
          onRequestClose={() => {}}
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
