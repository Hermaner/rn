import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, UploadFile, Loading } from '../../components';
import CollectiveAuthenticationBase from './base';
import { Mcolor } from '../../utils';
import styles from './styles';

class Child1 extends CollectiveAuthenticationBase {
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
    this.getDelete();
  }
  _renderBusinessInput = () => {
    const { businessName } = this.state;
    return (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>企业名称</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={businessName}
                onChangeText={value => this.setState({ businessName: value })}
                placeholder="请与证件公司名称保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderPeopleInput = () => {
    const { representative } = this.state;
    return (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>法人代表</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={representative}
                onChangeText={(text) => {
                  this.setState({
                    representative: text,
                  });
                }}
                placeholder="请与证件法人姓名保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderSocietyCode = () => {
    const { creditCode } = this.state;
    return (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10 }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>统一社会信用代码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={creditCode}
                onChangeText={(text) => {
                  this.setState({
                    creditCode: text,
                  });
                }}
                placeholder="请与证件代码保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderRow = () => {
    const { push } = this.props;
    const { haveEnt } = this.state;
    return (
      <View style={styles.detialView}>
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 10, marginLeft: 10 }}>执照照片</Text>
        <View style={styles.child1Photo}>
          <UploadFile
            getImages={this.getImages1}
            label="点击上传执照照片"
            imageCount={1}
          />
        </View>
        <TFeedback
          content={
            <View style={[styles.button, haveEnt === '0' ? '' : styles.btnChoose]}>
              <Text style={styles.buttonText}>{haveEnt === '0' ? '提交' : haveEnt === '1' ? '已认证' : '认证中'}</Text>
            </View>}
          onPress={() => { this.submit('1'); }}
        />
        <TFeedback
          content={
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: Mcolor, textAlign: 'center', fontSize: 14 }}>审核须知</Text>
            </View>}
          onPress={() => { push({ key: 'ReviewKnow' }); }}
        />
      </View>
    );
  }
  render() {
    return (
      <View>
        {this._renderBusinessInput()}
        {this._renderPeopleInput()}
        {this._renderSocietyCode()}
        {this._renderRow()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child1.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child1);
