import React from 'react';
import { View, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, NoData, MasterEval } from '../../components';
import base from './base';
import styles from './styles';

class EvalChild extends base {
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
  _renderRow = (item, sectionID, index) => (
    <MasterEval
      item={item}
      rowID={index}
      key={index}
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
    return (
      <Container>
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

EvalChild.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(EvalChild);
