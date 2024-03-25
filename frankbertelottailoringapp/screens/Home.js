import React, {useEffect, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking
} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { AuthenticatedUserContext } from '../App'; // Replace with your authentication context


    // function handleLinkPress() {
    //   const websiteUrl = 'https://frank-bertelot-bespoke.business.site/';
    //   Linking.openURL(websiteUrl);
    // };


const Home = () => {

  const { user } = useContext(AuthenticatedUserContext);

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Image
                    source={{uri: user ? user.userImg || 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg' : 'https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg'}}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]);

    const handleWhatsAppPress = () => {
      // Replace '1234567890' with the recipient's phone number
      const phoneNumber = '+27732980539';
  
      // Create the WhatsApp link
      const whatsappLink = `https://wa.me/${phoneNumber}`;
  
      // Open the WhatsApp link using the Linking API
      Linking.openURL(whatsappLink)
        .catch((error) => {
          console.error('Failed to open WhatsApp link:', error);
        });
    };

    const handleInstagramPress = () => {
      // Replace 'instagram_username' with the actual Instagram username or profile ID
      const username = 'frankbertelot.tailoring';
  
      // Create the Instagram link
      const instagramLink = `https://www.instagram.com/${username}`;
  
      // Open the Instagram link using the Linking API
      Linking.openURL(instagramLink)
        .catch((error) => {
          console.error('Failed to open Instagram link:', error);
        });
    };

    const handleWebsitePress = () => {
      const websiteUrl = 'https://www.iol.co.za/the-star/news/building-on-the-bertelot-brand-29246622';
    
      Linking.openURL(websiteUrl)
        .catch((error) => {
          console.error('Failed to open website link:', error);
        });
    };
    

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Image
              style={styles.userImg}
              source= {require('../assets/FrankIntroduction.jpg')} styles={styles.userImg}
            />
            <Text style={styles.userName}>Frank Bertelot</Text>
            {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
            <Text style={styles.aboutUser}>
            'At Frank Bertelot Bespoke your suit is custom-made from the moment you walk through the door. Each individual’s experience is tailor-made at every step of creation. A garment should be like a barbed-wire fence: serving its purpose without obstructing the view. Clothing of which is a form of self-expression to which there are hints about who you are in what you wear.'
            </Text>
    
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
                <Text style={styles.userInfoTitle}>1000+</Text>
                <Text style={styles.userInfoSubTitle}>Garments created</Text>
              </View>
              <TouchableOpacity onPress={handleWhatsAppPress}>
      <View>
        <Image
          source={require('../assets/whatsapp-logo.png')}
          resizeMode="contain"
          style={{ width: 40, height: 30, marginBottom: 5, alignSelf: 'center'}}
        />
        <Text style={styles.userInfoSubTitle}> WhatsApp </Text>
      </View>
    </TouchableOpacity>
            </View>
            <View style={styles.userInfoWrapper}>
              <View style={styles.userInfoItem}>
              <TouchableOpacity onPress={handleInstagramPress}>
      <View>
        <Image
          source={require('../assets/instagram-logo.png')}
          resizeMode="contain"
          style={{ width: 40, height: 30, marginBottom: 5, alignSelf: 'center'}}
        />
        <Text style={styles.userInfoSubTitle}> Instagram </Text>
      </View>
    </TouchableOpacity>
      </View>
              <TouchableOpacity onPress={handleWebsitePress}>
      <View>
        <Image
          source={require('../assets/iol-logo.gif')}
          resizeMode="contain"
          style={{ width: 40, height: 30, marginBottom: 5, alignSelf: 'center'}}
        />
        <Text style={styles.userInfoSubTitle}> IOL interview </Text>
      </View>
      
    </TouchableOpacity>
            </View>
            
          </ScrollView>
        </SafeAreaView>
      );
    };
    
    export default Home;
    
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
      aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
      },
      userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
      },
      userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: '#2e64e5',
      },
      userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
      },
      userInfoItem: {
        justifyContent: 'center',
      },
      userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
      },
      userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
      },
    });