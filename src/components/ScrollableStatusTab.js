import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { st, Mcolor } from '../utils';

const styles = StyleSheet.create({
  ...st,
  tabsView: {
    flexDirection: 'row',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    height: 40,
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
  displayCountBox: {
    position: 'absolute',
    right: 10,
    top: 0,
    height: 20,
    ...st.jacenter,
    borderRadius: 10,
    backgroundColor: Mcolor,
    paddingLeft: 6,
    paddingRight: 6,
  },
});
export default class ScrollableTab extends React.Component {
  static propTypes = {
    tabs: PropTypes.array,
    containerWidth: PropTypes.number,
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    scrollValue: PropTypes.any,
    count: PropTypes.array,
  };
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      isDisable: false,
    };
  }
  renderTab(name, page, isTabActive, goPage, count) {
    return (
      <TouchableOpacity
        style={styles.tab}
        key={name}
        onPress={() => goPage(page)}
      >
        <View>
          <Text style={{ color: isTabActive ? Mcolor : '#555', fontSize: 14 }}>{name}</Text>
        </View>
        {
          count && count !== '0' && count !== '' &&
          <View style={styles.displayCountBox}>
            <Text style={{ fontSize: 10, color: '#fff' }}>{count}</Text>
          </View>
        }
      </TouchableOpacity>
    );
  }
  render() {
    const { tabs, containerWidth, scrollValue, goToPage, activeTab, count } = this.props;
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
    const tabData = [];
    tabs.forEach((item, index) => {
      tabData.push({ name: item, count: count[index] });
    });
    return (
      <View style={styles.tabsView}>
        {
          tabData.map((item, index) => {
            const isTabActive = activeTab === index;
            const renderTab = this.renderTab;
            return renderTab(item.name, index, isTabActive, goToPage, item.count);
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
