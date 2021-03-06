import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Button, Icon } from 'native-base';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback, UploadFile, Loading } from '../../components';
import base from './base';
import styles from './styles';

class CgyxComfirm extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    this.getData();
    this.initData();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.deleteData();
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
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
                  {
                    index !== 0 && <Icon name="md-arrow-dropright" style={styles.listIcon} />
                  }
                </View>}
              onPress={() => { this.goPage(index); }}
            />
          ))
        }
      </View>
    );
  }
  _renderUpload() {
    const { initImages } = this.state;
    return (
      <View style={styles.upView}>
        <View style={styles.listTitle}>
          <Text style={styles.listTitleText}>货品图片</Text>
        </View>
        <View style={styles.listLabel}>
          {
            initImages &&
            <UploadFile
              initImages={initImages}
              getImages={this.getImages}
              label="上传1-10张照片"
              imageCount={10}
            />
          }
        </View>
      </View>
    );
  }
  _renderButton() {
    return (
      <View style={{ padding: 10, backgroundColor: '#fff' }}>
        <TFeedback
          content={
            <View style={styles.btn}>
              <Text style={{ color: '#fff' }}>选好了</Text>
            </View>
          }
          onPress={this.saveData}
        />
      </View>
    );
  }
  render() {
    return (
      <Container>
        <Header back={this.backToList} title="发布供应" />
        <Content>
          {this._renderList()}
          {this._renderUpload()}
        </Content>
        {this._renderButton()}
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

CgyxComfirm.propTypes = {
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(CgyxComfirm);
