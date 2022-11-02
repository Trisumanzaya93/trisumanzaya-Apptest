import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  deleteContactAction,
  getContactAction,
  updateContactAction,
} from '../redux/actions/apiAction';
import {Box, Input} from 'native-base';

const Card = ({data}) => {
  const dispatch = useDispatch();
  const contact = data.item;
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: null,
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
  const handleDelete = async () => {
    setIsLoading1(true);
    const id = contact.id;
    await dispatch(deleteContactAction(id));
    await dispatch(getContactAction());
    ToastAndroid.show('Delete Success', ToastAndroid.SHORT);
    setIsLoading1(false);
    setModalVisible(false);
  };
  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      let body = {};
      if (form.firstName !== '') {
        body = {...body, firstName: form.firstName};
      }
      if (form.lastName !== '') {
        body = {...body, lastName: form.lastName};
      }
      if (form.age !== '') {
        const age = parseInt(form.age, 10);
        body = {...body, age};
      }
      if (form.photo !== '') {
        body = {...body, photo: form.photo};
      }
      console.log(body);
      await dispatch(updateContactAction(contact.id, body));
      await dispatch(getContactAction());
      ToastAndroid.show('Success Create', ToastAndroid.SHORT);
      setIsLoading(false);
      setModalVisible1(false);
    } catch (error) {
      setIsLoading(false);
      ToastAndroid.show(
        'Input must be number and less then or equal to 100',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <>
      <View style={styles.wrapperCard}>
        <View style={styles.wrapperImg}>
          {contact.photo === 'N/A' ? (
            <Image
              source={require('../assets/images/img.png')}
              style={styles.img}
            />
          ) : (
            <Image source={{uri: `${contact.photo}`}} style={styles.img} />
          )}
        </View>
        <View style={styles.wrapperTitleCard}>
          <Text
            style={
              styles.textName
            }>{`${contact.firstName} ${contact.lastName}`}</Text>
          <Text style={styles.textAge}>age : {contact.age}</Text>
          <View style={styles.wrapperAction}>
            <TouchableOpacity
              style={styles.btnDelete}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textDelete}>x</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible1(!modalVisible1)}>
              <Image
                source={require('../assets/images/edit.png')}
                style={styles.imgEdit}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* start Modal */}
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textCencel}>Are you sure?</Text>
              <View style={styles.wrapperActionCreate}>
                {isLoading1 ? (
                  <TouchableOpacity style={styles.btnCreate}>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleDelete}
                    style={styles.btnCreate}>
                    <Text style={styles.textSave}>Delete</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={() => setModalVisible(!modalVisible)}
                  style={styles.btnCencel}>
                  <Text style={styles.textCencel}>Cencel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible1}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible1(!modalVisible1);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.textCencel}>Edit Contact</Text>
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
                  onPress={() => setModalVisible1(!modalVisible1)}
                  style={styles.btnCencel}>
                  <Text style={styles.textCencel}>Cencel</Text>
                </TouchableOpacity>
                {isLoading ? (
                  <TouchableOpacity style={styles.btnCreate}>
                    <ActivityIndicator size="small" color="#ffffff" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleUpdate}
                    style={styles.btnCreate}>
                    <Text style={styles.textSave}>Update</Text>
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
  wrapperCard: {
    width: '90%',
    height: 130,
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    elevation: 10,
    shadowColor: '#000000',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  wrapperImg: {
    height: '90%',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
  wrapperTitleCard: {
    height: '100%',
    width: '65%',
    paddingLeft: 20,
    paddingTop: 20,
  },
  textName: {
    fontSize: 15,
    fontFamily: 'Poppins-Black',
  },
  textAge: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'Poppins-Reguler',
  },
  wrapperAction: {
    marginTop: 15,
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnDelete: {
    width: 25,
    height: 25,
    borderRadius: 18,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000000',
  },
  textDelete: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: '#ffffff',
  },
  imgEdit: {
    width: 30,
    height: 30,
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
  wrapperActionCreate: {
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
});

export default Card;
