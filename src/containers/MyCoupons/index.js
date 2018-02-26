import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Text, Content, Icon } from 'native-base';
import { connect } from 'react-redux';
import { popRoute, pushRoute } from '../../actions';
import { Loading, TOpacity, Header, CouponItem } from '../../components';
import base from './base';
import styles from './styles';

class MyCoupons extends base {
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
  }
  _renderContent() {
    const { items } = this.state;
    return (
      <View style={styles.content}>
        {
          items.map((item, index) => (
            <View key={index} style={styles.list}>
              <View style={styles.title}>
                <View style={styles.titleColor}>
                  <Icon name="md-apps" style={styles.titleIcon} />
                </View>
                <Text style={styles.listLabel}>{item.name}</Text>
              </View>
              <View style={styles.tabs}>
                {
                  item.childs.map((list, i) => (
                    <TOpacity
                      key={i}
                      style={styles.tab}
                      content={
                        <Text style={styles.tabText}>{list.name}</Text>
                      }
                      onPress={() => this.props.push({ key: 'MasterList', params: { typeIds: list.id } })}
                    />
                  ))
                }
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
        <Header
          back={pop}
          title="选择师傅类别"
        />
        <Content>
          {this._renderContent()}
        </Content>
        <Loading ref={(c) => { this.sleek = c; }} />
      </Container>
    );
  }
}

MyCoupons.propTypes = {
  pop: PropTypes.func,
  push: PropTypes.func,
};
export default connect(null, { pop: popRoute, push: pushRoute })(MyCoupons);
