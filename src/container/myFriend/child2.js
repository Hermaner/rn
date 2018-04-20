import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, NoData } from '../../components';
import { pushRoute } from '../../actions';
import ChildBase2 from './childBase2';
import styles from './styles';

class Child2 extends ChildBase2 {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
    this.initData();
  }
  componentWillUnmount() {
    this.getDelete();
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: 'StoreDetail', params: { memberId: item.memberId } }); }}>
        <View style={styles.box}>
          <View style={styles.rowBox}>
            <View style={styles.imgBox}>
              <CachedImage style={styles.headerImg} source={{ uri: `${item.imgUrl}?imageView2/1/w/60` }} />
            </View>
            <View>
              <Text style={styles.name}>{decodeURI(item.nickName)}</Text>
              <Text style={styles.lable}>{item.identityName}</Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { items, text, peopleType } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        <View style={styles.topBox}>
          <TFeedback
            content={
              <View style={{ flex: 1 }}>
                <Text style={styles.place}>{text || '全国'}</Text>
              </View>
            }
            onPress={() => this.props.push({ key: 'FriendCitys' })}
          />
          <TFeedback
            content={
              <View style={{ flex: 1 }}>
                <Text style={styles.peopleType}>{peopleType || '用户类型'}</Text>
              </View>
            }
            onPress={() => this.props.push({ key: 'UserIdentity' })}
          />
        </View>
        {
          items.length > 0 ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
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
Child2.propTypes = {
  push: PropTypes.func,
  cityName: PropTypes.string,
};
export default connect(null, { push: pushRoute })(Child2);
