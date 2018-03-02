import React from 'react';
import { View, ListView, RefreshControl, BackHandler } from 'react-native';
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
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  componentWillUnmount() {
  }
  _renderRow = (item, sectionID, index) => (
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
  )
  _renderContent() {
    const { noData, dataSource, nomore, refresh } = this.state;
    return (
      <View style={styles.listContent}>
        {
          !noData ?
            <ListView
              dataSource={dataSource}
              renderRow={this._renderRow}
              onEndReached={this._reachEnd}
              enableEmptySections
              onEndReachedThreshold={10}
              contentContainerStyle={styles.listViewStyle}
              renderFooter={() => <Text style={{ lineHeight: 30, textAlign: 'center', color: '#666', fontSize: 12 }}>
                {nomore ? '没有更多数据了' : '数据加载中...'}
              </Text>}
              refreshControl={
                <RefreshControl
                  refreshing={refresh}
                  onRefresh={this._onRefresh}
                />}
            />
            :
            <NoData
              label="没有您的通知消息"
              onPress={this._onRefresh}
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
