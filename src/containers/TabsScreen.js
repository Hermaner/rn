import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'native-base';
import { View, Text, StyleSheet, DeviceEventEmitter } from 'react-native';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import TabHome from './TabHome';
import TabOrder from './tabOrders';
import TabChat from './TabChat';
import TabMine from './TabMine';
import { Mcolor, st } from '../utils';

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
  tabMidView: {
    ...st.jacenter,
  },
  tabMidColor: {
    backgroundColor: Mcolor,
    borderWidth: 3,
    overflow: 'hidden',
    borderColor: '#f8f8f8',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabMidIcon: {
    fontSize: 30,
    color: '#fff',
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
    TabAdd: {
      screen: 'TabAdd',
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
      tabBarIcon: (data) => {
        const { focused } = data;
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
          case 'TabAdd':
            iconName = 'ios-add';
            name = '发布';
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
          <View style={{ overflow: 'visible' }}>
            {
              routeName === 'TabAdd' ?
                <View style={styles.tabMidView}>
                  <View style={styles.tabMidColor}>
                    <Icon style={[styles.tabMidIcon]} name={iconName} />
                  </View>
                </View>
                :
                <View style={styles.tabView}>
                  <Icon style={[styles.tabViewIcon, { color: focused ? Mcolor : '#666' }]} name={iconName} />
                  <Text style={[styles.tabViewText, { color: focused ? Mcolor : '#666' }]}>{name}</Text>
                </View>
            }
          </View>
        );
      },
      tabBarOnPress: ({ scene: { index, focused }, jumpToIndex }) => {
        if (focused) {
          return;
        }
        if (index === 2) {
          DeviceEventEmitter.emit('emitmodalShow');
        } else {
          jumpToIndex(index);
        }
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
  midPress: PropTypes.func,
};
export default TabsScreen();
