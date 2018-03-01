import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, Header, UploadLogo, TitleItem } from '../../components';
import base from './base';
import styles from './styles';

class MgMasterLogo extends base {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
    };
  }
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  _renderLogo() {
    const { initImage, title } = this.state;
    return (
      <View style={styles.mainList}>
        <TitleItem text={title} />
        <UploadLogo
          initImage={initImage}
          getImages={this.getImages}
        />
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    const { title } = this.state;
    return (
      <Container>
        <Header back={pop} title={title} />
        <Content style={styles.content}>
          {this._renderLogo()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MgMasterLogo.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MgMasterLogo);
