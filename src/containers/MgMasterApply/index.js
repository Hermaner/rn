import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Input } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Loading, MasterDemanOrderItem, TFeedback, TOpacity, Header, NoData } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterApply extends base {
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
  _renderRow = (data) => {
    const { item, index } = data;
    return (
      <TFeedback
        key={index}
        content={
          <View>
            <MasterDemanOrderItem
              item={item}
              changePrice={() => this.changePrice(index)}
            />
          </View>
        }
        onPress={() => { this.props.push({ key: 'DemandOrderDetail', params: { item: item.demandOrder, type: 'change' } }); }}
      />
    );
  }
  _renderContent() {
    const { noData, items, loading } = this.state;
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
  _renderModal() {
    const { ModalOpen, price, message } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="bottom"
        entry="bottom"
        animationDuration={250}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        ref={(o) => { this.ModalView = o; }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalTitle}>
            <Text style={styles.modalTitleText}>申请信息</Text>
          </View>
          <View style={styles.modalContent}>
            <View style={styles.modalListView}>
              <Text style={styles.memoLabel}>期望薪酬</Text>
              <View style={styles.modalListRight}>
                <Input
                  autoFocus
                  style={styles.listInput}
                  placeholderTextColor="#999"
                  placeholder="输入期望薪酬"
                  keyboardType="numeric"
                  clearButtonMode="while-editing"
                  value={price}
                  onChangeText={value => this.setState({ price: value })}
                />
              </View>
            </View>
            <View style={styles.memoView}>
              <Text style={styles.memoLabel}>补充信息</Text>
              <View style={styles.memoInput}>
                <Input
                  multiline
                  style={styles.listMemo}
                  placeholderTextColor="#999"
                  placeholder="输入补充信息"
                  clearButtonMode="while-editing"
                  value={message}
                  onChangeText={value => this.setState({ message: value })}
                />
              </View>
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
              onPress={this.UpdateMasterDemandOrderBiddingService}
            />
          </View>
        </View>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="我的申请订单" />
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterApply.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterApply);
