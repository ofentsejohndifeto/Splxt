import React, { useState, useEffect, useLayoutEffect, useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors';
import { auth, firestore } from '../config/firebase';
import { AuthenticatedUserContext } from '../App';


const Profile = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log('Error logging out: ', error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign name="logout" size={24} color={colors.gray} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    navigation.addListener('focus', () => setLoading(!loading));
  }, [navigation, loading]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity>
          <Image
            style={styles.userImg}
            source={{
              uri: user
                ? user.userImg || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg'
                : 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg',
            }}
          />
        </TouchableOpacity>
        <Text style={styles.userName}>
          {user ? user.firstName || 'Test' : 'Test'} {user ? user.surname || 'User' : 'User'}
        </Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>{user ? user.phoneNumber || 'More details to be added' : ''}</Text>
        <View style={styles.userBtnWrapper}>{/* ... your existing code ... */}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#FC6C85',
  },
});
