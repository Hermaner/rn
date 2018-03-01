import React from 'react';
import { View, TouchableWithoutFeedback, ListView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { ServiceItem, Loading, TFeedback, TOpacity, Header } from '../../components';
import base from './base';
import styles from './styles';

class ServiceList extends base {
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
                      <Icon name="keypad" style={[styles.cddown, item.cur && styles.cddownCur]} />
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
  _renderRow = (item, sectionID, index) => (
    <View>
      <ServiceItem
        item={item}
        rowID={index}
        key={index}
        onPress={() => { this.props.push({ key: 'ServiceDetail', params: { masterServicesId: item.id } }); }}
      />
    </View>
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <TouchableWithoutFeedback onPress={this._onRefresh}>
                <View>
                  <Text style={{ marginBottom: 8, marginTop: 5, textAlign: 'center', color: '#666', fontSize: 12 }}>
                    没有相关数据,点击刷新
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
        }
      </View>
    );
  }
  _renderModal() {
    const { ModalOpen, popItems, twoItems, oneIndex } = this.state;
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
            {
              oneIndex !== undefined &&
              <View>
                <Text style={styles.modalTitle}>选择产品类型</Text>
                <View style={styles.modalList}>
                  {
                    twoItems.map((item, index) => (
                      <TFeedback
                        key={index}
                        content={
                          <View style={[styles.modalItem, item.cur && styles.modalItemCur]}>
                            <Text
                              style={[styles.modalItemText, item.cur && styles.modalItemTextCur]}
                            >
                              {item.name}
                            </Text>
                          </View>
                        }
                        onPress={() => { this.tabTwoItem(index); }}
                      />
                    ))
                  }
                </View>
              </View>
            }
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
    const { popItems } = this.state;
    const { pop, push } = this.props;
    return (
      <Container>
        <View style={styles.fixTop}>
          <Header
            title="服务列表"
            back={pop}
            rightPress={() => push({ key: 'MainSearch' })}
            rightContent={<Icon name="ios-search" style={{ color: '#fff', fontSize: 20 }} />}
          />
          {this._readerConditions()}
        </View>
        <View style={styles.mainView}>
          {this._renderContent()}
        </View>
        {popItems && this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ServiceList.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ServiceList);
