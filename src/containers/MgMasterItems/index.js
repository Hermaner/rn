import React from 'react';
import { View, ListView, RefreshControl, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Switch } from 'native-base';
import { connect } from 'react-redux';
import Swipeout from 'react-native-swipeout';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterItems extends base {
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
    this.getInit();
  }
  componentWillUnmount() {
  }
  _renderRow = (item, sectionID, index) => (
    <Swipeout
      key={index}
      right={[{
        text: '删除',
        backgroundColor: '#ff0000',
        color: '#fff',
        underlayColor: '#ff0000',
        onPress: () => this.del(index),
      }]}
    >
      <View key={index} style={styles.list}>
        <CachedImage source={{ uri: item.imgUrl.split(',')[0] }} style={styles.img} />
        <View style={styles.mid}>
          <Text style={styles.name}>
            {item.name}
          </Text>
          <Text style={styles.price}>
            {item.salesPrice}元/次
          </Text>
          <Text style={styles.date}>
            {item.modiDate}
          </Text>
        </View>
        <View style={styles.right}>
          <Switch
            value={item.status === 1}
            onValueChange={value => this.setState({ status: value })}
          />
          <TOpacity
            style={styles.btn}
            content={
              <Text style={styles.btnText}>修改</Text>
            }
            onPress={() => this.props.push({ key: 'MgMasterPublish', params: { item } })}
          />
        </View>
      </View>
    </Swipeout>

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
              label="没有相关数据,点击刷新"
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
        <Header back={pop} title="我的项目" />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterItems.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterItems);
