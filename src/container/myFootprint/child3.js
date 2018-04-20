import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage } from 'react-native-img-cache';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, NoData, Loading } from '../../components';
import Base from './base';
import styles from './styles';

class Child3 extends Base {
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
      <View>
        <View style={styles.buyTime}>
          <Text style={styles.buyTimeText}>{item[0].postDate}</Text>
        </View>
        {
          item.map((item1, i) => (
            <TFeedback
              key={i}
              content={
                <View style={styles.goodsDetail2}>
                  <CachedImage style={styles.exampleImg} source={{ uri: `${item1.imgUrl}?imageView2/1/w/120` }} />
                  <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{decodeURI(item1.nickName)}</Text>
                      <View style={{ flexDirection: 'row', flex: 1 }}>
                        <Text style={{ fontSize: 14, color: '#666' }}>认证信息: </Text>
                        {
                          item1.memberVerifs.map((item2, index2) => (
                            <CachedImage
                              style={styles.logoImg}
                              key={index2}
                              source={{ uri: `${item2.verifFieldLogo}?imageView2/1/w/18` }}
                            />
                          ))
                        }
                      </View>
                    </View>
                    <Text style={{ fontSize: 14, color: '#666' }}>地址: {item1.address}</Text>
                  </View>
                </View>}
              onPress={() => { push({ key: item1.memberVerifs !== null && item1.memberVerifs !== '' && item1.memberVerifs.length > 0 ? 'StoreDetail' : 'MyInfo', params: { memberId: item1.memberId, name: decodeURI(item1.nickName) } }); }}
            />
          ))
        }
      </View>
    );
  }
  render() {
    const { noData, items } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
            />
            :
            <NoData
              label="没有相关数据"
            />
        }
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child3.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child3);
