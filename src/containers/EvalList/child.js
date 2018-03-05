import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, NoData, MasterEval } from '../../components';
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
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <MasterEval
        item={item}
        rowID={index}
        key={index}
      />
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
