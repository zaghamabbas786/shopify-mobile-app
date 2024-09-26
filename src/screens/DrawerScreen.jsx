import {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from '../helpers/Responsive';
import {useSelector, useDispatch} from 'react-redux';
import {drawer} from '../redux/slices/DrawerNavigationSlice';
import {useDrawerStatus} from '@react-navigation/drawer';
import apiClient from '../api/apiClient';
import {GET_ALL_MENU_ITEMS} from '../Schema/querries';
import {hsbToHex} from '../helpers/convertTohex';
import NestedDropdownItem from '../components/NestedDropdownItem'; // Import the nested dropdown component
import {useNavigation} from '@react-navigation/native';
import SvgComponent from '../components/SvgComponent';
import {
  AppLogoIcon,
  FbIconSvg,
  InstaIconSvg,
  PintIconSvg,
  YtIConSvg,
} from '../helpers/svgComponent';
import CustomRenderHtml from '../components/CustomRenderHtml';
import {useWindowDimensions} from 'react-native';

const DrawerScreen = ({navigation}) => {
  const [menuData, setMenuData] = useState([]);
  const dispatch = useDispatch();
  const status = useDrawerStatus();
  const drawerStatus = useSelector(state => state.drawer.open);
  const adminData = useSelector(state => state.adminData?.adminData?.menuRes);
  const adminDataHeader = useSelector(
    state => state.adminData?.adminData?.headerRes?.logoIcon,
  );
  const adminDataHeaderLogoColor = useSelector(
    state => state.adminData?.adminData?.headerRes?.logoIconColor,
  );
  const logoIconColor = adminDataHeaderLogoColor
    ? hsbToHex(JSON.parse(adminDataHeaderLogoColor))
    : null;
  const colors = adminData?.menuColor ? JSON.parse(adminData?.menuColor) : null;
  const backgroundColor =
    colors?.backgroundColor && hsbToHex(colors?.backgroundColor);
  const textColor = colors?.color && hsbToHex(colors?.color);
  const fontWeight = adminData?.fontWeight?.trim()
    ? adminData?.fontWeight
    : '500';
  const menuItem = adminData?.menuItme ? JSON.parse(adminData?.menuItme) : null;
  // if (adminData) {
  //   var {socialIcon1, socialIcon2, socialIcon3, socialIcon4} = adminData;
  // }
  const styles = customStyle({backgroundColor, textColor, fontWeight});
  const socialIcon1 = adminData?.socialIcon1;
  const socialIcon2 = adminData?.socialIcon2;
  const socialIcon3 = adminData?.socialIcon3;
  const socialIcon4 = adminData?.socialIcon4;
  const socialicon1Color =adminData?.socialicon1Color &&  hsbToHex(JSON.parse(adminData?.socialicon1Color));
  const socialicon2Color =
    adminData?.socialicon2Color &&
    hsbToHex(JSON.parse(adminData?.socialicon2Color));
  const socialicon3Color =
    adminData?.socialicon3Color &&
    hsbToHex(JSON.parse(adminData?.socialicon3Color));
  const socialicon4Color =
    adminData?.socialicon4Color &&
    hsbToHex(JSON.parse(adminData?.socialicon4Color));
  const dealHeadingText = adminData?.dealText
    ? JSON.parse(adminData?.dealText)
    : null;

  const closeDrawer = () => {
    navigation.closeDrawer();
    dispatch(drawer(false));
  };

  const navigations = useNavigation();

  const fetchHandle = async handle => {
    try {
      const response = await apiClient.post('', {
        query: GET_ALL_MENU_ITEMS,
        variables: {
          handle,
        },
      });
      return response;
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  const handlePressItem = item => {
    const {type, resource} = item;
    if (type === 'FRONTPAGE') {
      navigation.navigate('Home');
    }
    if (type === 'COLLECTION' && resource) {
      navigation.navigate('ProductListing', resource);
    }
  };

  const getMenu = async () => {
    const {handle} = menuItem;
    const data = await fetchHandle(handle);
    const menuData = data?.data?.data?.menu?.items;
    setMenuData(menuData);
  };

  useEffect(() => {
    getMenu();
  }, []);

  useEffect(() => {
    const openDrawer = () => {
      if (status === 'closed') {
        dispatch(drawer(false));
      }
      if (drawerStatus) {
        navigation.openDrawer();
      }
    };
    openDrawer();
  }, [drawerStatus]);
  const {width} = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 100}>
      <View style={styles.sideMenuHeadingMain}>
        <SvgComponent
          uri={adminDataHeader ? adminDataHeader : AppLogoIcon}
          width={148}
          height={43}
          color={logoIconColor}
        />
        <TouchableOpacity onPress={closeDrawer}>
          <Image
            style={styles.sideMenuCross}
            source={require('../assets/images/cross-icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
        <TouchableOpacity onPress={() => navigations.navigate('DealsScreen')}>
          {/* <Text style={{fontSize: 16, fontWeight: '400', fontFamily: 'Montserrat', color: '#000'}}>Today's Deals</Text> */}
          <CustomRenderHtml
            source={{html: dealHeadingText ?? `Today's Deal`}}
            contentWidth={width}
          />
        </TouchableOpacity>
        {menuData?.map(item => (
          <NestedDropdownItem
            key={item.title}
            item={item}
            onPressItem={handlePressItem}
          />
        ))}
      </View>
      <View style={styles.sideMenuIcons}>
        <TouchableOpacity>
          <SvgComponent
            uri={socialIcon1 ? socialIcon1 : FbIconSvg}
            width={30}
            height={30}
            color={socialicon1Color}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <SvgComponent
            uri={socialIcon2 ? socialIcon2 : InstaIconSvg}
            width={30}
            height={30}
            color={socialicon2Color}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <SvgComponent
            uri={socialIcon3 ? socialIcon3 : PintIconSvg}
            width={30}
            height={30}
            color={socialicon3Color}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <SvgComponent
            uri={socialIcon4 ? socialIcon4 : YtIConSvg}
            width={30}
            height={30}
            color={socialicon4Color}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const customStyle = ({backgroundColor, textColor, fontWeight}) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 1,
      paddingHorizontal: 20,
      width: '100%',
      backgroundColor,
    },
    scrollViewContainer: {
      marginTop: 40,
      height: 60,
      flexGrow: 1,
    },
    sideMenuHeadingMain: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 5,
    },
    sideMenuLogo: {
      width: 148,
      height: 43,
      resizeMode: 'contain',
    },
    sideMenuText: {
      color: '#000',
      fontFamily: 'Abril Fatface',
      fontWeight,
      fontSize: 10,
    },
    sideMenuBtn: {
      borderBottomWidth: 0.2,
      borderBottomColor: '#D9D9D9',
      justifyContent: 'center',
      marginBottom: 2,
    },
    sideMenuBtn1: {
      borderBottomWidth: 0.2,
      borderBottomColor: '#D9D9D9',
      justifyContent: 'center',
      marginBottom: 2,
    },
    sideMenuSelectBtn: {
      borderBottomWidth: 0.25,
      borderBottomColor: '#D9D9D9',
      marginBottom: 2,
    },
    dropdownBtn: {
      width: '100%',
      backgroundColor,
      justifyContent: 'space-between',
      marginTop: -10,
    },
    dropdown1BtnTxtStyle: {
      color: textColor,
      textAlign: 'left',
      marginHorizontal: -9,
      fontWeight,
    },
    menuItem: {
      fontSize: 18,
      marginBottom: 2,
      color: textColor,
      fontWeight,
    },
    menuItem1: {
      fontSize: 18,
      marginBottom: 2,
      color: textColor,
      fontWeight,
    },
    sideMenuIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 30,
      left: 10,
      gap: 40,
    },
    sideSocialIcons: {
      width: 8,
      height: 4,
      resizeMode: 'contain',
    },
    sideMenuCross: {
      width: 15,
      height: 15,
      resizeMode: 'contain',
      marginTop: 1,
    },
  });
};

export default DrawerScreen;
