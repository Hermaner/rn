import React from 'react';
import { View, Text, ListView, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback } from '../../components';
import Base from './base';
import styles from './styles';

class Child extends Base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
  }
  componentWillUnmount() {
  }
  _renderRow = (item) => {
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
                    {/* <Text style={styles.normalText}>水果蔬菜</Text> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                      <Icon style={{ marginRight: 4, fontSize: 14 }} name="heart" />
                      <Text style={styles.normalText}>{item.lookCount}</Text>
                    </View>
                  </View>
                </View>
                <Image style={styles.newsImg} source={{ uri: item.newsImages[0].imgUrl }} />
              </View>
            </View>}
          onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
        />
      </View>
    );
  }
  render() {
    const { dataSource, imgLists } = this.state;
    const { push } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <View style={{ height: 200 }}>
          <Swiper
            style={styles.wrapper}
            height={200}
            autoplay
            paginationStyle={{ justifyContent: 'flex-end', paddingRight: 10, bottom: 18 }}
          >
            {
              imgLists.map((item1, i) => (
                <TFeedback
                  key={i}
                  content={
                    <View style={styles.slide}>
                      <Image style={styles.image} source={{ uri: item1.img }} />
                      <View style={styles.newsInfoBox}>
                        <Text style={styles.newsInfoText} numberOfLines={1}>{item1.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.newsInfoSmallText, styles.newsInfoTime]}>
                            {item1.time}
                          </Text>
                          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={{ marginRight: 10, fontSize: 16, color: '#666' }} name="heart" />
                            <Text style={styles.newsInfoSmallText}>{item1.lookCount}</Text>
                          </View>
                        </View>
                      </View>
                    </View>}
                  onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item1.newsId } }); }}
                />
              ))
            }
          </Swiper>
        </View>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          enableEmptySections
          onEndReachedThreshold={10}
          contentContainerStyle={styles.listViewStyle}
        />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
