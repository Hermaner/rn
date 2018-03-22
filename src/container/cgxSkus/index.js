import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute } from '../../actions';
import { Header, TFeedback, Loading, ModalView } from '../../components';
import base from './base';
import styles from './styles';

class CgxSkus extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.GetSpecService();
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
        <Button onPress={this.saveSkus} full light style={[styles.btn, isBtnGray && styles.grayBtn]}><Text style={{ color: '#fff' }}>选好了</Text></Button>
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
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CgxSkus.propTypes = {
  pop: PropTypes.func,
  navigation: PropTypes.object,
};
export default connect(null, { pop: popRoute })(CgxSkus);
