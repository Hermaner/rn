import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon } from 'native-base';
import SleekLoadingIndicator from 'react-native-sleek-loading-indicator';
import { connect } from 'react-redux';
import { resetHome, pushRoute } from '../../actions';
import { Header, TFeedback, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class CgyCategory extends base {
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
  _renderUpload() {
    return (
      <View style={styles.upView}>
        <View style={styles.listTitle}>
          <Text style={styles.listTitleText}>货品图片</Text>
        </View>
        <View style={styles.listLabel}>
          <UploadFile
            getImages={this.getImages}
            label="(选填)最多上传10张照片"
            imageCount={10}
          />
        </View>
      </View>
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <Button onPress={this.saveData} full light style={styles.btn}><Text style={{ color: '#fff' }}>选好了</Text></Button>
      </View>
    );
  }
  render() {
    const { isSleekShow } = this.state;
    return (
      <Container>
        <Header back={this.backToHome} title="发布供应" />
        <Content>
          {this._renderList()}
          {this._renderUpload()}
        </Content>
        {this._renderButton()}
        <SleekLoadingIndicator loading={isSleekShow} />
      </Container>
    );
  }
}

CgyCategory.propTypes = {
  resetHome: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { resetHome, push: pushRoute })(CgyCategory);