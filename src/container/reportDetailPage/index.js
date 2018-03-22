import React from 'react';
import { View, BackHandler } from 'react-native';
import { Container, Content, Text, Input } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, Loading, UploadFile } from '../../components';
import reportDetailPagebase from './base';
import styles from './styles';

class ReportDetailPage extends reportDetailPagebase {
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
  _renderBody() {
    const { labelLength, reason } = this.state;
    return (
      <View style={styles.pagebody}>
        <Text style={styles.whyReport}>详细描述</Text>
        <View style={styles.infoBox}>
          <Input
            style={styles.inputs}
            value={reason}
            multiline
            returnKeyType="search"
            onChangeText={text => this.saveLabel(text)}
            placeholder="详细描述被举报人的恶意行为(必填,最少输入20个字)"
          />
          <Text style={{ textAlign: 'right', color: '#666' }}>{labelLength || 0}/200</Text>
        </View>
        <Text style={styles.addPz}>上传举报凭证</Text>
        <View style={styles.imgBox}>
          <UploadFile
            getImages={this.getImages}
            label="(选填)最多上传4张照片"
            imageCount={4}
          />
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="举报-详细" />
        <Content>
          {this._renderBody()}
          <View style={styles.btnBox}>
            <TFeedback
              content={
                <View style={styles.submitBtn} onPress={pop}>
                  <Text style={styles.submitBtnText}>提交</Text>
                </View>}
              onPress={() => { this.submit(); }}
            />
          </View>
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

ReportDetailPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportDetailPage);
