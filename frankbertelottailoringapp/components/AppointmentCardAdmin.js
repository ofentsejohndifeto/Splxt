import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { AuthenticatedUserContext } from '../App';
import moment from 'moment';
import { firestore } from '../config/firebase';
import { doc, getDoc, collection } from 'firebase/firestore';

const AppointmentCardAdmin = ({ appointment }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async (userId) => {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', userId));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setUserData(userData);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error retrieving user data:', error);
      // Handle the error or display an error message
    }
  };

  useEffect(() => {
    if (appointment && appointment.userId) {
      fetchUserData(appointment.userId);
    }
  }, [appointment]);

  const isAppointmentPassed = moment().isAfter(
    moment(appointment.appointmentDate, 'YYYY-MM-DD'),
    'day'
  );

  return (
    <View
      key={appointment.id || 'defaultKey'}
      style={[
        styles.card,
        isAppointmentPassed && styles.passedAppointmentCard, // Apply different style for passed appointments
      ]}
    >
      <View style={styles.userInfo}>
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>
            {userData ? `${userData.firstName} ${userData.surname}` : 'Test User'}
          </Text>
          <Text style={styles.postText}>
            Your appointment with Frank Bertelot has been set. We are keen to meet you!
          </Text>
          <Text style={styles.userName}>Please be punctual.</Text>
          <Text style={styles.postTime}>
            {appointment.appointmentDate}, {appointment.appointmentTime}
          </Text>
        </View>
      </View>
      <View style={styles.postContainer}>
        {isAppointmentPassed && (
          <Text style={styles.postSeparator}>Past Appointment</Text>
        )}
        <Text style={styles.postDetails}>Your appointment location is:</Text>
        <Text style={styles.postText}>
          {appointment.appointmentStreetName}
          {'\n'}
          {appointment.appointmentSuburb}, {appointment.appointmentCity}
          {'\n'}
          {appointment.appointmentProvince}
          {'\n'}
          Location Type: {appointment.appointmentLocationType}
        </Text>
      </View>
    </View>
  );
};

export default AppointmentCardAdmin;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    width: '100%',
    marginBottom: 20,
    borderRadius: 10,
    paddingRight: 35,
    justifyContent: 'center', // Center the content vertically
    alignItems: 'center', // Center the content horizontally
  },
  passedAppointmentCard: {
    backgroundColor: 'lightgrey',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 15,
    paddingBottom: 5,
  },
  userInfoText: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postText: {
    fontSize: 14,
    paddingRight: 15,
    marginBottom: 15,
  },
  postSeparator: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  postDetails: {
    fontSize: 14,
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 15,
    fontStyle: 'italic',
  },
  postContainer: {
    backgroundColor: '#E37383',
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 10,
    paddingTop: 5,
  },
});
