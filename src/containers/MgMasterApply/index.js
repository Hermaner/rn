import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, DemanOrderItem, TFeedback, TOpacity, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class DemandOrder extends base {
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
    this.deleteInit();
  }
  _readerConditions() {
    const { tabs } = this.state;
    return (
      <View style={styles.conditions}>
        {
          tabs.map((item, index) => (
            <TOpacity
              key={index}
              style={{ flex: 1 }}
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
      <TFeedback
        key={index}
        content={
          <View>
            <DemanOrderItem
              item={item}
            />
          </View>
        }
        onPress={() => { this.props.push({ key: 'DemandOrderDetail', params: { item } }); }}
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
    const { ModalOpen } = this.state;
    const popItems = [{
      name: '安装师傅',
    }];
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        entry="top"
        animationDuration={300}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        coverScreen
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={{ flex: 1 }}>
            <Text style={styles.modalTitle}>选择类目</Text>
            <View style={styles.modalList}>
              {
                popItems.map((item, index) => (
                  <TFeedback
                    key={index}
                    content={
                      <View style={[styles.modalItem, item.cur && styles.modalItemCur]}>
                        <Text style={[styles.modalItemText, item.cur && styles.modalItemTextCur]}>
                          {item.name}
                        </Text>
                      </View>
                    }
                    onPress={() => { this.tabOneItem(index); }}
                  />
                ))
              }
            </View>
          </View>
          <View style={styles.modalBtns}>
            <TOpacity
              style={[styles.modalBtn, styles.cancelBtn]}
              content={
                <View>
                  <Text style={styles.modalText}>取消</Text>
                </View>
              }
              onPress={this.closeModal}
            />
            <TOpacity
              style={styles.modalBtn}
              content={
                <View>
                  <Text style={styles.modalText}>确认</Text>
                </View>
              }
              onPress={this.closeModal}
            />
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header title="可接订单" hideLeft />
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

DemandOrder.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(DemandOrder);
