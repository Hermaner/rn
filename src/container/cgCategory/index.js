import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, TFeedback, TOpacity, ModalView } from '../../components';
import base from './base';
import { Global } from '../../utils';
import styles from './styles';

class CgCategory extends base {
  constructor(props) {
    super(props);
    const items = Global.items[Global.firstIndex].childs[Global.secondIndex];
    this.state = {
      ...this.state,
      showBtn: Global.skuType !== '3' && Global.skuType !== '4',
      items: items.brands || [],
      title: items.name,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.maskerContentView}>
        {
          items.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.contetnTabView, item.cur && styles.tabCur]}>
                  <Text style={[styles.mainText, item.cur && styles.tabCurText]}>
                    {item.brandName}
                  </Text>
                </View>}
              onPress={() => this.goNext(index)}
            />
          ))
        }
      </View>
    );
  }
  _renderOtherChoose() {
    return (
      <View style={{ marginTop: 20 }}>
        <View style={styles.flexRow}>
          <Text style={styles.promptTextLeft}>没找到您的货品品牌？</Text>
          <TOpacity
            style={styles.marginL}
            content={
              <View style={styles.promptBox}>
                <Icon style={styles.icn} name="add" />
                <Text style={styles.promptText}>添加自定义品牌</Text>
              </View>
            }
            onPress={() => this.showInput()}
          />
        </View>
      </View>
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.goNextWidthOut} full light style={{ borderWidth: 1, borderColor: '#ddd' }}><Text style={{ color: '#999' }}>品种不限</Text></Button>
      </View>
    );
  }
  _renderModalView() {
    const { title } = this.state;
    const content = (
      <View>
        <View style={styles.modal}>
          <Input
            style={styles.inputText}
            value={this.state.brandName}
            onChangeText={text => this.saveBrandName(text)}
            placeholder="请输入品牌"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.modalBigBox}>
          <TFeedback
            content={
              <View style={styles.modalBox}>
                <Text style={{ fontSize: 16, color: '#fff' }}>确定</Text>
              </View>}
            onPress={() => { this.saveChoose(); }}
          />
        </View>
      </View>
    );
    return (
      <ModalView
        ref={(o) => { this.ModalView = o; }}
        title={`补充${title}的品牌`}
        content={content}
        onConfirm={() => console.log(111)}
      />
    );
  }
  render() {
    const { pop } = this.props;
    const { title, showBtn } = this.state;
    const headerTitle = `选择${title}品牌`;
    return (
      <Container>
        <Header back={pop} title={headerTitle} />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderContent()}
          {!showBtn && this._renderOtherChoose()}
        </Content>
        {showBtn && this._renderButton()}
        {this._renderModalView()}
      </Container>
    );
  }
}

CgCategory.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CgCategory);
