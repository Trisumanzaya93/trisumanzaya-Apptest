import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Started = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>Welcome</Text>
      <Text style={styles.textTitle1}>To Contact App</Text>
      <View style={[styles.wrapperSection, styles.shadowProp]}>
        <View style={styles.wrapperImg}>
          <Image
            source={require('../../assets/images/img.png')}
            style={styles.img}
          />
          <View style={styles.line} />
          <View style={styles.line} />
        </View>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Home')}>
        <Text style={styles.textTitle1}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f59e0b',
    display: 'flex',
    alignItems: 'center',
  },
  wrapperSection: {
    marginTop: '10%',
    width: '80%',
    height: '50%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  shadowProp: {
    elevation: 50,
    shadowColor: '#000000',
  },
  textTitle: {
    marginTop: 40,
    fontSize: 40,
    fontFamily: 'Poppins-Black',
  },
  textTitle1: {
    fontSize: 20,
    fontFamily: 'Poppins-Black',
  },
  wrapperImg: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 250,
    height: 250,
    marginTop: 40,
    marginBottom: 20,
  },
  line: {
    width: '70%',
    height: 3,
    backgroundColor: '#f59e0b',
    marginBottom: 20,
  },
  btn: {
    width: '80%',
    height: 50,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginTop: 'auto',
    marginBottom: 60,
    elevation: 50,
    shadowColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default Started;
