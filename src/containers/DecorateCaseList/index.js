import React from 'react';
import { View, ListView, RefreshControl, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { CachedImage } from 'react-native-img-cache';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class DecorateCaseList extends base {
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
    <TFeedback
      key={index}
      content={
        <View style={styles.caseList}>
          <CachedImage source={{ uri: item.imgUrl }} style={styles.caseImg} />
          <View style={styles.caseGray}>
            <Text style={styles.caseName}>
              {item.title}
            </Text>
            <Text style={styles.caseLabel}>
              {item.style}/{item.acreage}/{item.price}
            </Text>
          </View>
        </View>
      }
      onPress={() => { this.props.push({ key: 'DecorateCaseDetail', params: { item } }); }}
    />
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
        <Header back={pop} title="装修案例" />
        {this._renderContent()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

DecorateCaseList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DecorateCaseList);
