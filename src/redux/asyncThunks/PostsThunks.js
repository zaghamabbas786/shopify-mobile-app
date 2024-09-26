// postsThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await apiClient.get('/posts');
  return response.data;
});