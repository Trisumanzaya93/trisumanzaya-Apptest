import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  FlatList,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Card from '../../component/card';
import {useDispatch, useSelector} from 'react-redux';
import {
  createContactAction,
  getContactAction,
} from '../../redux/actions/apiAction';
import {Box, Input} from 'native-base';

const Home = () => {
  const dispatch = useDispatch();
  const allContact = useSelector(state => state.getContact.contactList);
  const isLoading = useSelector(state => state.getContact.isPending);
  console.log(isLoading);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });
  const handleFirstName = text => {
    setForm({...form, firstName: text});
  };
  const handleLastName = text => {
    setForm({...form, lastName: text});
  };
  const handleAge = text => {
    setForm({...form, age: text});
  };
  const handlePhoto = text => {
    setForm({...form, photo: text});
  };
  const handleCreate = async () => {
    setIsLoadingCreate(true);
    if (
      form.firstName === '' ||
      form.lastName === '' ||
      form.age === '' ||
      form.photo === ''
    ) {
      return ToastAndroid.show('incomplete form', ToastAndroid.SHORT);
    }
    await dispatch(createContactAction(form));
    await dispatch(getContactAction());
    setIsLoadingCreate(false);
    ToastAndroid.show('Success Create', ToastAndroid.SHORT);
    setModalVisible(false);
  };
  useEffect(() => {
    dispatch(getContactAction());
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.wraperHeader}>
          <Text style={styles.textHeader}>Contact List</Text>
          <TouchableOpacity
            style={styles.btnAdd}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textBtn}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.wrapperList}>
          {isLoading ? (
            <>
              <ActivityIndicator size="large" color="#f59e0b" />
              <Text style={{marginTop: 10}}>Loading</Text>
            </>
          ) : (
            <FlatList
              data={allContact}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderItem={(item, index) => {
                console.log(item);
                return <Card data={item} key={index} />;
              }}
            />
          )}
        </View>
        {/* start modal */}
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textCencel}>Create Contact</Text>
              <Box alignItems="center" w="100%">
                <Input
                  mx="3"
                  mt="3"
                  borderColor="amber.500"
                  variant="underlined"
                  placeholder="First Name"
                  w="100%"
                  onChangeText={handleFirstName}
                />
                <Input
                  mx="3"
                  mt="3"
                  borderColor="amber.500"
                  variant="underlined"
                  placeholder="Last Name"
                  w="100%"
                  onChangeText={handleLastName}
                />
                <Input
                  mx="3"
                  mt="3"
                  borderColor="amber.500"
                  variant="underlined"
                  placeholder="Age"
                  w="100%"
                  keyboardType="numeric"
                  onChangeText={handleAge}
                />
                <Input
                  mx="3"
                  mt="3"
                  variant="underlined"
                  placeholder="URL Photo"
                  w="100%"
                  onChangeText={handlePhoto}
                />
              </Box>
              <View style={styles.wrapperActionCreate}>
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btnCencel}>
                  <Text style={styles.textCencel}>Cencel</Text>
                </TouchableOpacity>
                {isLoadingCreate ? (
                  <TouchableOpacity style={styles.btnCreate}>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleCreate}
                    style={styles.btnCreate}>
                    <Text style={styles.textSave}>Create</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  wraperHeader: {
    width: '100%',
    height: 80,
    backgroundColor: '#f59e0b',
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 500,
    shadowColor: '#000000',
    zIndex: 99,
  },
  textHeader: {
    fontFamily: 'Poppins-Black',
    fontSize: 23,
  },
  btnAdd: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    elevation: 50,
    shadowColor: '#000000',
  },
  textBtn: {
    fontFamily: 'Poppins-Reguler',
    fontSize: 20,
  },
  wrapperList: {
    width: '100%',
    marginLeft: 15,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    height: '90%',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textCreate: {
    fontFamily: 'Poppins-Black',
    fontSize: 20,
  },
  wrapperActionCreate: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  btnCencel: {
    width: 80,
    height: 30,
    borderRadius: 10,
    borderColor: '#f59e0b',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCencel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
  },
  btnCreate: {
    width: 80,
    height: 30,
    borderRadius: 10,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSave: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#ffffff',
  },
});

export default Home;
