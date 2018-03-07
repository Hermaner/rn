import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterBadList extends base {
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
            处罚单号：{item.serialNumber}
          </Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.price}>
            处罚金额：{item.amount}
          </Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.num}>
            处罚原因：{item.reason}
          </Text>
        </View>
        <View style={styles.top}>
          <Text style={styles.num}>
            处罚时间：{item.modiDate}
          </Text>
        </View>
      </View>
    );
  }
  _renderContent() {
    const { noData, loading, items } = this.state;
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
                    {loading ? '数据加载中...' : '没有更多数据了'}
                  </Text>
                </View>}
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
        <Header back={pop} title="处罚记录" />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterBadList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterBadList);
