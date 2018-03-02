import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Footer } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity, UploadFile } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterCert extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.pop();
      return true;
    });
  }
  componentWillUnmount() {
  }
  _renderImages() {
    const { initImages } = this.state;
    console.log(initImages);
    return (
      <View style={[styles.mainList, { paddingBottom: 10 }]}>
        <TitleItem text="上传证书图片" />
        <UploadFile
          initImages={initImages}
          getImages={this.getImages}
          label="上传证书图片"
          imageCount={20}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="上传证书图片" />
        <Content>
          {this._renderImages()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即上传'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterCert.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterCert);
