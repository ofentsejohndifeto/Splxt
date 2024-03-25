import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, Text, View, Keyboard, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, KeyboardAvoidingView } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/frankbertelotboutiquelogo.png");

export default function Login({ navigation }) {

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const [isInputFocused, setInputFocused] = useState(Keyboard.dismissed);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setInputFocused(true);
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300, // Adjust the duration as desired
          useNativeDriver: false,
        }).start();
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setInputFocused(false);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300, // Adjust the duration as desired
          useNativeDriver: false,
        }).start();
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [fadeAnim]);


  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Image
        source={backImage}
        style={[
          styles.backImage,
          { opacity: isInputFocused ? 0 : 1 }
        ]}
      />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
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
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
        />
        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}> Login </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
          <Text style={{ color: 'gray', fontWeight: '600', fontSize: 14 }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: '#FC6C85', fontWeight: '600', fontSize: 14 }}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: "#FC6C85",
    alignSelf: "center",
    paddingBottom: 24,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: "100%",
    height: 180,
    position: "absolute",
    top: 0,
    resizeMode: 'cover',
    paddingTop: 5,
  },
  whiteSheet: {
    width: '100%',
    height: '70%',
    position: "absolute",
    bottom: 0,
    backgroundColor: '#fff',

  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 100,
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
