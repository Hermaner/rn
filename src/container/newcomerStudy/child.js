import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'native-base';
import { CachedImage } from 'react-native-img-cache';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData } from '../../components';
import styles from './styles';

class Child extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderRow = () => {
    const { data, push } = this.props;
    console.log('IIIIIIIIIIIII', data)
    return (
      <View>
        {
          data !== undefined && data !== null && data !== '' && data.length > 0 &&
          data.map((item, index) => (
            <View key={index}>
              <View style={styles.goodsTypeBox}>
                <View style={{ flex: 1 }} />
                <View style={styles.goodsTypeCenter}>
                  <Text style={styles.goodsTypeText}>{item.newsTypeName}</Text>
                </View>
                <View style={{ flex: 1 }} />
              </View>
              {
                item.news !== undefined && item.news !== null && item.news !== '' && item.news.length > 0 &&
                item.news.map((item2, index2) => (
                  <TFeedback
                    key={index2}
                    content={
                      <View style={styles.newsList}>
                        <View style={styles.newsItem}>
                          <View style={styles.NewsTextBox}>
                            <Text style={styles.newsTitle} numberOfLines={2} >{item2.title}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                              <Text style={[styles.normalText, styles.newsTime]}>
                                {item2.postDate.substring(0, 10)}
                              </Text>
                              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                                <Icon style={{ marginRight: 4, fontSize: 14 }} name="heart" />
                                <Text style={styles.normalText}>{item2.lookCount}</Text>
                              </View>
                            </View>
                          </View>
                          {
                            item2.newsImages !== null &&
                            item2.newsImages.length > 0 &&
                            <CachedImage style={styles.newsImg} source={{ uri: `${item2.newsImages[0].imgUrl}?imageView2/1/w/120` }} />
                          }
                        </View>
                      </View>}
                    onPress={() => { push({ key: 'HuinongConsultDetail', params: { newsId: item.newsId } }); }}
                  />
                ))
              }
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { data } = this.props;
    return (
      <View style={{ flex: 1 }}>
        {
          (data && data.length > 0) ?
          this._renderRow()
          :
          <View style={{ marginTop: 40 }}>
            <NoData
              label="没有相关数据"
            />
          </View>
        }
      </View>
    );
  }
}
Child.propTypes = {
  data: PropTypes.array,
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
