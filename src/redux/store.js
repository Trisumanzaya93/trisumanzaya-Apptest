import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logger from 'redux-logger';
import rpm from 'redux-promise-middleware';
import reducers from './reducer';

const persistConfig = {
  key: 'trisumanzaya_Apptest',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const enhancers = applyMiddleware(rpm, logger);
export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
