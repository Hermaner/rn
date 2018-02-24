import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Icon, Content } from 'native-base';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TFeedback, Header, UploadLogo, Select } from '../../components';
import base from './base';
import styles from './styles';

class CreateConfirm extends base {
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
  _renderList() {
    const { nickName, phone, sexValue, birthDay } = this.state;
    return (
      <View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>昵称</Text>
          <TFeedback
            content={
              <View style={styles.listRight}>
                <Text style={styles.listText}>
                  {nickName || '请输入昵称'}
                </Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.props.push({ key: 'InputChange', params: { label: '昵称', value: nickName } })}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>手机号</Text>
          <TFeedback
            content={
              <View style={styles.listRight}>
                <Text style={styles.listText}>
                  {phone || '请输入手机号'}
                </Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={() => this.props.push({ key: 'BindPhone' })}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>性别</Text>
          <TFeedback
            content={
              <View style={styles.listRight}>
                <Text style={styles.listText}>
                  {sexValue || '请选择性别'}
                </Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={this.showSelectSex}
          />
        </View>
        <View style={styles.listView}>
          <Text style={styles.listLabel}>生日</Text>
          <TFeedback
            content={
              <View style={styles.listRight}>
                <Text style={styles.listText}>
                  {birthDay || '请选择生日'}
                </Text>
                <Icon name="md-arrow-dropright" style={styles.arr} />
              </View>
            }
            onPress={this.toggleDate}
          />
        </View>
      </View>
    );
  }
  _renderSelect() {
    const { optionType, selectShow, options } = this.state;
    return (
      <Select
        selectShow={selectShow}
        value={optionType}
        items={options}
        title="请选择性别"
        closeModal={this.closeModal}
        onValueChange={this.selectModel}
      />
    );
  }
  _renderLogo() {
    const { initImages } = this.state;
    return (
      <View>
        <UploadLogo
          initImages={initImages}
          getImages={this.getImages}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { isDateShow, maximumDate, minimumDate } = this.state;
    return (
      <Container>
        <Header back={pop} title="会员信息" />
        <Content style={styles.content}>
          {this._renderLogo()}
          {this._renderList()}
        </Content>
        {this._renderSelect()}
        <DateTimePicker
          titleIOS="选择时间"
          confirmTextIOS="确定"
          cancelTextIOS="取消"
          is24Hour
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          isVisible={isDateShow}
          onConfirm={this.dateConfirm}
          onCancel={this.dateCancel}
        />
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CreateConfirm.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CreateConfirm);
