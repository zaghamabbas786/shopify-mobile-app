import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  useWindowDimensions,
  FlatList,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { addItemTocart } from "../../redux/slices/CartSlice";
import { useNavigation } from "@react-navigation/native";
import apiClient from "../../api/apiClient";
import CustomRenderHtml from "../CustomRenderHtml";
import { removeHtmlTags } from "../../helpers/htmlPareser";

const ProductComponent = ({ varianID, productData, setProductPrice }) => {
  const [quantity, setQuantity] = useState("1");
  const [size, setSize] = useState();
  const [variant, setVariantId] = useState();
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  const pdpData = useSelector((state) => state.adminData.adminData);
  const mainPDP = pdpData?.pdpRes?.pdpData
    ? JSON.parse(pdpData?.pdpRes?.pdpData)
    : null;

  const variantHeading = mainPDP.variantHeading;
  const variantSelectedColor = mainPDP.variantSelectedColor;
  const variantUnselectedColor = mainPDP.variantUnselectedColor;
  const variantActiveTitleColor = mainPDP.variantActiveTitleColor;
  const variantInActiveTitleColor = mainPDP.variantInActiveTitleColor;
  const quatityHeading = mainPDP.quatityHeading;
  const quatityDigitColor = mainPDP.quatityDigitColor;
  const quatityBackgroundColor = mainPDP.quatityBackgroundColor;
  const quatityBorderColor = mainPDP.quatityBorderColor;
  const atcText = mainPDP.atcText;
  const atcBackgroundColor = mainPDP.atcBackgroundColor;
  const atcBorderColor = mainPDP.atcBorderColor;
  const buyNowText = mainPDP.buyNowText;
  const buyNowBackgroundColor = mainPDP.buyNowBackgroundColor;
  const buyNowBorderColor = mainPDP.buyNowBorderColor;

  const handleButtonClick = (buttonId) => {
    setSize(buttonId);
    const variantID = productData?.variants?.edges?.find((item) => {
      const containsSubstring = new RegExp(`\\b${buttonId}\\b`).test(
        item?.node?.title,
      );
      if (containsSubstring) {
        return item?.node?.id;
      } else {
        return null;
      }
    });
    setVariantId(variantID?.node?.id);
    setProductPrice({
      compareAtPriceV2: variantID?.node?.compareAtPriceV2?.amount,
      priceV2: variantID?.node?.priceV2?.amount,
      currency: variantID?.node?.priceV2?.currencyCode,
    });
  };

  const incrementQuantity = () => {
    if (isNaN(quantity)) {
      setQuantity("1");
    } else {
      setQuantity((prevQuantity) => {
        const quantityPrev = parseInt(prevQuantity) + 1;
        return quantityPrev.toString();
        // prevQuantity + 1
      });
    }
  };

  const decrementQuantity = () => {
    if (isNaN(quantity)) {
      setQuantity("1");
    } else {
      if (quantity > 1) {
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  const addToCart = async () => {
    try {
      if (isNaN(quantity)) {
        setQuantity("1");
      }
      if (!size) {
        Alert.alert("please select variant first");
        return;
      }
      if (!variant) {
        return;
      }

      const storageData = await AsyncStorage.getItem("CartItem");
      const { id } = JSON.parse(storageData);

      const graphqlMutation = `
      mutation addCartLines($cartId: ID!, $lines: [CartLineInput!]!) {
        cartLinesAdd(cartId: $cartId, lines: $lines) {
          cart {
            id
            lines(first: 20) {
              edges {
                node {
                  quantity
                }
              }
            }
            cost {
              totalAmount {
                amount
                currencyCode
              }
              subtotalAmount {
                amount
                currencyCode
              }
              totalTaxAmount {
                amount
                currencyCode
              }
              totalDutyAmount {
                amount
                currencyCode
              }
            }
          }
          userErrors {
            field
            message
          }
        }
      }
    `;

      const response = await apiClient.post("", {
        query: graphqlMutation,
        variables: {
          cartId: id,
          lines: [{ merchandiseId: variant, quantity: parseInt(quantity) }],
        },
      });

      if (response.data.errors) {
        console.error("GraphQL mutation error:", response.data.errors);
      } else {
        dispatch(addItemTocart(true));
        navigation.getParent("RightDrawer").openDrawer();
      }
    } catch (error) {
      console.log("add to cart error", error);
    }
  };

  const handleBlur = () => {
    const txt = parseInt(quantity);
    if (isNaN(txt) || txt < 1) {
      setQuantity("1");
    }
  };
  const handleTextChange = (text) => {
    const regex = /^[0-9]*$/;
    if (text === "" || regex.test(text)) {
      setQuantity(text);
    }
  };
  const buyNow = async () => {
    if (!size) {
      Alert.alert("please select variant first");
      return;
    }
    const CREATE_CHECKOUT = `
  mutation CreateCheckout($variantId: ID!, $quantity: Int!) {
    checkoutCreate(input: {
      lineItems: [{variantId: $variantId, quantity: $quantity}]
    }) {
      checkout {
        webUrl
      }
    }
  }
`;
    try {
      const response = await apiClient.post("", {
        query: CREATE_CHECKOUT,
        variables: {
          variantId: variant,
          quantity: Number(quantity),
        },
      });

      if (response.data.errors) {
        console.error("GraphQL mutation error:", response.data.errors);
      } else {
        const checkoutUrl = response.data.data.checkoutCreate.checkout.webUrl;
        navigation.navigate("Checkout", { checkoutUrl });
      }
    } catch (error) {
      console.log("add to cart error", error);
    }
  };
  useEffect(() => {
    try {
      const minTitle = productData?.variants?.edges?.reduce((min, current) => {
        const quantity = parseInt(current?.node?.title?.match(/\d+/)[0]);
        if (!min) {
          return {
            title: current?.node?.title,
            quantity: quantity,
            compareAtPriceV2: current?.node?.compareAtPriceV2?.amount,
            priceV2: current?.node?.priceV2?.amount,
            currency: current?.node?.priceV2?.currencyCode,
            id: current?.node?.id,
          };
        }
        return min;
      }, null);
      setProductPrice({
        compareAtPriceV2: minTitle?.compareAtPriceV2,
        priceV2: minTitle?.priceV2,
        currency: minTitle?.currency,
      });
      const title = minTitle?.title;
      setVariantId(minTitle?.id);

      if (title) {
        const initialSize = title.split("/")[1];
        if (initialSize) {
          setSize(initialSize.trim());
        } else {
          setSize(title);
        }
      }
    } catch (error) {
      console.log("error====>", error);
    }
    const variantID = productData.options.find((item) => item.name == "Size");

    if (!variantID) {
      setVariantId(varianID);
    }
  }, []);

  const variantHeadingFunc = () => {
    return (
      <CustomRenderHtml
        source={{
          html: removeHtmlTags(variantHeading)
            ? variantHeading
            : `<span style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 700; ">Size:</span>`,
        }}
        contentWidth={width}
      />
    );
  };

  const quantityHeadingFunc = () => {
    return (
      <CustomRenderHtml
        source={{
          html: removeHtmlTags(quatityHeading)
            ? quatityHeading
            : `<span style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 700; ">Quantity:</span>`,
        }}
        contentWidth={width}
      />
    );
  };

  const atcTextFunc = () => {
    return (
      <CustomRenderHtml
        source={{
          html: removeHtmlTags(atcText)
            ? atcText
            : `<span style="color: black; font-size: 22px; font-family: Montserrat; font-weight: 400;text-transform: uppercase ">Add To Cart</span>`,
        }}
        contentWidth={width}
      />
    );
  };

  const buyNowTextFunc = () => {
    return (
      <CustomRenderHtml
        source={{
          html: removeHtmlTags(buyNowText)
            ? buyNowText
            : `<span style="color: white; font-size: 22px; font-family: Montserrat; font-weight: 400;text-transform: uppercase ">Buy Now</span>`,
        }}
        contentWidth={width}
      />
    );
  };

  const renderSizeOption = ({ item }) => (
    <TouchableOpacity
      style={
        size === item
          ? [
              styles.sizeBtnActive,
              { backgroundColor: variantSelectedColor ?? "#3F3F3F" },
            ]
          : [
              styles.sizeBtnInactive,
              { backgroundColor: variantUnselectedColor ?? "#D9D9D9" },
            ]
      }
      onPress={() => handleButtonClick(item)}
    >
      <Text
        style={
          size === item
            ? [
                styles.sizeBtnTextActive,
                { color: variantActiveTitleColor ?? "#ffffff" },
              ]
            : [
                styles.sizeBtnTextInactive,
                { color: variantInActiveTitleColor ?? "#777777" },
              ]
        }
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <View style={styles.sizeBtnMain}>
        {productData?.options
          ?.filter(option => option.name === 'Size')
          .map(sizeOption => (
            <View key={sizeOption.id}>
              <Text style={styles.quantityHeading}>{variantHeadingFunc()}</Text>
              <View key={sizeOption.id} style={styles.sizeBtnMain}>
                {sizeOption.values
                  // .sort((a, b) => parseInt(a) - parseInt(b))
                  .map(sizeValue => (
                    <TouchableOpacity
                      key={sizeValue}
                      style={
                        size == sizeValue
                          ? [styles.sizeBtnActive, {backgroundColor: variantSelectedColor ?? '#3F3F3F'}]
                          : [styles.sizeBtnInactive, {backgroundColor: variantUnselectedColor ?? '#D9D9D9'}]
                      }
                      onPress={() => handleButtonClick(sizeValue)}>
                      <Text
                        style={
                          size === sizeValue
                            ? [styles.sizeBtnTextActive, {color: variantActiveTitleColor ?? '#ffffff'}]
                            : [styles.sizeBtnTextInactive, {color: variantInActiveTitleColor ?? '#777777'}]
                        }>
                        {sizeValue}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </View>
            </View>
          ))}
      </View> */}
      <Text style={styles.quantityHeading}>{variantHeadingFunc()}</Text>
      <View style={styles.sizeBtnMain}>
        <FlatList
          data={
            productData?.options.find((option) => option.name === "Size")
              ?.values || []
          }
          renderItem={renderSizeOption}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Text style={styles.quantityHeading}>{quantityHeadingFunc()}</Text>
      <View
        style={[
          styles.quantitySelector,
          {
            backgroundColor: quatityBackgroundColor ?? "#fff",
            borderColor: quatityBorderColor ?? "#777",
          },
        ]}
      >
        <TouchableOpacity onPress={decrementQuantity} disabled={quantity < 2}>
          <Image
            style={styles.quantityIconsMinus}
            source={require("../../assets/images/minus.png")}
          />
        </TouchableOpacity>
        <TextInput
          style={[
            styles.quantityInput,
            { color: quatityDigitColor ?? "#777777" },
          ]}
          value={String(quantity)}
          keyboardType="numeric"
          onChangeText={handleTextChange}
          onBlur={handleBlur}
        />
        <TouchableOpacity onPress={incrementQuantity}>
          <Image
            style={styles.quantityIcons}
            source={require("../../assets/images/plus.png")}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.AtcBtn,
          {
            backgroundColor: atcBackgroundColor ?? "#fff",
            borderColor: atcBorderColor ?? "#000",
          },
        ]}
        onPress={addToCart}
      >
        <Text style={styles.AtcBtnText}>{atcTextFunc()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.buyBtn,
          {
            backgroundColor: buyNowBackgroundColor ?? "#000",
            borderColor: buyNowBorderColor ?? "#000",
          },
        ]}
        onPress={buyNow}
      >
        <Text style={styles.buyBtnText}>{buyNowTextFunc()}</Text>
      </TouchableOpacity>
      {/* <View style={styles.pickupMain}>
        <Image
          style={styles.pickCheckIcon}
          source={require('../../assets/images/checkMark.png')}
        />
        <Text style={styles.pickText}>
          Pickup available at{' '}
          <Text style={{fontWeight: '700'}}>Denver, Shopify</Text> Usually ready
          in 24 hours
        </Text>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sizeBtnMain: {
    flexDirection: "row",
    marginTop: 10,
    // justifyContent: 'space-evenly'
  },
  sizeBtnActive: {
    // backgroundColor: '#3F3F3F',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
  },
  sizeBtnInactive: {
    // backgroundColor: '#D9D9D9',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
  },
  sizeBtnTextActive: {
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 14,
  },
  sizeBtnTextInactive: {
    fontFamily: "Montserrat",
    fontWeight: "400",
    fontSize: 14,
  },
  quantityHeading: {
    fontSize: 22,
    fontWeight: "700",
    marginTop: 25,
    fontFamily: "Montserrat",
  },
  quantityIconsMinus: {
    width: 14,
    height: 5,
  },
  quantityIcons: {
    width: 22,
    height: 20,
  },
  quantitySelector: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 20,
    borderWidth: 1,
    // borderColor: '#777777',
    paddingTop: 4,
    paddingBottom: 4,
  },
  quantityInput: {
    // borderWidth: 1,
    // borderColor: '#000',
    width: 50,
    textAlign: "center",
    marginHorizontal: 10,
    fontWeight: "400",
    fontFamily: "Montserrat",
    fontSize: 22,
  },
  AtcBtn: {
    borderWidth: 1,
    marginTop: 45,
    // paddingTop: 15,
    // paddingBottom: 15,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  buyBtn: {
    borderWidth: 1,
    marginTop: 25,
    // paddingTop: 16,
    // paddingBottom: 16,
    alignItems: "center",
    height: 60,
    justifyContent: "center",
  },
  buyBtnText: {
    fontSize: 22,
    fontFamily: "Montserrat",
    fontWeight: "400",
    textTransform: "uppercase",
  },
  AtcBtnText: {
    fontSize: 22,
    fontFamily: "Montserrat",
    fontWeight: "400",
    textTransform: "uppercase",
  },
  pickupMain: {
    flexDirection: "row",
    marginTop: 35,
    marginBottom: 15,
    width: "90%",
  },
  pickCheckIcon: {
    width: 35,
    height: 35,
    marginRight: 10,
  },
  pickText: {
    fontSize: 22,
    color: "#000",
    fontFamily: "Montserrat",
    fontWeight: "400",
  },
});

export default ProductComponent;
