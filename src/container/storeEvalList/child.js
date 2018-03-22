import React from 'react';
import { View, Text, FlatList, Modal } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { CachedImage } from 'react-native-img-cache';
import ImageViewer from 'react-native-image-zoom-viewer';
import { pushRoute } from '../../actions';
import { Loading, NoData, TFeedback } from '../../components';
import Base from './base';
import { Mred } from '../../utils';
import styles from './styles';

class Child extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <View style={styles.evalView}>
        <View style={styles.evalViewBom}>
          <View style={styles.evalMain}>
            <View style={styles.evalMainLeft}>
              <StarRating
                disabled
                starSize={18}
                emptyStar={'ios-star-outline'}
                fullStar={'ios-star'}
                halfStar={'ios-star-half'}
                iconSet={'Ionicons'}
                starColor={Mred}
                maxStars={5}
                rating={parseFloat(item.starLevel)}
              />
              <Text style={styles.evalMainCount}>购买数量：x{item.buyCount}</Text>
            </View>
            <Text style={styles.evalMainName}>{item.memberName}</Text>
          </View>
          <Text style={styles.evalMainText}>{item.content}</Text>
          <View style={styles.evalImages}>
            {
              item.imgUrls &&
              item.imgUrls.split(',') &&
              item.imgUrls.split(',').map((item1, i) => (
                <TFeedback
                  key={i}
                  content={
                    <View style={styles.evalImagesList}>
                      <CachedImage source={{ uri: `${item1}?imageView2/1/w/60` }} style={styles.evalImage} />
                    </View>}
                  onPress={() => this.showImageDate(i, item.imgUrls.split(','))}
                />
              ))
            }
          </View>
          <Text style={styles.evalDateText}>{item.postDate}</Text>
        </View>
      </View>
    );
  }
  render() {
    const { items, noData, nomore, refresh, isImageDateShow, imageViewData, imageDateIndex } = this.state;
    return (
      <View style={{ flex: 1 }}>
        {
          !noData ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListFooterComponent={() =>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>
                    {nomore ? '没有更多数据了' : '数据加载中...'}
                  </Text>
                </View>}
              onRefresh={this._onRefresh}
              refreshing={refresh}
              onEndReached={this._reachEnd}
              onEndReachedThreshold={0.1}
            />
            :
            <NoData
              label="没有相关数据"
            />
        }
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  data: PropTypes.array,
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
