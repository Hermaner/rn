import React from 'react';
import { View, Text } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon, Container, Content } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import ChildBase from './childBase';
import styles from './styles';

class Child extends ChildBase {
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
  _renderRow = (item, index) => {
    const { push } = this.props;
    return (
      <View>
        <TFeedback
          content={
            <View style={styles.newsList}>
              <View style={styles.newsItem}>
                <View style={styles.NewsTextBox}>
                  <Text style={styles.newsTitle} numberOfLines={2} >{item.title}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={[styles.normalText, styles.newsTime]}>
                      {item.postDate.substring(0, 10)}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                      <Icon style={{ marginRight: 4, fontSize: 14 }} name="heart" />
                      <Text style={styles.normalText}>{item.lookCount}</Text>
                    </View>
                  </View>
                </View>
                {
                  item.newsImages.length > 0 &&
                  <CachedImage style={styles.newsImg} source={{ uri: `${item.newsImages[0].imgUrl}?imageView2/1/w/120` }} />
                }
              </View>
            </View>}
          onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
        />
      </View>
    );
  }
  renderSwiper() {
    const { imgLists } = this.state;
    return (
      <Swiper
        style={styles.wrapper}
        height={200}
        loop
        autoplay
        key={imgLists.length}
        paginationStyle={{ justifyContent: 'center', bottom: 10 }}
      >
        {
          imgLists.map((item, i) => (
            <TFeedback
              key={i}
              content={
                <View style={styles.slide}>
                  <CachedImage style={styles.image} source={{ uri: `${item.img}?imageView2/1/w/420` }} />
                  <View style={styles.newsInfoBox}>
                    <Text style={styles.newsInfoText} numberOfLines={1}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.newsInfoSmallText, styles.newsInfoTime]}>
                        {item.time}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon style={{ marginRight: 5, fontSize: 16, color: '#fff' }} name="heart" />
                        <Text style={styles.newsInfoSmallText}>{item.lookCount}</Text>
                      </View>
                    </View>
                  </View>
                </View>}
              onPress={() => { this.props.push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
            />
          ))
        }
      </Swiper>
    );
  }
  render() {
    const { items } = this.state;
    return (
      <Container>
        <Content>
          {this.renderSwiper()}
          {
            items.map((item, index) => (
              <View key={index}>
                {this._renderRow(item, index)}
              </View>
            ))
          }
        </Content>
      </Container>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
