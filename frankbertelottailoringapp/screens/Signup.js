import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

import Tabs from "../navigation/tabs";
import AdminTabs from "../navigation/adminTabs"

export default function Signup({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');


  const onHandleSignup = () => {
    if (email !== '' && password !== '' && password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
  
          // Determine isAdmin value based on administrator email
          const isAdmin = email === 'frankbertelot@gmail.com';
  
          // Save user data to Firestore
          const userRef = doc(collection(firestore, 'users'), user.uid);
          setDoc(userRef, {
            email,
            firstName,
            surname,
            userImg: null,
            isAdmin,
            phoneNumber
          });
  
          console.log('Signup success');
        })
        .catch((err) => Alert.alert('Signup error', err.message));
    } else {
      Alert.alert('Signup error', 'Password and Confirm Password do not match.');
    }
  };
  
  
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <SafeAreaView style={styles.form}>
         <TextInput
        style={styles.input}
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={true}
        textContentType="password"
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
      style={styles.input}
      placeholder="Confirm password"
      autoCapitalize="none"
      autoCorrect={false}
      secureTextEntry={true}
      textContentType="password"
      value={confirmPassword}
      onChangeText={(text) => setConfirmPassword(text)}
    />

    <TextInput
      style={styles.input}
      placeholder="First name"
      autoCapitalize="words"
      value={firstName}
      onChangeText={(text) => setFirstName(text)}
    />

    <TextInput
      style={styles.input}
      placeholder="Surname"
      autoCapitalize="words"
      value={surname}
      onChangeText={(text) => setSurname(text)}
    />
    <TextInput
          style={styles.input}
          placeholder="Phone number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          editable={true}
        />

      <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Sign Up</Text>
      </TouchableOpacity>
      <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
        <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{color: '#FC6C85', fontWeight: '600', fontSize: 14}}> Log In</Text>
        </TouchableOpacity>
      </View>
      </SafeAreaView>
      </ScrollView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 45,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#FC6C85',
    height: 58,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
});