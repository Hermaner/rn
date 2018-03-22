import React from 'react';
import { BackHandler, View } from 'react-native';
import { Container, Content, Icon, Text } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { pushRoute, popRoute } from '../../actions';
import { Header, TFeedback } from '../../components';
import reportPageBase from './base';
import styles from './styles';

class ReportPage extends reportPageBase {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      swiperData: [],
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
    // this.getInit();
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }
  onBackPress = () => {
    this.props.pop();
    return true;
  };
  _renderBody() {
    const { list } = this.state;
    return (
      <View style={styles.maskerContent}>
        {
          list.map((item, index) => (
            <View style={styles.row} key={index}>
              <View style={{ flexDirection: 'row' }}>
                <View style={styles.circle} />
                <View>
                  <Text style={styles.listTitle}>{item.title}</Text>
                  <View style={styles.flexRow}>
                    <Text style={styles.listLabel}>{item.label}</Text>
                    <TFeedback
                      content={
                        <Text style={styles.listLabelRight}>{item.labelTitle}</Text>}
                      onPress={() => this.listPush(index)}
                    />
                  </View>
                </View>
              </View>
            </View>
          ))
        }
      </View>
    );
  }
  render() {
    const { pop } = this.props;
    return (
      <Container>
        <Header back={pop} title="认证介绍" />
        <Content>
          {this._renderBody()}
        </Content>
      </Container>
    );
  }
}

ReportPage.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(ReportPage);
