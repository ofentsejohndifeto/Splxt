import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform, Linking } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AuthenticatedUserContext } from '../App'; // Replace with your authentication context
import { auth, firestore } from '../config/firebase';
import { collection, doc, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import * as WebBrowser from 'expo-web-browser';
import Constants from 'expo-constants';


const ScheduleAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentStreetName, setAppointmentStreetName] = useState('');
  const [appointmentCity, setAppointmentCity] = useState('');
  const [appointmentSuburb, setAppointmentSuburb] = useState('');
  const [appointmentLocationType, setAppointmentLocationType] = useState('');
  const [appointmentProvince, setAppointmentProvince] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [userAppointments, setUserAppointments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true); // Add the 'loading' state variable

  const [formSubmitted, setFormSubmitted] = useState(false);

  const payFastForm = {
    merchant_id: '22737111',
    merchant_key: 'lnewc15jyysjj',
    amount: '350',
    item_name: 'meeting',
    return_url: 'frankbertelottailoringapp://success',
    cancel_url: 'frankbertelottailoringapp://cancel',
    notify_url: 'frankbertelottailoringapp://notify',
  };
  
  function handleDeepLink(event){
    let data = Linking.parse(event.url);

    setData(data);
  }

  useEffect(()=> {
    Linking.addEventListener("url", handleDeepLink);
    return() => {
      Linking.removeEventListener("url");
    }
  },[]);
  

  const { user } = useContext(AuthenticatedUserContext); // Access authenticated user data
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();

    const checkAppointmentStatus = () => {
      // Check if the appointment date and time have passed
      const appointmentDateTime = new Date(appointmentDate + ' ' + appointmentTime);

      if (appointmentDateTime < today) {
        // Reset form fields
        setAppointmentDate('');
        setAppointmentTime('');
      }
    };

    checkAppointmentStatus();
  }, [appointmentDate, appointmentTime]);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || appointmentDate;
    setAppointmentDate(currentDate.toDateString());
    if (Platform.OS === 'android') {
      setDatePickerVisibility(false);
    } else {
      setDatePickerVisibility(false); // Add this line for iOS
    }
  };
  

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {
      const time = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
      setAppointmentTime(time);
    }
    setTimePickerVisibility(false);
  };
  
  
  

  const showDatePicker = () => {
    if (Platform.OS === 'ios') {
      setDatePickerVisibility(true);
    } else {
      setDatePickerVisibility(true);
    }
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  
  const handleSubmit = () => {
    const payFastFormTest = {
      merchant_id: 10030115,
      merchant_key: 'mn99sd061af9v',
      amount: 350,
      item_name: 'meeting',
      return_url: 'https://bubble.io/how-to-build?ref=footer',
      cancel_url: 'https://bubble.io/how-to-build?ref=footer',
      notify_url: 'https://bubble.io/how-to-build?ref=footer',
    };
  


    const payFastUrl = 'https://sandbox.payfast.co.za/eng/process';
  
    // Construct the query string with the payFastFormTest data
    const queryString = Object.entries(payFastFormTest)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  
    // Combine the PayFast URL with the query string
    const paymentUrl = `${payFastUrl}?${queryString}`;
  
    // Open the payment URL in the browser or app
      openPaymentUrl(paymentUrl)
      .catch((error) => {
        console.error('Failed to open payment URL:', error);
      });
  };
  
  const openPaymentUrl = async (paymentUrl) => {
    const result = await WebBrowser.openBrowserAsync(paymentUrl);
    
    {data? JSON.stringify(data): "App not opened from deep link"}
    console.log(data);
  };
  
  
  const handleSetAppointment = async () => {
    try {
      // Create a user document reference
      const userDocRef = doc(firestore, 'users', user.uid);
  
      // Create an appointments subcollection reference under the user document
      const appointmentsCollectionRef = collection(userDocRef, 'appointments');
  
      // Create a new document in the appointments subcollection
      const newAppointmentDocRef = await addDoc(appointmentsCollectionRef, {
        appointmentDate,
        appointmentTime,
        appointmentStreetName,
        appointmentSuburb,
        appointmentCity,
        appointmentLocationType,
        appointmentProvince,
      });
      
  
      console.log('New appointment document ID:', newAppointmentDocRef.id);
  
      // Reset form fields
      setAppointmentDate('');
      setAppointmentTime('');
      setAppointmentStreetName('');
      setAppointmentSuburb('');
      setAppointmentCity('');
      setAppointmentLocationType('');
      setAppointmentProvince('');
  
      // Fetch the updated appointments
      const appointmentsSnapshot = await getDocs(appointmentsCollectionRef);
      const updatedAppointments = appointmentsSnapshot.docs.map((doc) => doc.data());
      setUserAppointments(updatedAppointments);
  
      // Show the success modal
      setModalVisible(true);
    } catch (error) {
      console.error('Error creating appointment:', error);
      // Handle the error or display an error message
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={showDatePicker}>
          <TextInput
            style={styles.input}
            placeholder="Select date"
            value={appointmentDate}
            editable={false}
            onTouchStart={showDatePicker}
          />
        </TouchableOpacity>
        {isDatePickerVisible && (
          <DateTimePicker
            testID="datePicker"
            value={new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

<TouchableOpacity onPress={showTimePicker}>
  <TextInput
    style={styles.input}
    placeholder="Select Time"
    value={appointmentTime}
    editable={false}
    onTouchStart={showTimePicker}
  />
</TouchableOpacity>

        {isTimePickerVisible && (
          <DateTimePicker
            testID="timePicker"
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Street Name and Number"
          value={appointmentStreetName}
          onChangeText={(text) => setAppointmentStreetName(text)}
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Suburb"
          value={appointmentSuburb}
          onChangeText={(text) => setAppointmentSuburb(text)}
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="City"
          value={appointmentCity}
          onChangeText={(text) => setAppointmentCity(text)}
          editable={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Residence/Work/Restaurant name"
          value={appointmentLocationType}
          onChangeText={(text) => setAppointmentLocationType(text)}
          editable={true}
        />

        <TextInput
          style={styles.input}
          placeholder="Province"
          value={appointmentProvince}
          onChangeText={(text) => setAppointmentProvince(text)}
          editable={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSetAppointment}>
          <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 18 }}>
            Schedule Appointment
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal isVisible={isModalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Appointment created successfully!</Text>
          <Text style={styles.modalSubText}> View the appointments page to keep track of your appointment, communicate any changes or concerns to our whatsapp
          </Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#FC6C85',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSubText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#FC6C85',
    padding: 10,
    width: '70%', // Set the width to 70% of the container
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center', // Center the button horizontally
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center', // Center the text horizontally
  },
});

export default ScheduleAppointment;
