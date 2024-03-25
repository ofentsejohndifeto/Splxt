import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? '#E37383' : '#FC6C85';

  return (
    <View
      style={{
        width: 6,
        height: 6,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 20 }} {...props}>
    <Text style={{ fontSize: 16, color: '#ADD8E6' }}>Skip</Text>
  </TouchableOpacity>
);

const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 25 }} {...props}>
    <Text style={{ fontSize: 16, color: '#FC6C85' }}>Next</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 30 }} {...props}>
    <Text style={{ fontSize: 16, color: '#ADD8E6' }}>Done</Text>
  </TouchableOpacity>
);

export default function OnboardingScreen({ navigation }) {
  return (
    <Onboarding
      SkipButtonComponent={Skip}
      NextButtonComponent={Next}
      DoneButtonComponent={Done}
      DotComponent={Dots}
      onSkip={() => navigation.replace('Login')}
      onDone={() => navigation.navigate('Login')}
      bottomBarColor="white" // set the bottom bar color to white
      pages={[
        {
          backgroundColor: '#fff',
          title: 'Connect with Frank Bertelot',
          subtitle: 'Chat or arrange a face to face consultation with South Africas best tailor',
          image: <Image source={require('../assets/frankbertelot.png')} style={styles.image} />,
        },
        {
          backgroundColor: '#fff',
          image: (
            <Image source={require('../assets/frankbertelotknitting.png')} style={styles.image} />
          ),
          title: 'Bring your garments from ideation to life',
          subtitle: 'He will meet with you to discuss fabrics and take measurements for any type of garment',
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 250,
    marginBottom: 20,
  },
});
