import React from 'react';
import { View, Image } from 'react-native';
import { Container, Input, Text, CheckBox } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header, PeopleUploadFile } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import myBase from './base';
import styles from './styles';

class SampleCenter extends myBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
  }
  _renderBody() {
    const { identity } = this.state;
    return (
      <View style={styles.pagebody}>
        <Image style={styles.userImg} source={require('../../assets/img/1.png')} />
        <View>
          <Text style={styles.title}>采购量/月</Text>
          <View style={styles.inputBox}>
            <Input
              style={styles.inputText}
              value={this.state.businessName}
              onChangeText={text => this.saveBuyCounts(text)}
            />
          </View>
          <Text style={styles.title}>您的采购身份</Text>
          <View style={styles.checkChoose}>
            {
              identity.map((item, index) => (
                <View key={index} style={styles.checkBox}>
                  <CheckBox
                    style={styles.check}
                    // onPress={() => this.defaultAdress(item.receiveAddressId)}
                    checked={item.isChoose}
                  />
                  <Text>{item.title}</Text>
                </View>
              ))
            }
          </View>
        </View>
      </View>
    );
  }
  _renderUserImg() {
    return (
      <View style={styles.pagebody}>
        <View>
          <Text style={styles.title}>您的身份示意图</Text>
          <View style={styles.imgBox}>
            <Text style={{ fontSize: 14, color: '#666' }}>注：可上传营业执照，门店照片，名片，工牌等上传文件(最多四张且需小于4M)</Text>
            <View>
              <PeopleUploadFile
                getImages={this.getImages1}
                label=""
                imageCount={1}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="样品中心" />
        <View>
          {this._renderBody()}
          {this._renderUserImg()}
        </View>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

SampleCenter.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(SampleCenter);
