import React from 'react';
import {ScrollView, SafeAreaView} from 'react-native';
// import Header from '../components/Header';
import Footer from '../components/Footer';
const withHeaderAndFooter = WrappedComponent => {
  
  return props => {
    return (
      <SafeAreaView>
        <ScrollView>
          {/* <Header /> */}
          <WrappedComponent {...props} />
          <Footer />
        </ScrollView>
      </SafeAreaView>
    );
  };
};

export default withHeaderAndFooter;