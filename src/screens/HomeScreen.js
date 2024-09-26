import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {fetchPosts, addPost, removePost} from '../redux/slices/PostsSlice';
import Button from '../components/Button';
import CustomText from '../components/CustomText';
import TextInput from '../components/TextInput';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.entities);
  const loading = useSelector(state => state.posts.loading);
  const [newPostTitle, setNewPostTitle] = useState('');

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Details', {item})}>
      <CustomText style={styles.itemNumber}>{index + 1}</CustomText>
      <CustomText style={styles.itemTitle}>{item.title}</CustomText>
      <Button text="Remove" onClick={() => handleRemovePost(item.id)} />
    </TouchableOpacity>
  );

  const handleFetchPosts = () => {
    dispatch(fetchPosts());
  };

    const handleAddPost = () => {
      if (newPostTitle !== '') {
        const newPost = {title: newPostTitle, id: Date.now()};
        dispatch(addPost(newPost));
        setNewPostTitle('');
      }
    };

  const handleRemovePost = id => {
    dispatch(removePost(id));
  };

  return (
    <View style={styles.container}>
      {loading === 'loading' ? (
        <Button text="Loading..." />
      ) : (
        posts.length === 0 && (
          <Button text="Fetch Posts" onClick={handleFetchPosts} />
        )
      )}
      <TextInput
        value={newPostTitle}
        onChangeText={setNewPostTitle}
        placeholder="New post title"
      />
      <Button text="Add Post" onClick={handleAddPost} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemNumber: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold',
  },
  itemTitle: {
    fontSize: 16,
    color: '#000',
  },
});

export default HomeScreen;
