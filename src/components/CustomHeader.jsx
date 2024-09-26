import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Announcement from './Announcement';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import DeviceInfo from 'react-native-device-info';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from '../helpers/Responsive';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { drawer } from '../redux/slices/DrawerNavigationSlice';
import { hsbToHex } from '../helpers/convertTohex';
import SvgComponent from './SvgComponent';
import { MenuSvgIcon, AppLogoIcon, ProfileIconSvg } from '../helpers/svgComponent';

export default function CustomHeader() {
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const dispatch = useDispatch();

  const openDrawer = () => {
    dispatch(drawer(true));
  };

  const navigation = useNavigation();

  const adminData = useSelector(state => state.adminData?.adminData);
  const background_color = adminData?.headerRes?.backgroundColor ?? null;
  const logoIconColor = adminData?.headerRes?.logoIconColor &&  hsbToHex(JSON.parse(adminData?.headerRes?.logoIconColor))
  const menuIconcolor = adminData?.headerRes?.menuIconcolor &&  hsbToHex(JSON.parse(adminData?.headerRes?.menuIconcolor))
  const profileIconColor = adminData?.headerRes?.profileIconColor &&  hsbToHex(JSON.parse(adminData?.headerRes?.profileIconColor))
  const logoAlignment =adminData?.headerRes?.logoAlignment && JSON.parse(adminData?.headerRes?.logoAlignment);
  const iconsAlignment = adminData?.headerRes?.iconsAlignment && JSON.parse(adminData?.headerRes?.iconsAlignment);

  return (
    <View
      style={{
        backgroundColor: background_color ? hsbToHex(JSON.parse(background_color))  : '#FDFDFD',
        paddingBottom: 0,
        marginTop: DeviceInfo.hasNotch() ? getStatusBarHeight() + hp(0) : hp(0),
      }}>
      {announcementVisible && (
        <Announcement setAnnouncementVisible={setAnnouncementVisible} />
      )}
       {iconsAlignment === "left" ? (
        <View style={styles.childContainer}>
          <TouchableOpacity onPress={openDrawer}>
            <SvgComponent uri={adminData?.headerRes?.menuIcon ? adminData?.headerRes?.menuIcon : MenuSvgIcon} width={32} height={32} color={menuIconcolor} />
          </TouchableOpacity>

          <View style={{ width: "70%", alignItems: logoAlignment ? logoAlignment : 'center' }}>
            <SvgComponent uri={adminData?.headerRes?.logoIcon ? adminData?.headerRes?.logoIcon : AppLogoIcon} width={100} height={50} color={logoIconColor} />
          </View>

          <TouchableOpacity
            style={styles.cartMain}
            onPress={() => navigation.navigate('Login')}>
            <SvgComponent uri={adminData?.headerRes?.profileIcon ? adminData?.headerRes?.profileIcon : ProfileIconSvg} width={25} height={25} color={profileIconColor} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.childContainer}>
          <TouchableOpacity
            style={styles.cartMain}
            onPress={() => navigation.navigate('Login')}>
            <SvgComponent uri={adminData?.headerRes?.profileIcon ? adminData?.headerRes?.profileIcon : ProfileIconSvg} width={25} height={25} color={profileIconColor} />
          </TouchableOpacity>

          <View style={{ width: "80%", alignItems: logoAlignment ? logoAlignment : 'center', }}>
            <SvgComponent uri={adminData?.headerRes?.logoIcon ? adminData?.headerRes?.logoIcon : AppLogoIcon} width={100} height={50} color={logoIconColor} />
          </View>

          <TouchableOpacity onPress={openDrawer} >
            <SvgComponent uri={adminData?.headerRes?.menuIcon ? adminData?.headerRes?.menuIcon : MenuSvgIcon} width={32} height={32} color={menuIconcolor} />
          </TouchableOpacity>
        </View>
      )}
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FDFDFD',
    paddingBottom: 0,
  },
  childContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    paddingLeft: 10,
    paddingRight: 10
  },
  menuImg: {
    width: wp(8),
    height: hp(4),
    resizeMode: 'contain',
    marginLeft: wp(5),
  },
  profileImg: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  logoImg: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  arrowIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  cartMain: {

    // backgroundColor: '#F2F2F2',

    // padding: 8,

    borderRadius: 50,

    

  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
