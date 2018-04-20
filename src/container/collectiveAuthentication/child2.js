import React from 'react';
import { View, Text } from 'react-native';
import { Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute } from '../../actions';
import { TFeedback, UploadFile, Loading } from '../../components';
import collectiveAuthenticationBase from './base';
import { Mcolor } from '../../utils';
import styles from './styles';

class Child2 extends collectiveAuthenticationBase {
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
                onChangeText={(text) => {
                  this.setState({
                    businessName: text,
                  });
                }}
                placeholder="请与证件公司名称保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  _renderPeople = () => {
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
  _renderBusinessLicence = () => {
    const { licenseCode } = this.state;
    return (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>营业执照号码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={licenseCode}
                onChangeText={(text) => {
                  this.setState({
                    licenseCode: text,
                  });
                }}
                placeholder="请与执照号码保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={styles.child1Photo}>
            <UploadFile
              getImages={this.getImages1}
              label="点击上传执照照片(公司名称,有效期及证件号码必须清晰可辩)"
              imageCount={1}
            />
          </View>
        </View>
      </View>
    );
  }
  _renderRow = () => {
    const { push } = this.props;
    const { organizationCode, haveEnt } = this.state;
    return (
      <View style={styles.detialView}>
        <View style={{ marginBottom: 10, backgroundColor: '#fff' }}>
          <View style={styles.rowBox}>
            <Text style={styles.rowBoxLeft}>组织机构代码</Text>
            <View style={styles.rowBoxRight}>
              <Input
                style={styles.inputText}
                value={organizationCode}
                onChangeText={(text) => {
                  this.setState({
                    organizationCode: text,
                  });
                }}
                placeholder="请与执照号码保持一致"
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={styles.child1Photo}>
            <UploadFile
              getImages={this.getImages2}
              label="点击上传图片(需要能看清机构名称,号码,地址等信息)"
              imageCount={1}
            />
          </View>
        </View>
        <TFeedback
          content={
            <View style={[styles.button, haveEnt === '0' ? '' : styles.btnChoose]}>
              <Text style={styles.buttonText}>{haveEnt === '0' ? '提交' : haveEnt === '1' ? '已认证' : '认证中'}</Text>
            </View>}
          onPress={() => { this.submit('2'); }}
        />
        <TFeedback
          content={
            <View style={{ marginTop: 10, marginBottom: 20 }}>
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
        {this._renderPeople()}
        {this._renderBusinessLicence()}
        {this._renderRow()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </View>
    );
  }
}
Child2.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { push: pushRoute })(Child2);
