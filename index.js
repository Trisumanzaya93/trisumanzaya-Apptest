import 'react-native-gesture-handler';
import Router from './src/Router';
import {AppRegistry, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {HStack, NativeBaseProvider, Spinner} from 'native-base';
import {store, persistor} from './src/redux/store';

const AppWithNavAndRedux = () => (
  <Provider store={store}>
    <NativeBaseProvider>
      <PersistGate
        loading={
          <View style={styles.wrapper}>
            <HStack space={1} alignItems="center">
              <Spinner
                accessibilityLabel="Loading posts"
                color="orange.400"
                size="lg"
              />
            </HStack>
          </View>
        }
        persistor={persistor}>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </PersistGate>
    </NativeBaseProvider>
  </Provider>
);

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  img: {
    width: 300,
    height: 300,
  },
});

AppRegistry.registerComponent(appName, () => AppWithNavAndRedux);
