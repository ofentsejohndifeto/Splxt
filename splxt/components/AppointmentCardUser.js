import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { AuthenticatedUserContext } from '../App';
import moment from 'moment';
import { firestore } from '../config/firebase';
import { query, where, collection, getDocs } from 'firebase/firestore';

const AppointmentCardUser = ({ appointment }) => {
  const { user } = useContext(AuthenticatedUserContext);
  const navigation = useNavigation();
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserAppointments = async () => {
    try {
      const appointmentsSnapshot = await getDocs(
        query(collection(firestore, 'users', user.uid, 'appointments'))
      );

      if (!appointmentsSnapshot.empty) {
        const appointmentData = appointmentsSnapshot.docs.map((doc) => doc.data());
        setAppointmentData(appointmentData);
      } else {
        setAppointmentData(null); // No matching appointment found
      }
    } catch (error) {
      console.error('Error retrieving appointments:', error);
      // Handle the error or display an error message
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAppointments(user);
    }
  }, [user, loading]); // Add 'loading' as a dependency

  useEffect(() => {
    if (loading) {
      fetchUserAppointments(user);
      setLoading(false);
    }
  }, [loading, user]); // Add 'loading' and 'user' as dependencies

  const appointmentDateTime = moment(
    `${appointment.appointmentDate} ${appointment.appointmentTime}`,
    'YYYY-MM-DD HH:mm'
  );
  const isAppointmentPassed = moment().isAfter(appointmentDateTime);

  return (
    <View
      key={appointmentData?.uid || 'defaultKey'}
      style={[
        styles.card,
        isAppointmentPassed ? styles.passedAppointmentCard : null, // Apply different style for passed appointments
      ]}
    >
      <View style={styles.userInfo}>
        <View style={styles.userInfoText}>
          <Text style={styles.userName}>
            {user ? user.firstName || 'Test' : 'Test'} {user ? user.surname || 'User' : 'User'}
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
      <View
        style={[
          styles.postContainer,
          isAppointmentPassed ? styles.passedAppointmentPostContainer : null, // Apply different style for passed appointments
        ]}
      >
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

export default AppointmentCardUser;

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
    // Apply different styles for passed appointments
    borderWidth: 2,
    borderColor: 'lightgrey',
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
  passedAppointmentPostContainer: {
    // Apply different styles for passed appointments
    backgroundColor: 'lightgrey',
    width: '90%',
    borderRadius: 10,
    borderWidth: 2,
    paddingLeft: 10,
    paddingTop: 5,
  },
});
