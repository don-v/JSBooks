import React from 'react';
import { Text, View, ScrollView, Button } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
// add import for createStackNavigator
import { createStackNavigator } from 'react-navigation-stack';

// import screen components
import Feed from './feed';
import Favorites from './favorites';
import MyNotes from './mynotes';
import NoteScreen from './note';

const TabNavigator = createBottomTabNavigator({
    FeedScreen: {
      screen: Feed,
      navigationOptions: {
        tabBarLabel: 'Feed',
      }
    },
    MyNoteScreen: {
      screen: MyNotes,
      navigationOptoins: {
        tabBarLabel: 'My Notes',
      }
    },
    FavoriteScreen: {
      screen: Favorites,
      navigationOptions: {
        tabBarLabel: 'Favorites',
      }
    }
  });  

// create the app container
export default createAppContainer(TabNavigator);
