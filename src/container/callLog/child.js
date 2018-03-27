import React from 'react';
import { View, Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { TFeedback, Loading, NoData, ModalCall } from '../../components';
import { pushRoute } from '../../actions';
import base from './base';
import styles from './styles';

class Child extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <TFeedback
        content={
          <View style={styles.box}>
            <View style={styles.rowBox}>
              <View style={styles.imgBox}>
                <CachedImage style={styles.headerImg} source={{ uri: `${item.callMember.imgUrl}?imageView2/1/w/60` }} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.callMember.nickName}</Text>
                <View style={styles.rowBox}>
                  <Text style={styles.lable}>{item.call_time}</Text>
                  <Text style={[styles.lable, { marginLeft: 10 }]}>
                    {item.status === '1' ? '呼叫失败' : item.status === '2' ? '呼叫成功' : item.status === '3' ? '呼叫未接' : '呼叫已接'}
                  </Text>
                </View>
              </View>
              <TFeedback
                content={
                  <View style={styles.borderBox}>
                    <Icon style={styles.mainIconFontChoose} name="call" />
                  </View>}
                onPress={() => this.ModalCall.show(item.callMember.phone, item.callMember.memberId)}
              />
            </View>
          </View>}
        onPress={() => { push({ key: item.callMember.memberVerifs !== null && item.callMember.memberVerifs !== '' && item.callMember.memberVerifs.length > 0 ? 'StoreDetail' : 'MyInfo', params: { memberId: item.callMember.memberId, name: item.callMember.nickName } }); }}
      />
    );
  }
  render() {
    const { items, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          items !== '' &&
          items !== null &&
          items.length > 0 ?
            <FlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
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
        <ModalCall ref={(o) => { this.ModalCall = o; }} />
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
  type: PropTypes.string,
};
export default connect(null, { push: pushRoute })(Child);
