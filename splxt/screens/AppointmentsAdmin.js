import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { AuthenticatedUserContext } from '../App';
import { firestore } from '../config/firebase';
import { collectionGroup, getDocs, doc, collection } from 'firebase/firestore';
import AppointmentCardAdmin from '../components/AppointmentCardAdmin';

const AppointmentsAdmin = () => {
  const { user } = useContext(AuthenticatedUserContext);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collectionGroup(firestore, 'appointments'));
        const appointmentsData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id, // Add the appointment ID to the data object
        }));
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (error) {
        console.error('Error retrieving appointments:', error);
        setLoading(false);
      }
    };

    if (isFocused) {
      fetchAppointments();
    }
  }, [isFocused]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <Text>Loading appointments...</Text>
      ) : appointments.length === 0 ? (
        <Text>No appointments scheduled</Text>
      ) : (
        appointments.map((appointment, index) => (
          <AppointmentCardAdmin key={index} appointment={appointment} />
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

export default AppointmentsAdmin;
