import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterLogList extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getInit();
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
      <View key={index} style={styles.list}>
        <View style={styles.top}>
          <Text style={styles.num}>
            流水号：{item.serialNumber}
          </Text>
          <Text style={[styles.price, item.amount < 0 && { color: 'green' }]}>
            {item.amount}
          </Text>
        </View>
        <View style={styles.bom}>
          <Text style={styles.date}>
            {item.modiDate}
          </Text>
        </View>
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
        <Header back={pop} title="收入明细" />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterLogList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterLogList);
