import { View, Text, StyleSheet, FlatList } from "react-native";
import { useCallback } from "react";
import SingleCollection from "./SingleCollection";
import { useSelector } from "react-redux";
import CustomRenderHtml from "./CustomRenderHtml";
import { useWindowDimensions } from "react-native";

export default function Collections({ nav }) {
  const { width } = useWindowDimensions();

  const {
    collectionData,
    collectionHeading,
    collectionTitleColor,
    collectionSectionColor,
  } = useSelector((state) => state.collectionData.collectionData);

  const renderItem = useCallback(({ item }) => {
    return (
      <SingleCollection
        src={item?.node?.image?.src}
        text={item?.node?.title}
        collectionProducts={item?.node}
        nav={nav}
        color={collectionTitleColor}
      />
    );
  }, []);

  const headingCollection = () => {
    return (
      <CustomRenderHtml
        source={{ html: collectionHeading ?? "Collections" }}
        contentWidth={width}
      />
    );
  };

  const keyExtractor = useCallback((item) => item.node.handle, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{headingCollection() ?? "Collections"}</Text>
      <View
        style={[
          styles.collections,
          { backgroundColor: collectionSectionColor },
        ]}
      >
        {collectionData && collectionData.length > 4 ? (
          <FlatList
            data={collectionData}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        ) : collectionData && collectionData.length <= 4 ? (
          <>
            {collectionData.map((item, index) => (
              <SingleCollection
                key={index}
                src={item?.node?.image?.src}
                text={item?.node?.title}
                collectionProducts={item?.node}
                nav={nav}
                color={collectionTitleColor}
              />
            ))}
          </>
        ) : (
          <>
            <SingleCollection key={1} image={imagePath1} />
            <SingleCollection key={2} image={imagePath2} text={"Men"} />
            <SingleCollection key={3} image={imagePath3} text={"Women"} />
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    zIndex: -9,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 18,
    fontWeight: "600",
    left: 10,
    width: "100%",
    // height: 10,
    color: "#000000",
    marginBottom: 5,
  },
  description: {
    textAlign: "center",
    color: "#777777",
    fontSize: 14,
    fontFamily: "Montserrat",
  },
  collections: {
    flexDirection: "row",
    flex: 1,
    gap: 10,
    paddingVertical: 10,
    top: 10,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    justifyContent: "center",
  },
});