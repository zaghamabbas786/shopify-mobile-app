import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import Logo from '../assets/images/Denver.svg';
import Payment from '../assets/images/payment.svg';
import FooterLinks from './FooterLinks';
import ContactUs from './ContactUs';
import SocialLinks from './SocialLinks';
import Flag from '../assets/images/flag.svg';
import CustomDropdown from './CustomDropdown';

export default function Footer({footerStyle}) {
  const [selectedItem, setSelectedItem] = useState(null);

  const quickLinks = ['Collection List Page', 'Collection Page', 'Blog Page'];
  const policyLinks = [
    'Terms of Services',
    'Cookie Policy',
    'Privacy Policy',
    'Shipping & Returns',
    'FAQs',
  ];
  const options = [
    {label: 'English (US)', value: 'English (US)'},
    {label: 'English (UK)', value: 'English (UK)'},
  ];

  const handleDropdownSelect = (item, index) => {
    console.log('ITEM', item);
    // setSelectedItem(item);
    // Additional logic if needed
  };
  return (
    <View style={styles.container}>
      <View style={footerStyle}>
        <View style={styles.childContainer}>
          <Logo style={styles.logoImage} width={135} height={54} />
          <Text style={styles.footerDescription}>
            This is a demonstration of the Denver theme for Shopify. All
            products on this site are not actually for sale. No orders will be
            fulfilled
          </Text>
        </View>
        <View style={styles.linksContainer}>
          <FooterLinks item={quickLinks} title={'Quick Links'} />
          <FooterLinks item={policyLinks} title={'Our Policies'} />
        </View>
        <ContactUs />
        <SocialLinks />
        {/* <View style={styles.countryDropdownContainer}>
          <Flag width={40} height={40} />
          <View style={styles.customDropdown}>
            <CustomDropdown
              options={options}
              onSelect={handleDropdownSelect}
              defaultButtonText="English (US)"
            />
          </View>
        </View> */}
        <View style={styles.paymentContainer}>
          <View>
            <Payment width={385} height={48} />
          </View>
          <Text style={styles.copyRight}>
            © 2023, Denver Theme Home. Powered by Shopify
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000000',
  },
  childContainer: {
    alignItems: 'center',
  },
  logoImage: {
    // justifyContent: 'center'
    marginVertical: 20,
  },
  footerDescription: {
    color: '#ffffff',
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    justifyContent: 'center',
  },
  linksContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  countryDropdownContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    // justifyContent:  'space-between',
  },
  paymentContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  copyRight: {
    fontFamily: 'Montserrat',
    fontWeight: '700',
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    // width: 550,
    // height: 100
  },
  customDropdown: {
    paddingBottom: 20,
    flexGrow: 1,
  },
});
