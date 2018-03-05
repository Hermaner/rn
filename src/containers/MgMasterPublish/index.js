import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Input, Switch, Text, Icon, Footer } from 'native-base';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterPublish extends base {
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
  _renderUser() {
    const { name, salesPrice, price, purchaseCount, categoryTitle, detail, status } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="项目信息" />
        <View style={styles.listView}>
          <Text style={styles.listLabel}>项目名称</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="4-10字"
              clearButtonMode="while-editing"
              value={name}
              onChangeText={value => this.setState({ name: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>销售价格</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入销售价格"
              clearButtonMode="while-editing"
              value={salesPrice}
              onChangeText={value => this.setState({ salesPrice: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>原价</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入销售原价"
              keyboardType="numeric"
              clearButtonMode="while-editing"
              value={price}
              onChangeText={value => this.setState({ price: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>起购数量</Text>
          <View style={styles.listRight}>
            <Input
              style={styles.listInput}
              placeholderTextColor="#999"
              placeholder="请输入起购数量"
              keyboardType="numeric"
              clearButtonMode="while-editing"
              value={purchaseCount}
              onChangeText={value => this.setState({ purchaseCount: value })}
            />
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>项目分类</Text>
          <TOpacity
            style={styles.listRight}
            content={
              <View style={styles.areaView}>
                <Text style={[styles.areaText, { color: categoryTitle.length > 0 ? '#333' : '#999' }]}>{categoryTitle || '选择项目分类'}</Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={this.openCategory}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>服务城市</Text>
          <View style={styles.areaView}>
            <Text style={[styles.areaText, { color: '#333' }]}>当前只支持上海</Text>
          </View>
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>是否上架</Text>
          <View style={styles.listRight}>
            <View style={{ flex: 1 }}>
              <Switch
                value={status}
                onValueChange={value => this.setState({ status: value })}
              />
            </View>
          </View>
        </View>
        <View style={[styles.listView, styles.memoView]}>
          <Text style={styles.memoLabel}>项目描述</Text>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="至少10字的项目描述"
              clearButtonMode="while-editing"
              value={detail}
              onChangeText={value => this.setState({ detail: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderImages() {
    const { initImages } = this.state;
    console.log(initImages);
    return (
      <View style={[styles.mainList, { paddingBottom: 10 }]}>
        <TitleItem text="项目图片" />
        <Text style={styles.cardTips}>至少上传1张您的项目图片</Text>
        <UploadFile
          initImages={initImages}
          getImages={this.getImages}
          label="上传项目图片，最多6张"
          imageCount={6}
        />
      </View>
    );
  }
  _renderModal() {
    const { ModalOpen, categorys, isCategoryShow, isCityShow } = this.state;
    return (
      <Modal
        style={styles.ModalStyle}
        position="top"
        onRequestClose={() => {}}
        entry="bottom"
        swipeToClose={false}
        animationDuration={250}
        onClosed={this.closeModal}
        isOpen={ModalOpen}
        coverScreen
        ref={(o) => { this.ModalView = o; }}
      >
        <Content style={styles.modalView}>
          {
            isCategoryShow &&
            categorys.map((item, index) => (
              <View key={index} style={styles.list}>
                <View style={styles.title}>
                  <View style={styles.titleColor}>
                    <Icon name="md-apps" style={styles.titleIcon} />
                  </View>
                  <Text style={styles.listName}>{item.name}</Text>
                </View>
                <View style={styles.tabs}>
                  {
                    item.categorys.map((list, i) => (
                      <TOpacity
                        key={i}
                        style={[styles.tab, list.cur && styles.tabCur]}
                        content={
                          <Text style={[styles.tabText, list.cur && styles.tabTextCur]}>
                            {list.name}
                          </Text>
                        }
                        onPress={() => this.selectCategory(`${item.name}-${list.name}`, item.categoryId, list.categoryId)}
                      />
                    ))
                  }
                </View>
              </View>
            ))
          }
          {
            isCityShow &&
            <View style={styles.tabs}>
              {
                ['上海', '成都', '武汉'].map((list, i) => (
                  <TOpacity
                    key={i}
                    style={[styles.tab, list.cur && styles.tabCur]}
                    content={
                      <Text style={[styles.tabText, list.cur && styles.tabTextCur]}>
                        {list}
                      </Text>
                    }
                    onPress={() => this.selectCity()}
                  />
                ))
              }
            </View>
          }
        </Content>
      </Modal>
    );
  }
  render() {
    const { pop } = this.props;
    const { load } = this.state;
    return (
      <Container>
        <Header back={pop} title="发布项目" />
        <Content>
          {this._renderUser()}
          {load && this._renderImages()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即发布'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        {this._renderModal()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterPublish.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterPublish);
