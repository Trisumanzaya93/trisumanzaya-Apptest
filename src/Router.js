import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Started from './screens/started';
import Home from './screens/home';

const Stack = createStackNavigator();

const Router = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Startet" component={Started} />
    <Stack.Screen name="Home" component={Home} />
  </Stack.Navigator>
);

export default Router;
