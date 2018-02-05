import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon, Input } from 'native-base';
import { connect } from 'react-redux';
import SelectInput from 'react-native-select-input-ios';
import { pushRoute, resetHome } from '../../actions';
import { Header, TFeedback, UploadFile, Loading } from '../../components';
import base from './base';
import styles from './styles';

class CgCategory extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    this.getData();
    this.initData();
  }
  componentWillUnmount() {
    this.deleteData();
  }
  _renderList() {
    const { items } = this.state;
    return (
      <View>
        {
          items.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.list, item.last && styles.lastList]} key={index}>
                  <View style={styles.listTitle}>
                    <Text style={styles.listTitleText}>{item.title}</Text>
                  </View>
                  <View style={styles.listLabel}>
                    <Text style={styles.listLabelText} numberOfLines={1}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.listIcon} />
                </View>}
              onPress={() => { this.goPage(index); }}
            />
          ))
        }
      </View>
    );
  }
  _renderUserInfo() {
    const { items2 } = this.state;
    return (
      <View>
        {
          items2.map((item, index) => (
            <TFeedback
              key={index}
              content={
                <View style={[styles.list, item.last && styles.lastList]} key={index}>
                  <View style={styles.listTitle}>
                    <Text style={styles.listTitleText}>{item.title}</Text>
                  </View>
                  <View style={styles.listLabel}>
                    <Text style={styles.listLabelText}>{item.label}</Text>
                  </View>
                  <Icon name="md-arrow-dropright" style={styles.listIcon} />
                </View>}
              onPress={() => { this.goPage(index, 'cga'); }}
            />
          ))
        }
      </View>
    );
  }
  _renderPhone() {
    const { phone } = this.state;
    return (
      <View>
        <View style={styles.list}>
          <View style={styles.listTitle}>
            <Text style={styles.listTitleText}>联系电话</Text>
          </View>
          <View style={styles.listLabel}>
            <Input
              style={styles.phoneInput}
              onChangeText={text => this.setState({ phone: text })}
              value={phone}
            />
          </View>
          <Icon name="md-arrow-dropright" style={styles.listIcon} />
        </View>
      </View>
    );
  }
  _renderMemo() {
    const { memo } = this.state;
    return (
      <View style={styles.memoView}>
        <View style={styles.memoTitle}>
          <Text style={styles.memoTitleText}>补充说明</Text>
        </View>
        <View style={styles.memoMain}>
          <Input
            style={styles.memoMainInput}
            multiline
            placeholderTextColor="#aaa"
            placeholder="详细的描述采购要求，可以收到更满意的报价哦"
            onChangeText={text => this.setState({ memo: text })}
            value={memo}
          />
        </View>
        <UploadFile
          getImages={this.getImages}
          label="（选填）最多上传4张照片"
          imageCount={4}
        />
      </View>
    );
  }
  _renderSelect() {
    const { optionType, options } = this.state;
    return (
      <SelectInput
        value={optionType}
        options={options}
        ref={(c) => { this.SelectInput = c; }}
        submitKeyText="确认"
        cancelKeyText="取消"
        onCancelEditing={() => console.log('onCancel')}
        onSubmitEditing={value => this.setSelect(value)}
        style={styles.selectType}
        labelStyle={{ fontSize: 12, color: '#666' }}
      />
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.goCgComfirm} full light style={styles.btn}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Header back={this.backToHome} title="发布采购" />
        <Content>
          {this._renderList()}
          {this._renderMemo()}
          {this._renderUserInfo()}
          {this._renderPhone()}
          {this._renderSelect()}
        </Content>
        {this._renderButton()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CgCategory.propTypes = {
  navigation: PropTypes.object,
  push: PropTypes.func,
  resetHome: PropTypes.func,
};
export default connect(null, { push: pushRoute, resetHome })(CgCategory);
