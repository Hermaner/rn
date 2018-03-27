import React from 'react';
import { View, BackHandler, WebView } from 'react-native';
import { Container, Content } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Loading, Header } from '../../components';
import { pushRoute, popRoute } from '../../actions';
import Base from './base';
import styles from './styles';

class StrengthBusiness extends Base {
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
    const { postid, type } = this.state;
    return (
      <View>
        <WebView
          scrollEnabled
          scalesPageToFit
          style={styles.box}
          source={{ uri: `https://m.kuaidi100.com/index_all.html?type=${type}&postid=${postid}` }}
        />
        <View style={{ marginTop: 30 }} />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="物流追踪" />
        <Content>
          {this._renderBody()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

StrengthBusiness.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(StrengthBusiness);
