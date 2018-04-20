import React from 'react';
import { View, TouchableWithoutFeedback, Text } from 'react-native';
import PropTypes from 'prop-types';
import { OptimizedFlatList } from 'react-native-optimized-flatlist';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { Loading, TFeedback, NoData } from '../../components';
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
  _renderRow = ({ item, index }) => {
    const { push } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => { push({ key: item.purchaseId }); }}>
        <View style={styles.listItem}>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>{item.brandName}</Text>
            <Text style={[styles.textRight, item.isRead && styles.alreadyChooseColor]}>{item.isRead ? '已读' : '未读'}</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>采购人：{decodeURI(item.purchase.nickName)}</Text>
          </View>
          <View style={styles.rowBox}>
            <Text style={styles.normalText}>报价时间：{item.modiDate}</Text>
          </View>
          <View style={[styles.rowBox, { justifyContent: 'flex-end' }]}>
            <TFeedback
              content={
                <View style={[styles.leftBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>查看详情</Text>
                </View>}
              onPress={() => this.pushPriceInfo(item)}
            />
            <TFeedback
              content={
                <View style={[styles.rightBtn, styles.btnTotal]}>
                  <Text style={styles.btnText}>在线咨询</Text>
                </View>}
              onPress={() => this.chatPeople(item)}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  render() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
        {
          !noData ?
            <OptimizedFlatList
              data={items}
              renderItem={this._renderRow}
              keyExtractor={(item, index) => index}
              ItemSeparatorComponent={() => <View style={{ height: 4 }} />}
              ListFooterComponent={() =>
                <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: '#666', fontSize: 14 }}>
                    {nomore ? '没有更多数据了' : '数据加载中...'}
                  </Text>
                </View>}
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child);
