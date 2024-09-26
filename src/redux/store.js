import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './slices/PostsSlice';
import CartSlice from './slices/CartSlice';
import CartIdHandle from './slices/CartIdHandle';
import DrawerNavigationSlice from './slices/DrawerNavigationSlice';
import HeaderShownSlice from './slices/HeaderShownSlice';
import MiniCartStatusSlice from './slices/MiniCartStatusSlice';
import SearchFocusSlice from './slices/SearchFocusSlice';
import CartCountSlice from './slices/CartCountSlice';
import AdminDataSlice from './slices/AdminDataSlice';
import CollectionMenuDataSlice from './slices/CollectionMenuDataSlice'
export default configureStore({
  reducer: {
    posts: postsReducer,
    cart: CartSlice,
    cartId: CartIdHandle,
    drawer: DrawerNavigationSlice,
    headerShow: HeaderShownSlice,
    miniCart: MiniCartStatusSlice,
    search: SearchFocusSlice,
    cartCount: CartCountSlice,
    adminData: AdminDataSlice,
    collectionData: CollectionMenuDataSlice,
  },
});
