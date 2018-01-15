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
    const { dataSource } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
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
