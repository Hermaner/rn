import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MyMessage extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <View
        key={index}
        style={styles.list}
      >
        <View style={styles.top}>
          <Text style={styles.title}>息没有您的通</Text>
          <Text style={styles.date}>息没有您的通</Text>
        </View>
        <Text style={styles.content}>
          没有您的通知消息没有您的通知消息没有您的通
          知消息没有您的通知消息没有您的通知消息没
          有您的通知消息没有您的通知消息没有您的通知
          消息没有您的通知消息没有您的通知消息没有您的通
          知消息没有您的通知消息没有您的通知消息没有您的通
          知消息没有您的通知消息</Text>
      </View>
    );
  }
  _renderContent() {
    const { noData, items, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <FlatList
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
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="通知消息" />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyMessage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyMessage);
