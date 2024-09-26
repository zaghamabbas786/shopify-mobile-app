import { View, Text, Image, StyleSheet } from 'react-native';
import TouchAbleButton from './TouchAbleButton';

export default function SingleCollection({
  image,
  text,
  src,
  collectionProducts,
  nav,
  color
}) {
  const collection = () => {
    return (
      <View style={styles.collectionContainer}>
        {src ? (
          <View style={styles.collection}>
            <Image source={{ uri: src }} style={styles.image} />
            <Text style={[styles.collectionText, { color: color ?? '#21003D' }]}>{text}</Text>
          </View>
        ) : (
          <View style={styles.collection1}>
           <Text style={[styles.collectionText, { color: color ?? '#21003D', fontWeight: 'bold' }]}>{text}</Text>
          </View>
        )}
      </View>
      // <View>
      //   {src ? (
      //     <Image source={{uri: src}} style={{width: '100%', height: 190}} />
      //   ) : (
      //     <Image source={image} style={styles.image} />
      //   )}
      //   {text != null && (
      //     <View style={styles.type}>
      //       <Text style={styles.txt}>{text}</Text>
      //       {src == null && <Text style={styles.txt}>Perfumes</Text>}
      //     </View>
      //   )}
      //   <View style={styles.vector}>
      //     <CollectionVector width={20} height={20} />
      //   </View>
      // </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchAbleButton item={collection()} onPress={() => { nav.navigate('ProductListing', collectionProducts) }} />
    </View>
  );
}
const styles = StyleSheet.create({
  collectionContainer: {
    height: 100,

    color: '#FFFFFF',
    // left: 5,
    // backgroundColor: 'red'
  },
  collection: {
    width: 80,
    height: 100,
    // backgroundColor: 'green',
    left: 5
  },
  collection1: {
    width: 80,
    // height: 60,
    // backgroundColor: 'green',
    marginTop: 30
    // left: 5
    // justifyContent: 'center',
    // flexDirection: 'column'
  },
  collectionText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Montserrat-SemiBold',
    fontWeight: '400',
    lineHeight: 16,
    // color: '#21003D',
    width: 56,
  },
  container: {
    position: 'relative',
  },
  image: {
    // width: '100%',
    width: 60,
    height: 60,
    borderRadius: 30
  },
  type: {
    position: 'absolute',
    fontSize: 20,
    bottom: 10,
    left: 10,
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
  },
  vector: {
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
});
