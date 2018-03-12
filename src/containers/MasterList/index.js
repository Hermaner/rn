import React from 'react';
import { View, FlatList, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, TOpacity, MasterItem, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MasterList extends base {
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
    this.deleteInit();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _readerConditions() {
    const { tabs } = this.state;
    return (
      <View style={styles.conditions}>
        {
          tabs.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={styles.cdsList}>
                  <Text style={[styles.cdsListText, item.cur && styles.cdsCurText]}>
                    {item.label}
                  </Text>
                  {
                    index === 3 ?
                      <Icon name="keypad" style={[styles.cddown, { fontSize: 16 }, item.cur && styles.cddownCur]} />
                    :
                      <Icon name={item.cur ? 'ios-arrow-up' : 'ios-arrow-down'} style={[styles.cddown, item.cur && styles.cddownCur]} />
                  }
                  <View style={styles.rightLine} />
                </View>
              }
              onPress={() => { this.changeTab(index); }}
            />
          ))
        }
      </View>
    );
  }
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <MasterItem
        item={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'MasterDetail', params: { masterId: item.masterId } }); }}
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
  _renderModal() {
    const { ModalOpen, types } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        entry="top"
        animationDuration={300}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        coverScreen
        swipeToClose={false}
        ref={(o) => { this.ModalView = o; }}
      >
        <Content>
          <View style={styles.modalView}>
            <TOpacity
              style={styles.tabAll}
              content={
                <Text style={styles.tabText}>查看所有</Text>
              }
              onPress={this.selectAllType}
            />
            {
              types.map((item, index) => (
                <View key={index} style={styles.list}>
                  <View style={styles.title}>
                    <View style={styles.titleColor}>
                      <Icon name="md-apps" style={styles.titleIcon} />
                    </View>
                    <Text style={styles.listLabel}>{item.name}</Text>
                  </View>
                  <View style={styles.tabs}>
                    {
                      item.childs.map((list, i) => (
                        <TOpacity
                          key={i}
                          style={[styles.tab, list.cur && styles.tabCur]}
                          content={
                            <Text style={[styles.tabText, list.cur && styles.tabTextCur]}>{list.name}</Text>
                          }
                          onPress={() => this.selectType(index, i)}
                        />
                      ))
                    }
                  </View>
                </View>
              ))
            }
          </View>
        </Content>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header
            title="师傅列表"
            back={pop}
            rightText="地图找师傅"
            rightPress={() => this.props.push({ key: 'MapView' })}
          />
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MasterList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MasterList);
