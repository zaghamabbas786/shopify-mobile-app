import {View, Text, StyleSheet} from 'react-native';
import Back from '../assets/images/backarrow.svg';
import TouchAbleButton from '../components/TouchAbleButton';
import SingleCartProductDesign from '../components/SingleCartProductDesign';
import Coupons from '../assets/images/coupons.svg';
import {ScrollView} from 'react-native-gesture-handler';

const backBtn = () => {
  return (
    <View>
      <Back width={9} height={19} />
    </View>
  );
};

const placeOrder = () => {
  return (
    <View style={styles.placeOrderContainer}>
      <Text style={styles.placeOrderTxt}>Proceed to Checkout</Text>
    </View>
  );
};

const OrderSummeryScreen = ({navigation, route}) => {
  const {checkoutUrl, total, cartDetails} = route.params;
  const checkBtn = () => {
    navigation.navigate('Checkout', {checkoutUrl});
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.orderHeader}>
        <TouchAbleButton item={backBtn()} onPress={() => navigation.goBack()} />
        <Text style={styles.orderHeadingTxt}>Shopping Bag</Text>
      </View>

      <View style={{marginTop: 10, gap: 10}}>
        {cartDetails?.map(item => (
          <SingleCartProductDesign
            item={item}
            key={item.node.id}
            OrderSummeryScreen={true}
          />
        ))}
      </View>
      <View style={styles.couponsContainer}>
        <View style={styles.coupons}>
          <Coupons width={31} height={20} />
          <Text>Apply Coupons</Text>
        </View>
        <Text style={styles.select}>Select</Text>
      </View>

      <View style={styles.orderDetailContainer}>
        <Text style={styles.orderHeaderTitle}>Order Payment Details</Text>
        <View style={styles.oderDetailTxt}>
          <Text style={styles.orderAmountTitle}>Order Amounts</Text>
          <Text style={styles.amount}>$ {total}</Text>
        </View>

        <View style={styles.oderDetailTxt}>
          <Text style={styles.orderAmountTitle}>Convenience</Text>
          <Text style={styles.convinence}>Apply Coupon</Text>
        </View>

        <View style={styles.oderDetailTxt}>
          <Text style={styles.orderAmountTitle}>Delivery Fee</Text>
          <Text style={styles.free}>Free</Text>
        </View>
      </View>

      <View style={styles.orderTotalContainer}>
        <View style={styles.oderDetailTxt}>
          <Text
            style={[styles.orderAmountTitle, {fontFamily: 'Montserrat-Bold'}]}>
            Total Amounts
          </Text>
          <Text style={styles.amount}>$ {total}</Text>
        </View>

        <View style={styles.emiContainer}>
          <Text style={styles.emi}>EMI Available</Text>
          <Text style={styles.convinence}>Detail</Text>
        </View>
      </View>

      <TouchAbleButton
        item={placeOrder()}
        onPress={checkBtn}
        disabled={cartDetails.length == 0}
      />
    </ScrollView>
  );
};
// EMI Available
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#FDFDFD',
    flex: 1,
  },
  orderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
  },
  orderHeadingTxt: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
  },
  couponsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
    paddingBottom: 20,
  },
  coupons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  select: {
    color: '#D89471',
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
  },
  orderDetailContainer: {
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#CACACA',
    paddingBottom: 20,
  },
  orderHeaderTitle: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 17,
    fontWeight: '700',
    lineHeight: 20,
    color: '#000000',
  },
  oderDetailTxt: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderAmountTitle: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 19,
    color: '#000000',
    marginTop: 10,
  },
  amount: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: '#000000',
  },
  convinence: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 12,
    lineHeight: 19,
    color: '#D89471',
  },
  free: {
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 17,
    color: '#F83758',
  },
  orderTotalContainer: {
    marginTop: 20,
    gap: 10,
  },
  emi: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: 'black',
  },
  emiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 50,
  },
  placeOrderContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    height: 54,
    width: 321,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 28,
    marginBottom: 38,
  },
  placeOrderTxt: {
    color: 'white',
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
  },
});

export default OrderSummeryScreen;
