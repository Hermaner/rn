import React from 'react';
import { View, Image, Modal, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text } from 'native-base';
import { connect } from 'react-redux';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import ImageViewer from 'react-native-image-zoom-viewer';
import StarRating from 'react-native-star-rating';
import { popRoute, pushRoute } from '../../actions';
import { Header, ScrollableTab, NoData } from '../../components';
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
  }
  _renderTabs() {
    const { items, imageDateIndex, isImageDateShow, imageViewData } = this.state;
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
                rating={data.star}
              />
              <Text style={styles.evalMainCount}>购买数量：x2</Text>
            </View>
            <Text style={styles.evalMainName}>h****8</Text>
          </View>
          <Text style={styles.evalMainText}>{data.label}</Text>
          <View style={styles.evalImages}>
            {
              data.imageData.length > 0 &&
              data.imageData.map((item, index) => (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => this.showImageDate(index, data.imageData)}
                >
                  <View style={styles.evalImagesList}>
                    <Image source={{ uri: item.imgUrl }} style={styles.evalImage} />
                  </View>
                </TouchableWithoutFeedback>
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
    const Tab = () => (
      <View style={{ flex: 1 }}>
        {
          items.length > 0 ?
          items.map((item, index) => (
            <EvalList
              data={item}
              key={index}
            />
          )) :
          <NoData />
        }
      </View>
    );
    return (
      <View style={{ flex: 1 }}>
        <ScrollableTabView
          locked
          renderTabBar={() => <ScrollableTab />}
          onChangeTab={(obj) => {
            console.log(obj.i);
          }}
        >
          <Tab tabLabel="全部" />
          <Tab tabLabel="好评4" />
          <Tab tabLabel="差评0" />
          <Tab tabLabel="有图0" />
        </ScrollableTabView>
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
    const { pop } = this.props;
    return (
      <Container>
        <Header
          back={pop}
          title="评价"
          showRight
          rightText="更多"
          rightPress={this.resetState}
        />
        <Content contentContainerStyle={{ flex: 1 }}>
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
