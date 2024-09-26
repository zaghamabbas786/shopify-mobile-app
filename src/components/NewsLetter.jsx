import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useState} from 'react';
import CustomEmailInput from './CustomEmailInput';
import TouchAbleButton from './TouchAbleButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../helpers/Responsive';

export default function NewsLetter({newsStyle}) {
  const [email, setEmail] = useState('');
  const subscribe = <Text style={styles.subscribeText}>Subscribe</Text>;

  const handleEmailChange = text => {
    setEmail(text);
    // Additional logic if needed
  };
  return (
    <View style={styles.container}>
      <View style={newsStyle}>
        <Text style={styles.headingNewsletter}>Sign up to the newsletter.</Text>
        <Text style={styles.descriptionNewsletter}>
          Subscribe to get notified about new stories, news and personal offers.
        </Text>
        <View style={styles.emailContainer}>
          <CustomEmailInput
            value={email}
            onChangeText={handleEmailChange}
            placeholder="Enter your email"
            type={'email-address'}
          />
        </View>
        <Text style={styles.detailText}>
          By completing this form you are signing up to receive our emails. You
          can unsubscribe at any time.
        </Text>
        <TouchAbleButton
          item={subscribe}
          style={styles.buttonSubscribe}
          onPress={() => {
            console.log('Hello');
          }}
        />
        <Image style={styles.imageContainer} source={require('../assets/images/newsLetterImg.png')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232324',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  headingNewsletter: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '400',
    // textAlign: 'center',
    marginVertical: 30,
    marginBottom: 10,
  },
  descriptionNewsletter: {
    color: '#FFFFFF',
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    // textAlign: 'center',
    marginBottom: 30,
  },
  emailContainer: {
    // email Css
  },
  detailText: {
    fontFamily: 'Montserrat',
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    // textAlign: 'center',
    marginBottom: 20,
    lineHeight: 12.19,
  },
  buttonSubscribe: {
    backgroundColor: '#D89471',
    paddingTop: 16,
    paddingBottom: 16,
    alignItems: 'center',
    fontFamily: 'Montserrat',
    fontSize: 24,
    fontWeight: '500',
    width: 218,
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#000000',
    alignSelf: 'center',
  },
  imageContainer: {
    alignSelf: 'center',
    resizeMode: 'cover',
    width: wp(100),
    height: hp(34) 
  },
  subscribeText: {
    fontSize: 20,
    color: '#000000',
    alignItems: 'center',
  },
});
