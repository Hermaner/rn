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
    const { imgLists } = this.state;
    return (
      <View>
        <View style={{ height: 200 }}>
          <Swiper
            style={styles.wrapper}
            height={200}
            autoplay
            paginationStyle={{ justifyContent: 'flex-end', paddingRight: 10, bottom: 18 }}
          >
            {
              imgLists.map((item1, i) => (
                <View key={i} style={styles.slide}>
                  <Image style={styles.image} source={{ uri: item1.newsImages[0].imgUrl }} />
                  <View style={styles.newsInfoBox}>
                    <Text style={styles.newsInfoText} numberOfLines={1}>{item1.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={[styles.newsInfoSmallText, styles.newsInfoTime]}>
                        {item1.postDate.substring(0, 10)}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon style={{ marginRight: 10 }} name="arrow-back" />
                        <Text style={styles.newsInfoSmallText}>{item1.lookCount}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            }
          </Swiper>
        </View>
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
    const { dataSource } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <ListView
          dataSource={dataSource}
          renderRow={this._renderRow}
          // onEndReached={this._reachEnd}
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
