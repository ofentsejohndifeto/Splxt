import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native'; // Import useIsFocused hook
import { AuthenticatedUserContext } from '../App'; // Replace with your authentication context
import { firestore } from '../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import AppointmentCardUser from '../components/AppointmentCardUser';

const AppointmentsUser = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused(); // Hook to check if the screen is focused
  const [key, setKey] = useState(Date.now()); // Use a key to trigger re-render

  
  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const appointmentsSnapshot = await getDocs(
          collection(firestore, 'users', user.uid, 'appointments')
        );

        const userAppointments = appointmentsSnapshot.docs.map((doc) => doc.data());
        setUserAppointments(userAppointments);
        setLoading(false); // Set loading to false once appointments are fetched
      } catch (error) {
        console.error('Error retrieving user appointments:', error);
        // Handle the error or display an error message
        setLoading(false); // Set loading to false in case of an error
      }
    };

    if (user && isFocused) { // Check if the user is logged in and the screen is focused
      fetchUserAppointments();
    }
  }, [user, isFocused, key]); // Add 'isFocused' and 'key' to dependencies

  useEffect(() => {
    // Update the key when the screen is focused to trigger a re-render
    if (isFocused) {
      setKey(Date.now());
    }
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text>Loading appointments...</Text> // Display a loading message while loading
      ) : userAppointments.length === 0 ? (
        <Text>No appointments scheduled</Text>
      ) : (
        userAppointments.map((appointment, index) => (
          <AppointmentCardUser key={index} appointment={appointment} />
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
});

export default AppointmentsUser;
