import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { Mcolor } from '../utils';

const styles = StyleSheet.create({
  tabsView: {
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    height: 46,
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabUnderlineStyle: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tablineView: {
    flex: 1,
    height: 2,
    backgroundColor: Mcolor,
  },
});
export default class ScrollableTab extends React.Component {
  static propTypes = {
    tabs: PropTypes.array,
    containerWidth: PropTypes.number,
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    scrollValue: PropTypes.any,
  };
  constructor(props) {
    super(props);
    this.state = {
      isDisable: false,
    };
  }
  renderTab(name, page, isTabActive, goPage) {
    return (
      <TouchableOpacity
        style={styles.tab}
        key={name}
        onPress={() => goPage(page)}
      >
        <View>
          <Text style={{ color: isTabActive ? Mcolor : '#555', fontSize: 14 }}>{name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    const { tabs, containerWidth, scrollValue, goToPage, activeTab } = this.props;
    const numberOfTabs = tabs.length;
    const left = {
      transform: [
        {
          translateX: scrollValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, containerWidth / numberOfTabs],
          }),
        },
      ],
    };
    return (
      <View style={styles.tabsView}>
        {
          tabs.map((name, index) => {
            const isTabActive = activeTab === index;
            const renderTab = this.renderTab;
            return renderTab(name, index, isTabActive, goToPage);
          })
        }
        <Animated.View
          style={[styles.tabUnderlineStyle, left, { width: containerWidth / numberOfTabs }]}
        >
          <View style={[styles.tablineView, { width: containerWidth / numberOfTabs }]} />
        </Animated.View>
      </View>
    );
  }

}
