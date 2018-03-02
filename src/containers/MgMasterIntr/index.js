import React from 'react';
import { View, BackHandler } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Text, Footer, Input } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Header, Loading, TitleItem, TOpacity } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterPublish extends base {
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
  _renderContent() {
    const { detail } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text="服务介绍" />
        <View style={[styles.listView, styles.memoView]}>
          <View style={styles.listRight}>
            <Input
              multiline
              style={styles.listMemo}
              placeholderTextColor="#999"
              placeholder="输入您的服务介绍"
              clearButtonMode="while-editing"
              value={detail}
              onChangeText={value => this.setState({ detail: value })}
            />
          </View>
        </View>
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="服务介绍" />
        <Content>
          {this._renderContent()}
        </Content>
        <Footer style={styles.footer}>
          <TOpacity
            style={styles.btnView}
            content={
              <Text style={styles.btnText}>{'立即保存'}</Text>
            }
            onPress={this.save}
          />
        </Footer>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterPublish.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterPublish);
