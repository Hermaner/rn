import React from 'react';
import { View, Text, Dimensions, ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import Echarts from 'native-echarts';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, LoadMore, LoadNoMore } from '../../components';
import myVisitorBase from './base';
import styles from './styles';

import Child from './child';

class MyVisitor extends myVisitorBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getInit();
  }
  _randerBody() {
    const { option, visitorList } = this.state;
    const { width } = Dimensions.get('window');
    return (
      <View style={styles.pagebody}>
        <View style={styles.visitData}>
          <View style={[styles.flexRow, { borderBottomWidth: 1, borderBottomColor: '#eee', paddingTop: 10, paddingBottom: 10 }]}>
            <View style={styles.leftBorder}>
              <Text style={{ color: '#333', fontSize: 16, fontWeight: 'bold' }}>近7天看我店铺的人数</Text>
            </View>
            <Text style={{ flex: 1, textAlign: 'right', fontSize: 16, color: '#17B4EF', fontWeight: 'bold' }}>11</Text>
          </View>
          {
            visitorList &&
            <Echarts option={option} height={250} width={width} />
          }
        </View>
      </View>
    );
  }
  _randerVisitor() {
    const { visitorList } = this.state;
    return (
      <View>
        <View style={styles.visitorType}>
          <Text style={styles.flexOneleft}>访问时间</Text>
          <Text style={[styles.flexOneCenter, styles.flexTextColor]}>访客姓名</Text>
          <Text style={styles.flexOneRight}>浏览的供应</Text>
        </View>
        <Child type="1" data={visitorList} />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { loading, nomore, refresh } = this.state;
    return (
      <Container>
        <Header back={pop} title="我的访客" />
        <Content style={{ backgroundColor: '#fff' }}>
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={this._onRefreshVisitor}
                tintColor="#ff0000"
                title="加载中..."
                titleColor="#00ff00"
                colors={['#ff0000', '#00ff00', '#0000ff']}
                progressBackgroundColor="#ffffff"
              />
            }
            onScroll={this._onScroll}
            scrollEventThrottle={50}
          >
            {this._randerBody()}
            {this._randerVisitor()}
            {loading && <LoadMore />}
            {nomore && <LoadNoMore />}
          </ScrollView>
        </Content>
      </Container>
    );
  }
}

MyVisitor.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyVisitor);
