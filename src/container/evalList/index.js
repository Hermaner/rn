import React from 'react';
import { View, Modal, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import ImageViewer from 'react-native-image-zoom-viewer';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Header, NoData, TFeedback } from '../../components';
import { Mred } from '../../utils';
import base from './base';
import styles from './styles';

class MainScreen extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
  }
  componentWillUnmount() {
    this.getDelete();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderTabs() {
    const {
      items,
      imageDateIndex,
      isImageDateShow,
      imageViewData,
      chooseIndex,
      tabList } = this.state;
    const EvalList = ({ data }) => (
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
                rating={parseFloat(data.star)}
              />
              <Text style={styles.evalMainCount}>购买数量：x{data.count}</Text>
            </View>
            <Text style={styles.evalMainName}>{data.name}</Text>
          </View>
          <Text style={styles.evalMainText}>{data.label}</Text>
          <View style={styles.evalImages}>
            {
              data.imageData &&
              data.imageData.map((item, index) => (
                <TFeedback
                  key={index}
                  content={
                    <View style={styles.evalImagesList}>
                      <CachedImage source={{ uri: `${item}?imageView2/1/w/60` }} style={styles.evalImage} />
                    </View>}
                  onPress={() => this.showImageDate(index, data.imageData)}
                />
              ))
            }
          </View>
          <Text style={styles.evalDateText}>{data.date}</Text>
        </View>
      </View>
    );
    EvalList.propTypes = {
      data: PropTypes.object,
    };
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.tab}>
          {
            tabList.map((item, index) => (
              <TFeedback
                key={index}
                content={
                  <View style={[styles.tabBox, chooseIndex === index ? styles.chooseTab : '']}>
                    <Text style={[styles.tabText, chooseIndex === index ? styles.chooseTabText : '']}>{item.title}</Text>
                  </View>}
                onPress={() => { this.tabChange(index); }}
              />
            ))
          }
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            {
              items.length > 0 ?
              items.map((item, index) => (
                <EvalList
                  data={item}
                  key={index}
                />
              )) :
              <View style={{ paddingTop: 50 }}>
                <NoData />
              </View>
            }
          </View>
        </View>
        <Modal
          visible={isImageDateShow}
          transparent
          onRequestClose={() => {}}
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
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="评价"
          showRight
          rightPress={this.resetState}
        />
        <Content>
          {this._renderTabs()}
        </Content>
      </Container>
    );
  }
}

MainScreen.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MainScreen);
