import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import TabHome from './TabHome';
import TabOrder from './TabOrder';
import TabChat from './TabChat';
import TabMine from './TabMine';
import { Mcolor } from '../utils';

const styles = StyleSheet.create({
  tabView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabViewIcon: {
    fontSize: 26,
  },
  tabViewText: {
    fontSize: 12,
  },
});
const TabsScreen = (navigationOptions = {}) => TabNavigator(
  {
    TabHome: {
      screen: TabHome,
    },
    TabOrder: {
      screen: TabOrder,
    },
    TabChat: {
      screen: TabChat,
    },
    TabMine: {
      screen: TabMine,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      ...navigationOptions,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        let name;
        switch (routeName) {
          case 'TabHome':
            iconName = 'ios-home-outline';
            name = '首页';
            break;
          case 'TabOrder':
            iconName = 'ios-list-box-outline';
            name = '接单';
            break;
          case 'TabChat':
            iconName = 'ios-chatbubbles-outline';
            name = '聊天';
            break;
          case 'TabMine':
            iconName = 'ios-contact-outline';
            name = '我';
            break;
          default:
            break;
        }
        return (
          <View style={styles.tabView}>
            <Icon style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
            <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
          </View>
        );
      },
      tabBarOnPress: ({ scene: { index, focused }, jumpToIndex }) => {
        if (focused) {
          return;
        }
        if (index === 2) {
          if (!global.memberId) {
            this.props.push({ key: 'User' });
          }
        }
        jumpToIndex(index);
      },
    }),
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: '#F5F1FF',
      },
    },
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  },
);
TabsScreen.propTypes = {
  push: PropTypes.func,
};
export default TabsScreen();
