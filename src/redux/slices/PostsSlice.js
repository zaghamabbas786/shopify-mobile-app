// PostsSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { fetchPosts } from '../asyncThunks/PostsThunks';
const postsSlice = createSlice({
  name: 'posts',
  initialState: { entities: [], loading: 'idle' },
  reducers: {
    addPost: (state, action) => {
      state.entities.push(action.payload);
    },
    removePost: (state, action) => {
      state.entities = state.entities.filter(
        post => post.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPosts.pending, state => {
        state.loading = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.entities = action.payload;
      });
  },
});

export const { addPost, removePost } = postsSlice.actions;

export default postsSlice.reducer;