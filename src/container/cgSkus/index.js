import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute, resetTo, resetHome } from '../../actions';
import { Header, TFeedback, ModalView } from '../../components';
import base from './base';
import { Global } from '../../utils';
import styles from './styles';

class CgSkus extends base {
  constructor(props) {
    super(props);
    const data = Global.items[Global.firstIndex].childs[Global.secondIndex];
    const items = data.specTypes || [];
    let isBtnGray = false;
    if (Global.skuType === '3' || Global.skuType === '4') {
      items.forEach((item) => {
        for (let i = 0; i < item.specs.length; i += 1) {
          if (item.specs[item.specs.length - 1].specName !== '输入规格') {
            item.specs.push({
              specId: '0',
              specName: '输入规格',
            });
          }
        }
        if (item.itemIndex === undefined) {
          isBtnGray = true;
        }
      });
    }
    this.state = {
      ...this.state,
      isBtnGray,
      items,
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
            <View key={index}>
              <View style={styles.maskerTitle}>
                <Text style={styles.maskerTitleText}>{item.specTypeName}</Text>
              </View>
              <View style={[styles.fr, { flexWrap: 'wrap' }]}>
                {
                  item.specs.map((spec, i) => (
                    <TFeedback
                      key={i}
                      content={
                        <View style={[styles.contetnTabView, spec.cur && styles.tabCur]}>
                          <Text style={[styles.mainText, spec.cur && styles.tabCurText]}>
                            {spec.specName}
                          </Text>
                        </View>}
                      onPress={() => { this.tabView(index, i); }}
                    />
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  _renderModalView() {
    const content = (
      <View>
        <View style={styles.modal}>
          <Input
            style={styles.inputText}
            value={this.state.specName}
            onChangeText={text => this.saveSpecName(text)}
            placeholder="请输入规格"
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
        title="补充规格"
        content={content}
        onConfirm={() => console.log(111)}
      />
    );
  }
  _renderButton() {
    const { isBtnGray } = this.state;
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        {/* <Button onPress={this.goCgComfirm} full light style={[styles.btn, isBtnGray && styles.grayBtn]}><Text style={{ color: '#fff' }}>选好了</Text></Button> */}
        <Button onPress={this.goCgComfirm} full light style={[styles.btn]}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="选择规格" />
        <Content style={{ backgroundColor: '#fff' }}>
          {this._renderContent()}
        </Content>
        {this._renderButton()}
        {this._renderModalView()}
      </Container>
    );
  }
}

CgSkus.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute, resetTo, resetHome })(CgSkus);
